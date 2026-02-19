export type BillingCycle = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'trial' | 'cancelled' | 'expired';
export type SubscriptionCategory = 
  | 'streaming'
  | 'music'
  | 'productivity'
  | 'fitness'
  | 'gaming'
  | 'education'
  | 'cloud'
  | 'other';

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  nextBillingDate: string; // ISO date string
  isTrial: boolean;
  trialEndsDate?: string; // ISO date string
  status: SubscriptionStatus;
  reminderDaysBefore: number;
  notes?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  iconColor?: string; // Hex color for visual identification
}

export interface SubscriptionFormData {
  name: string;
  category: SubscriptionCategory;
  price: string;
  currency: string;
  billingCycle: BillingCycle;
  nextBillingDate: Date;
  isTrial: boolean;
  trialEndsDate?: Date;
  status: SubscriptionStatus;
  reminderDaysBefore: number;
  notes?: string;
}
