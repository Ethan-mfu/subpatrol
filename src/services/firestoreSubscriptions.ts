import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { Subscription } from '../models/subscription';
import { db } from '../config/firebase';

const subscriptionsCollection = (userId: string) =>
  collection(db, 'users', userId, 'subscriptions');

const ALLOWED_CATEGORIES = new Set([
  'streaming',
  'music',
  'productivity',
  'fitness',
  'gaming',
  'education',
  'cloud',
  'other',
]);

const ALLOWED_BILLING_CYCLES = new Set(['daily', 'weekly', 'monthly', 'yearly']);
const ALLOWED_STATUSES = new Set(['active', 'trial', 'cancelled', 'expired']);
const ALLOWED_CURRENCIES = new Set(['THB', 'USD', 'EUR', 'GBP']);
const ALLOWED_REMINDER_DAYS = new Set([1, 3, 7, 14]);

type SubscriptionCreateInput = Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>;
type SubscriptionUpdateInput = Partial<
  Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>
>;

const isIsoDateString = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  return !Number.isNaN(new Date(value).getTime());
};

const normalizeOptionalString = (value: unknown, maxLength: number): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') {
    throw new Error('Invalid text field type.');
  }
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > maxLength) {
    throw new Error(`Text field exceeds ${maxLength} characters.`);
  }
  return trimmed;
};

const validateName = (value: unknown): string => {
  if (typeof value !== 'string') {
    throw new Error('Subscription name must be a string.');
  }
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error('Subscription name is required.');
  }
  if (trimmed.length > 100) {
    throw new Error('Subscription name is too long.');
  }
  return trimmed;
};

const validatePrice = (value: unknown): number => {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    throw new Error('Price must be a valid number.');
  }
  if (value <= 0 || value > 1000000) {
    throw new Error('Price is out of allowed range.');
  }
  return Number(value.toFixed(2));
};

const validateStringEnum = (
  value: unknown,
  allowed: Set<string>,
  fieldName: string
): string => {
  if (typeof value !== 'string' || !allowed.has(value)) {
    throw new Error(`Invalid ${fieldName}.`);
  }
  return value;
};

const validateReminderDays = (value: unknown): number => {
  if (typeof value !== 'number' || !ALLOWED_REMINDER_DAYS.has(value)) {
    throw new Error('Invalid reminder days value.');
  }
  return value;
};

const validateCreatePayload = (input: SubscriptionCreateInput): SubscriptionCreateInput => {
  const nextBillingDate = input.nextBillingDate;
  if (!isIsoDateString(nextBillingDate)) {
    throw new Error('Invalid next billing date.');
  }

  const isTrial = Boolean(input.isTrial);
  const sanitized: SubscriptionCreateInput = {
    name: validateName(input.name),
    category: validateStringEnum(input.category, ALLOWED_CATEGORIES, 'category') as SubscriptionCreateInput['category'],
    price: validatePrice(input.price),
    currency: validateStringEnum(input.currency, ALLOWED_CURRENCIES, 'currency'),
    billingCycle: validateStringEnum(input.billingCycle, ALLOWED_BILLING_CYCLES, 'billing cycle') as SubscriptionCreateInput['billingCycle'],
    nextBillingDate,
    isTrial,
    status: validateStringEnum(input.status, ALLOWED_STATUSES, 'status') as SubscriptionCreateInput['status'],
    reminderDaysBefore: validateReminderDays(input.reminderDaysBefore),
    notes: normalizeOptionalString(input.notes, 500),
    iconColor: normalizeOptionalString(input.iconColor, 20),
    trialEndsDate: input.trialEndsDate,
  };

  if (isTrial && !isIsoDateString(input.trialEndsDate)) {
    throw new Error('Trial end date is required for trial subscriptions.');
  }

  if (!isTrial) {
    sanitized.trialEndsDate = undefined;
  }

  return sanitized;
};

