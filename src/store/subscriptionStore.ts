import { create } from 'zustand';
import { Subscription } from '../models/subscription';
import { UserPreferences, DEFAULT_USER_PREFERENCES } from '../models/user';
import { apiService } from '../services/api';
import { useAuthStore } from './authStore';
import { firestoreSubscriptionsService } from '../services/firestoreSubscriptions';
import { notificationService } from '../services/notifications';
import { advanceBillingDate } from '../core/utils/subscriptionUtils';
import { fromStableDateISOString, toStableDateISOString } from '../core/utils/dateUtils';

const mapFriendlyValidationMessage = (rawMessage: string): string | null => {
  const message = rawMessage.toLowerCase();

  if (message.includes('subscription name')) {
    return 'Please enter a valid subscription name (1-100 characters).';
  }
  if (message.includes('price')) {
    return 'Please enter a valid price greater than 0.';
  }
  if (message.includes('currency')) {
    return 'Please select a supported currency (THB, USD, EUR, or GBP).';
  }
  if (message.includes('category')) {
    return 'Please select a valid category.';
  }
  if (message.includes('billing cycle')) {
    return 'Please select a valid billing cycle.';
  }
  if (message.includes('status')) {
    return 'Please select a valid subscription status.';
  }
  if (message.includes('next billing date')) {
    return 'Please choose a valid next billing date.';
  }
  if (message.includes('trial end date')) {
    return 'Please choose a valid trial end date when trial mode is enabled.';
  }
  if (message.includes('reminder days')) {
    return 'Please choose a valid reminder value (1, 3, 7, or 14 days).';
  }
  if (message.includes('unsupported update field')) {
    return 'Some submitted fields are not allowed. Please update the app and try again.';
  }
  if (message.includes('invalid text field type') || message.includes('text field exceeds')) {
    return 'Some text input is invalid or too long. Please shorten it and try again.';
  }

  return null;
};

const getStoreErrorMessage = (error: unknown, fallback: string): string => {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code || '')
      : '';

  if (code.includes('permission-denied')) {
    return 'Permission denied. Check Firestore rules and sign-in status.';
  }
  if (code.includes('unavailable')) {
    return 'Firestore is temporarily unavailable. Please try again.';
  }
  if (code.includes('unauthenticated')) {
    return 'Authentication expired. Please sign in again.';
  }

  if (error instanceof Error && error.message.trim()) {
    const friendlyMessage = mapFriendlyValidationMessage(error.message);
    if (friendlyMessage) {
      return friendlyMessage;
    }
    return error.message;
  }

  return fallback;
};

interface SubscriptionStore {
  // State
  subscriptions: Subscription[];
  isLoading: boolean;
  error: string | null;
  userPreferences: UserPreferences;

