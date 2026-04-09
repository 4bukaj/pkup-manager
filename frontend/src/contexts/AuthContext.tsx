import type { User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '../supabaseClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const email = session?.user?.email ?? '';
      if (session && !email.endsWith('@cobrick.com')) {
        await supabase.auth.signOut();
        setUser(null);
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Separate effect for ensuring user settings and syncing tokens
  useEffect(() => {
    if (!user) return;

    const syncUserSettings = async () => {
      // Get current session to get provider_token if available

      try {
        const { data: settings, error: fetchError } = await supabase
          .from('user_settings')
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching user settings:', fetchError);
          return;
        }

        const settingsData: any = { user_id: user.id };

        if (!settings) {
          await supabase.from('user_settings').insert(settingsData);
        }
      } catch (err) {
        console.error('Failed to sync user settings:', err);
      }
    };

    syncUserSettings();
  }, [user]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: { hd: 'cobrick.com' },
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase signOut error:', error);
      }
    } catch (err) {
      console.error('Unexpected error during signOut:', err);
    } finally {
      setUser(null);

      const keysToRemove = Object.keys(localStorage).filter(
        (key) => key.startsWith('sb-') && key.endsWith('-auth-token')
      );
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
