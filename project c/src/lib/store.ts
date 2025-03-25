import { create } from 'zustand';
import { supabase } from './supabase';

interface Profile {
  id: string;
  role: 'patient' | 'doctor' | 'chemist';
  full_name: string;
  email: string;
}

interface UserState {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => {
    supabase.auth.signOut();
    set({ user: null });
  },
}));

// Initialize user session
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    // Fetch user profile
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data: profile }) => {
        if (profile) {
          useUserStore.getState().setUser({
            id: profile.id,
            role: profile.role,
            full_name: profile.full_name,
            email: session.user.email!,
          });
        }
      });
  }
});

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    useUserStore.getState().clearUser();
  } else if (session?.user && event === 'SIGNED_IN') {
    // Fetch user profile
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data: profile }) => {
        if (profile) {
          useUserStore.getState().setUser({
            id: profile.id,
            role: profile.role,
            full_name: profile.full_name,
            email: session.user.email!,
          });
        }
      });
  }
});