  // Actions
  fetchSubscriptions: () => Promise<void>;
  addSubscription: (subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSubscription: (id: string, updates: Partial<Subscription>) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
  markSubscriptionAsPaid: (id: string) => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  // Initial state
  subscriptions: [],
  isLoading: false,
  error: null,
  userPreferences: DEFAULT_USER_PREFERENCES,

  // Fetch all subscriptions
  fetchSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const { mode, user } = useAuthStore.getState();
      const subscriptions =
        mode === 'authenticated' && user
          ? await firestoreSubscriptionsService.fetchSubscriptions(user.uid)
          : await apiService.fetchSubscriptions();
      set({ subscriptions, isLoading: false });

      const preferences = get().userPreferences;
      try {
        await notificationService.syncSubscriptionNotifications(
          subscriptions,
          preferences.notificationsEnabled,
          preferences.defaultReminderDaysBefore
        );
      } catch {
        // Keep data flow working even if notification sync fails.
      }
    } catch (error) {
      set({ error: getStoreErrorMessage(error, 'Failed to load subscriptions'), isLoading: false });
    }
  },

  // Add new subscription
  addSubscription: async (subscription) => {
    set({ isLoading: true, error: null });
    try {
      const { mode, user } = useAuthStore.getState();
      const newSubscription =
        mode === 'authenticated' && user
          ? await firestoreSubscriptionsService.createSubscription(user.uid, subscription)
          : await apiService.createSubscription(subscription);
      set((state) => ({
        subscriptions: [...state.subscriptions, newSubscription],
        isLoading: false,
      }));

      const state = get();
      try {
        await notificationService.syncSubscriptionNotifications(
          state.subscriptions,
          state.userPreferences.notificationsEnabled,
          state.userPreferences.defaultReminderDaysBefore
        );
      } catch {
        // Do not block successful saves if notification sync fails.
      }
    } catch (error) {
      const message = getStoreErrorMessage(error, 'Failed to add subscription');
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Update existing subscription
  updateSubscription: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { mode, user } = useAuthStore.getState();

      if (mode === 'authenticated' && user) {
        await firestoreSubscriptionsService.updateSubscription(user.uid, id, updates);
        set((state) => ({
          subscriptions: state.subscriptions.map((sub) =>
            sub.id === id
              ? {
                  ...sub,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : sub
          ),
          isLoading: false,
        }));

        const state = get();
        try {
          await notificationService.syncSubscriptionNotifications(
            state.subscriptions,
            state.userPreferences.notificationsEnabled,
            state.userPreferences.defaultReminderDaysBefore
          );
        } catch {
          // Do not block successful updates if notification sync fails.
        }
        return;
      }

      const updatedSubscription = await apiService.updateSubscription(id, updates);
      if (updatedSubscription) {
        set((state) => ({
          subscriptions: state.subscriptions.map((sub) =>
            sub.id === id ? updatedSubscription : sub
          ),
          isLoading: false,
        }));

        const state = get();
        try {
          await notificationService.syncSubscriptionNotifications(
            state.subscriptions,
            state.userPreferences.notificationsEnabled,
            state.userPreferences.defaultReminderDaysBefore
          );
        } catch {
          // Do not block successful updates if notification sync fails.
        }
      }
    } catch (error) {
      const message = getStoreErrorMessage(error, 'Failed to update subscription');
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Delete subscription
  deleteSubscription: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { mode, user } = useAuthStore.getState();
      if (mode === 'authenticated' && user) {
        await firestoreSubscriptionsService.deleteSubscription(user.uid, id);
      } else {
        await apiService.deleteSubscription(id);
      }
      set((state) => ({
        subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        isLoading: false,
      }));

      const state = get();
      try {
        await notificationService.syncSubscriptionNotifications(
          state.subscriptions,
          state.userPreferences.notificationsEnabled,
          state.userPreferences.defaultReminderDaysBefore
        );
      } catch {
        // Do not block successful deletes if notification sync fails.
      }
    } catch (error) {
      const message = getStoreErrorMessage(error, 'Failed to delete subscription');
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Mark subscription as paid and move to next billing cycle
  markSubscriptionAsPaid: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const currentSubscription = get().subscriptions.find((sub) => sub.id === id);
      if (!currentSubscription) {
        throw new Error('Subscription not found.');
      }

      if (currentSubscription.isTrial) {
        throw new Error('Trial subscriptions cannot be marked as paid.');
      }

      const nextBillingDate = advanceBillingDate(
        fromStableDateISOString(currentSubscription.nextBillingDate),
        currentSubscription.billingCycle
      );

      const updatedNextBillingDate = toStableDateISOString(nextBillingDate);
      await get().updateSubscription(id, {
        nextBillingDate: updatedNextBillingDate,
      });

      set({ isLoading: false, error: null });
    } catch (error) {
      const message = getStoreErrorMessage(error, 'Failed to mark subscription as paid');
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Update user preferences
  updateUserPreferences: async (preferences) => {
    const previous = get().userPreferences;
    const next = { ...previous, ...preferences };

    set({ userPreferences: next });

    try {
      await notificationService.syncSubscriptionNotifications(
        get().subscriptions,
        next.notificationsEnabled,
        next.defaultReminderDaysBefore
      );
    } catch (error) {
      set({ userPreferences: previous });
      throw error;
    }
  },
}));
