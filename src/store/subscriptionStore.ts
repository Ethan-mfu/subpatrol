import { create } from 'zustand';
import { Subscription } from '../models/subscription';
import { UserPreferences, DEFAULT_USER_PREFERENCES } from '../models/user';
import { apiService } from '../services/api';

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
      const subscriptions = await apiService.fetchSubscriptions();
      set({ subscriptions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load subscriptions', isLoading: false });
    }
  },

  // Add new subscription
  addSubscription: async (subscription) => {
    set({ isLoading: true, error: null });
    try {
      const newSubscription = await apiService.createSubscription(subscription);
      set((state) => ({
        subscriptions: [...state.subscriptions, newSubscription],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add subscription', isLoading: false });
      throw error;
    }
  },

  // Update existing subscription
  updateSubscription: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
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
      set({ error: 'Failed to update subscription', isLoading: false });
      throw error;
    }
  },

  // Delete subscription
  deleteSubscription: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.deleteSubscription(id);
      set((state) => ({
        subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete subscription', isLoading: false });
      throw error;
    }
  },

  // Update user preferences
  updateUserPreferences: (preferences) => {
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    }));
  },
}));
