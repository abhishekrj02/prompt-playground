import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

// Mock user database
const mockUsers: Map<string, { password: string; user: User }> = new Map();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const stored = mockUsers.get(email);
        if (stored && stored.password === password) {
          set({ user: stored.user, isAuthenticated: true });
          return { success: true };
        }

        // Demo account for testing
        if (email === 'demo@example.com' && password === 'demo123') {
          const demoUser: User = {
            id: 'demo-user-001',
            email: 'demo@example.com',
            name: 'Demo User',
          };
          set({ user: demoUser, isAuthenticated: true });
          return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
      },

      signUp: async (email: string, password: string, name: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (mockUsers.has(email) || email === 'demo@example.com') {
          return { success: false, error: 'Email already registered' };
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          name,
        };

        mockUsers.set(email, { password, user: newUser });
        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },

      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
