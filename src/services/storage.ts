import { Subscription } from '../models/subscription';

// Mock subscription data for prototype
export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'streaming',
    price: 419,
    currency: 'THB',
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-20T00:00:00.000Z',
    isTrial: false,
    status: 'active',
    reminderDaysBefore: 3,
    notes: 'Premium plan - 4K streaming',
    createdAt: '2026-02-20T00:00:00.000Z',
    updatedAt: '2026-02-20T00:00:00.000Z',
    iconColor: '#E50914',
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'music',
    price: 129,
    currency: 'THB',
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-25T00:00:00.000Z',
    isTrial: true,
    trialEndsDate: '2026-03-25T00:00:00.000Z',
    status: 'trial',
    reminderDaysBefore: 7,
    notes: 'Student discount available',
    createdAt: '2026-02-25T00:00:00.000Z',
    updatedAt: '2026-02-25T00:00:00.000Z',
    iconColor: '#1DB954',
  },
  {
    id: '3',
    name: 'ChatGPT Plus',
    category: 'productivity',
    price: 20,
    currency: 'USD',
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-18T00:00:00.000Z',
    isTrial: false,
    status: 'active',
    reminderDaysBefore: 3,
    createdAt: '2026-02-18T00:00:00.000Z',
    updatedAt: '2026-02-18T00:00:00.000Z',
    iconColor: '#10A37F',
  },
  {
    id: '4',
    name: 'Adobe Creative Cloud',
    category: 'productivity',
    price: 1899,
    currency: 'THB',
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-28T00:00:00.000Z',
    isTrial: false,
    status: 'active',
    reminderDaysBefore: 7,
    notes: 'Photography plan',
    createdAt: '2026-02-28T00:00:00.000Z',
    updatedAt: '2026-02-28T00:00:00.000Z',
    iconColor: '#FF0000',
  },
  {
    id: '5',
    name: 'YouTube Premium',
    category: 'streaming',
    price: 159,
    currency: 'THB',
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-22T00:00:00.000Z',
    isTrial: false,
    status: 'active',
    reminderDaysBefore: 3,
    createdAt: '2026-02-22T00:00:00.000Z',
    updatedAt: '2026-02-22T00:00:00.000Z',
    iconColor: '#FF0000',
  },
  {
    id: '6',
    name: 'GitHub Pro',
    category: 'productivity',
    price: 4,
    currency: 'USD',
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-15T00:00:00.000Z',
    isTrial: false,
    status: 'active',
    reminderDaysBefore: 1,
    createdAt: '2026-02-15T00:00:00.000Z',
    updatedAt: '2026-02-15T00:00:00.000Z',
    iconColor: '#181717',
  },
  {
    id: '7',
    name: 'Notion',
    category: 'productivity',
    price: 10,
    currency: 'USD',
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-30T00:00:00.000Z',
    isTrial: false,
    status: 'active',
    reminderDaysBefore: 3,
    notes: 'Personal Pro plan',
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z',
    iconColor: '#000000',
  },
];

// Simulated async storage using in-memory data for prototype
class StorageService {
  private subscriptions: Subscription[] = [...MOCK_SUBSCRIPTIONS];

  async getSubscriptions(): Promise<Subscription[]> {
    // Simulate network delay
    await this.delay(300);
    return [...this.subscriptions];
  }

  async getSubscriptionById(id: string): Promise<Subscription | null> {
    await this.delay(200);
    return this.subscriptions.find(sub => sub.id === id) || null;
  }

  async createSubscription(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    await this.delay(300);
    const newSubscription: Subscription = {
      ...subscription,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.subscriptions.push(newSubscription);
    return newSubscription;
  }

  async updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription | null> {
    await this.delay(300);
    const index = this.subscriptions.findIndex(sub => sub.id === id);
    if (index === -1) return null;
    
    this.subscriptions[index] = {
      ...this.subscriptions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.subscriptions[index];
  }

  async deleteSubscription(id: string): Promise<boolean> {
    await this.delay(300);
    const index = this.subscriptions.findIndex(sub => sub.id === id);
    if (index === -1) return false;
    
    this.subscriptions.splice(index, 1);
    return true;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const storageService = new StorageService();
