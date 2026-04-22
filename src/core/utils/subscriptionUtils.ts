import { Subscription, BillingCycle } from '../../models/subscription';
import { CURRENCIES, EXCHANGE_RATES_TO_USD } from '../constants';
import { fromStableDateISOString, toLocalStartOfDay } from './dateUtils';

/**
 * Format currency value with symbol
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = CURRENCIES.find(c => c.code === currencyCode);
  const symbol = currency?.symbol || currencyCode;
  
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = fromStableDateISOString(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculate days until next billing
 */
export function daysUntilBilling(nextBillingDate: string): number {
  const today = toLocalStartOfDay(new Date());
  const billingDate = toLocalStartOfDay(fromStableDateISOString(nextBillingDate));
  const diffTime = billingDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get relative time string (e.g., "in 3 days", "tomorrow")
 */
export function getRelativeTimeString(days: number): string {
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `In ${days} days`;
  if (days < 14) return 'In 1 week';
  if (days < 30) return `In ${Math.floor(days / 7)} weeks`;
  if (days < 60) return 'In 1 month';
  return `In ${Math.floor(days / 30)} months`;
}

/**
 * Calculate monthly cost for a subscription
 */
export function getMonthlyEquivalent(price: number, cycle: BillingCycle): number {
  const multipliers: Record<BillingCycle, number> = {
    daily: 30,
    weekly: 4.33,
    monthly: 1,
    yearly: 1 / 12,
  };
  return price * multipliers[cycle];
}

/**
 * Advance a billing date by one billing cycle.
 */
export function advanceBillingDate(date: Date, cycle: BillingCycle): Date {
  const nextDate = new Date(date);

  switch (cycle) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'weekly':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'yearly':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
  }

  return nextDate;
}

/**
 * Convert between supported currencies using static USD reference rates.
 */
export function convertCurrencyAmount(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) return amount;

  const fromRate = EXCHANGE_RATES_TO_USD[fromCurrency];
  const toRate = EXCHANGE_RATES_TO_USD[toCurrency];

  if (!fromRate || !toRate) {
    return 0;
  }

  const amountInUsd = amount * fromRate;
  return amountInUsd / toRate;
}

/**
 * Calculate total monthly spending across all subscriptions
 */
export function calculateMonthlyTotal(subscriptions: Subscription[], targetCurrency: string = 'THB'): number {
  return subscriptions.reduce((total, sub) => {
    if (sub.status === 'cancelled' || sub.status === 'expired') return total;
    
    const monthlyAmount = getMonthlyEquivalent(sub.price, sub.billingCycle);

    return total + convertCurrencyAmount(monthlyAmount, sub.currency, targetCurrency);
  }, 0);
}

/**
 * Get color for subscription category
 */
export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    streaming: '#E50914',
    music: '#1DB954',
    productivity: '#0078D4',
    fitness: '#FF6B35',
    gaming: '#9146FF',
    education: '#4CAF50',
    cloud: '#4285F4',
    other: '#757575',
  };
  return colorMap[category] || colorMap.other;
}

/**
 * Get category icon/emoji
 */
export function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    streaming: '🎬',
    music: '🎵',
    productivity: '💼',
    fitness: '💪',
    gaming: '🎮',
    education: '📚',
    cloud: '☁️',
    other: '📱',
  };
  return iconMap[category] || iconMap.other;
}

/**
 * Check if subscription needs reminder
 */
export function needsReminder(subscription: Subscription): boolean {
  const daysUntil = daysUntilBilling(subscription.nextBillingDate);
  return daysUntil <= subscription.reminderDaysBefore && daysUntil >= 0;
}

/**
 * Sort subscriptions by next billing date
 */
export function sortByNextBilling(subscriptions: Subscription[]): Subscription[] {
  return [...subscriptions].sort((a, b) => {
    const dateA = fromStableDateISOString(a.nextBillingDate).getTime();
    const dateB = fromStableDateISOString(b.nextBillingDate).getTime();
    return dateA - dateB;
  });
}
