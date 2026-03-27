import { create } from 'zustand';
import { Subscription } from '../models/subscription';
import { UserPreferences, DEFAULT_USER_PREFERENCES } from '../models/user';
import { apiService } from '../services/api';
import { useAuthStore } from './authStore';
import { firestoreSubscriptionsService } from '../services/firestoreSubscriptions';

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
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
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
    } catch (error) {
      const message = getStoreErrorMessage(error, 'Failed to delete subscription');
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Update user preferences
  updateUserPreferences: (preferences) => {
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    }));
  },
}));
