export interface UserPreferences {
  currency: string;
  timezone: string;
  notificationsEnabled: boolean;
  defaultReminderDaysBefore: number;
  theme?: 'light' | 'dark' | 'auto';
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  currency: 'THB',
  timezone: 'Asia/Bangkok',
  notificationsEnabled: true,
  defaultReminderDaysBefore: 3,
  theme: 'light',
};
