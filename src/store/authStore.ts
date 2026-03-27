import { create } from 'zustand';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

type AuthMode = 'unauthenticated' | 'authenticated' | 'guest';

interface AuthStore {
  user: User | null;
  mode: AuthMode;
  loading: boolean;
  error: string | null;
  hasSeenLanding: boolean;
  initialized: boolean;
  setHasSeenLanding: (value: boolean) => void;
  setMode: (mode: AuthMode) => void;
  clearError: () => void;
  initializeAuth: () => () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => Promise<void>;
}

const normalizeAuthError = (message: string): string => {
  if (message.includes('invalid-credential') || message.includes('wrong-password')) {
    return 'Invalid email or password.';
  }
  if (message.includes('user-not-found')) {
    return 'No account found for this email.';
  }
  if (message.includes('email-already-in-use')) {
    return 'This email is already in use.';
  }
  if (message.includes('weak-password')) {
    return 'Password should be at least 6 characters.';
  }
  if (message.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  }
  return 'Authentication failed. Please try again.';
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  mode: 'unauthenticated',
  loading: false,
  error: null,
  hasSeenLanding: false,
  initialized: false,

  setHasSeenLanding: (value) => set({ hasSeenLanding: value }),

  setMode: (mode) => set({ mode }),

  clearError: () => set({ error: null }),

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentMode = get().mode;
      if (user) {
        set({
          user,
          mode: 'authenticated',
          initialized: true,
          loading: false,
          error: null,
        });
        return;
      }

      // Keep guest mode in-memory for current session.
      if (currentMode === 'guest') {
        set({ initialized: true, loading: false, user: null, error: null });
        return;
      }

      set({
        user: null,
        mode: 'unauthenticated',
        initialized: true,
        loading: false,
        error: null,
      });
    });

    return unsubscribe;
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      set({ loading: false, error: normalizeAuthError(message) });
      throw error;
    }
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      set({ loading: false, error: normalizeAuthError(message) });
      throw error;
    }
  },

  continueAsGuest: () => {
    set({ mode: 'guest', user: null, error: null, loading: false, initialized: true });
  },

  logout: async () => {
    const currentMode = get().mode;
    set({ loading: true, error: null });
    try {
      if (currentMode === 'authenticated') {
        await signOut(auth);
      }
      set({
        user: null,
        mode: 'unauthenticated',
        loading: false,
        error: null,
        hasSeenLanding: false,
      });
    } catch (error) {
      set({ loading: false, error: 'Failed to logout. Please try again.' });
      throw error;
    }
  },
}));
