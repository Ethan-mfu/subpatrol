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
    const now = new Date().toISOString();
    const payload = removeUndefinedFields({
      ...subscription,
      createdAt: now,
      updatedAt: now,
    });

    const created = await addDoc(subscriptionsCollection(userId), payload);

    return {
      id: created.id,
      ...subscription,
      createdAt: now,
      updatedAt: now,
    };
  }

  async updateSubscription(
    userId: string,
    id: string,
    updates: Partial<Subscription>
  ): Promise<void> {
    const ref = doc(db, 'users', userId, 'subscriptions', id);
    const payload = removeUndefinedFields({
      ...updates,
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