const sanitizeUpdatePayload = (updates: Partial<Subscription>): SubscriptionUpdateInput => {
  const allowedUpdateKeys = new Set([
    'name',
    'category',
    'price',
    'currency',
    'billingCycle',
    'nextBillingDate',
    'isTrial',
    'trialEndsDate',
    'status',
    'reminderDaysBefore',
    'notes',
    'iconColor',
  ]);

  const incomingKeys = Object.keys(updates);
  const unknownKey = incomingKeys.find((key) => !allowedUpdateKeys.has(key));
  if (unknownKey) {
    throw new Error(`Unsupported update field: ${unknownKey}`);
  }

  const sanitized: SubscriptionUpdateInput = {};

  if ('name' in updates) sanitized.name = validateName(updates.name);
  if ('category' in updates) sanitized.category = validateStringEnum(updates.category, ALLOWED_CATEGORIES, 'category') as SubscriptionUpdateInput['category'];
  if ('price' in updates) sanitized.price = validatePrice(updates.price);
  if ('currency' in updates) sanitized.currency = validateStringEnum(updates.currency, ALLOWED_CURRENCIES, 'currency');
  if ('billingCycle' in updates) sanitized.billingCycle = validateStringEnum(updates.billingCycle, ALLOWED_BILLING_CYCLES, 'billing cycle') as SubscriptionUpdateInput['billingCycle'];
  if ('nextBillingDate' in updates) {
    if (!isIsoDateString(updates.nextBillingDate)) {
      throw new Error('Invalid next billing date.');
    }
    sanitized.nextBillingDate = updates.nextBillingDate;
  }
  if ('isTrial' in updates) sanitized.isTrial = Boolean(updates.isTrial);
  if ('trialEndsDate' in updates) {
    if (updates.trialEndsDate !== undefined && !isIsoDateString(updates.trialEndsDate)) {
      throw new Error('Invalid trial end date.');
    }
    sanitized.trialEndsDate = updates.trialEndsDate;
  }
  if ('status' in updates) sanitized.status = validateStringEnum(updates.status, ALLOWED_STATUSES, 'status') as SubscriptionUpdateInput['status'];
  if ('reminderDaysBefore' in updates) sanitized.reminderDaysBefore = validateReminderDays(updates.reminderDaysBefore);
  if ('notes' in updates) sanitized.notes = normalizeOptionalString(updates.notes, 500);
  if ('iconColor' in updates) sanitized.iconColor = normalizeOptionalString(updates.iconColor, 20);

  if (sanitized.isTrial === false) {
    sanitized.trialEndsDate = undefined;
  }
  if (sanitized.isTrial === true && 'trialEndsDate' in sanitized && sanitized.trialEndsDate === undefined) {
    throw new Error('Trial end date is required when trial is enabled.');
  }

  return sanitized;
};

const removeUndefinedFields = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const cleanedEntries = Object.entries(obj).filter(([, value]) => value !== undefined);
  return Object.fromEntries(cleanedEntries) as Partial<T>;
};

class FirestoreSubscriptionsService {
  async fetchSubscriptions(userId: string): Promise<Subscription[]> {
    const q = query(subscriptionsCollection(userId), orderBy('nextBillingDate', 'asc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((entry) => {
      const data = entry.data() as Omit<Subscription, 'id'>;
      return {
        id: entry.id,
        ...data,
      };
    });
  }

  async createSubscription(
    userId: string,
    subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Subscription> {
    const validatedSubscription = validateCreatePayload(subscription);
    const now = new Date().toISOString();
    const payload = removeUndefinedFields({
      ...validatedSubscription,
      createdAt: now,
      updatedAt: now,
    });

    const created = await addDoc(subscriptionsCollection(userId), payload);

    return {
      id: created.id,
      ...validatedSubscription,
      createdAt: now,
      updatedAt: now,
    };
  }

  async updateSubscription(
    userId: string,
    id: string,
    updates: Partial<Subscription>
  ): Promise<void> {
    const sanitizedUpdates = sanitizeUpdatePayload(updates);
    const ref = doc(db, 'users', userId, 'subscriptions', id);
    const payload = removeUndefinedFields({
      ...sanitizedUpdates,
      updatedAt: new Date().toISOString(),
    });

    await updateDoc(ref, payload);
  }

  async deleteSubscription(userId: string, id: string): Promise<void> {
    const ref = doc(db, 'users', userId, 'subscriptions', id);
    await deleteDoc(ref);
  }
}

export const firestoreSubscriptionsService = new FirestoreSubscriptionsService();
