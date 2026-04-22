import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Subscription } from '../models/subscription';
import { fromStableDateISOString, toLocalStartOfDay } from '../core/utils/dateUtils';

const ANDROID_CHANNEL_ID = 'renewal-reminders';
const NOTIFICATION_TYPE = 'subscription-renewal';

type ExpoNotificationsModule = typeof import('expo-notifications');

let notificationsModule: ExpoNotificationsModule | null = null;
let handlerInitialized = false;

const isExpoGoRuntime =
  Constants.executionEnvironment === 'storeClient' ||
  Constants.appOwnership === 'expo';

async function getNotificationsModule(): Promise<ExpoNotificationsModule | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  if (isExpoGoRuntime) {
    return null;
  }

  if (!notificationsModule) {
    notificationsModule = await import('expo-notifications');
  }

  if (!handlerInitialized && notificationsModule) {
    notificationsModule.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
    handlerInitialized = true;
  }

  return notificationsModule;
}

function getReminderTriggerDate(subscription: Subscription, defaultReminderDaysBefore: number): Date | null {
  const reminderDays = Number.isFinite(subscription.reminderDaysBefore)
    ? subscription.reminderDaysBefore
    : defaultReminderDaysBefore;

  const billingDate = fromStableDateISOString(subscription.nextBillingDate);
  const reminderDate = new Date(
    billingDate.getFullYear(),
    billingDate.getMonth(),
    billingDate.getDate() - reminderDays,
    9,
    0,
    0,
    0
  );

  const now = new Date();
  return reminderDate > now ? reminderDate : null;
}

async function ensurePermissions(): Promise<boolean> {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return false;
  }

  const current = await Notifications.getPermissionsAsync();
  if (current.granted) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

async function ensureAndroidChannel(): Promise<void> {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return;
  }

  if (Platform.OS !== 'android') {
    return;
  }

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: 'Renewal reminders',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#007AFF',
    sound: 'default',
  });
}

async function cancelSubpatrolScheduledNotifications(): Promise<void> {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return;
  }

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const toCancel = scheduled.filter(
    (item) => item.content.data?.type === NOTIFICATION_TYPE
  );

  await Promise.all(
    toCancel.map((item) => Notifications.cancelScheduledNotificationAsync(item.identifier))
  );
}

async function scheduleSubscriptionReminder(
  subscription: Subscription,
  defaultReminderDaysBefore: number
): Promise<void> {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return;
  }

  if (subscription.status === 'cancelled' || subscription.status === 'expired') {
    return;
  }

  const triggerDate = getReminderTriggerDate(subscription, defaultReminderDaysBefore);
  if (!triggerDate) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Subscription renewal soon',
      body: `${subscription.name} renews on ${fromStableDateISOString(subscription.nextBillingDate).toLocaleDateString()}`,
      data: {
        type: NOTIFICATION_TYPE,
        subscriptionId: subscription.id,
      },
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
      channelId: Platform.OS === 'android' ? ANDROID_CHANNEL_ID : undefined,
    },
  });
}

export const notificationService = {
  async syncSubscriptionNotifications(
    subscriptions: Subscription[],
    notificationsEnabled: boolean,
    defaultReminderDaysBefore: number
  ): Promise<void> {
    if (Platform.OS === 'web') {
      return;
    }

    await ensureAndroidChannel();
    await cancelSubpatrolScheduledNotifications();

    if (isExpoGoRuntime) {
      return;
    }

    if (!notificationsEnabled) {
      return;
    }

    const hasPermission = await ensurePermissions();
    if (!hasPermission) {
      throw new Error('Notification permission not granted. Please enable notifications in system settings.');
    }

    await Promise.all(
      subscriptions.map((subscription) =>
        scheduleSubscriptionReminder(subscription, defaultReminderDaysBefore)
      )
    );
  },

  async canUseNotifications(): Promise<boolean> {
    const Notifications = await getNotificationsModule();
    if (!Notifications) {
      return false;
    }

    const status = await Notifications.getPermissionsAsync();
    return status.granted;
  },

  isSupportedRuntime(): boolean {
    return Platform.OS !== 'web' && !isExpoGoRuntime;
  },

  getNextReminderPreview(subscription: Subscription, defaultReminderDaysBefore: number): Date | null {
    return getReminderTriggerDate(subscription, defaultReminderDaysBefore);
  },

  getTodayLocalStart(): Date {
    return toLocalStartOfDay(new Date());
  },
};
