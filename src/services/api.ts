// API service placeholder for future backend integration
// For Week 4, this will use the storage service as a mock

import { Subscription } from '../models/subscription';
import { storageService } from './storage';

class ApiService {
  async fetchSubscriptions(): Promise<Subscription[]> {
    // TODO: Replace with actual API call
    return storageService.getSubscriptions();
  }

  async fetchSubscriptionById(id: string): Promise<Subscription | null> {
    // TODO: Replace with actual API call
    return storageService.getSubscriptionById(id);
  }

  async createSubscription(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    // TODO: Replace with actual API call
    return storageService.createSubscription(subscription);
  }

  async updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription | null> {
    // TODO: Replace with actual API call
    return storageService.updateSubscription(id, updates);
  }

  async deleteSubscription(id: string): Promise<boolean> {
    // TODO: Replace with actual API call
    return storageService.deleteSubscription(id);
  }
}

export const apiService = new ApiService();
