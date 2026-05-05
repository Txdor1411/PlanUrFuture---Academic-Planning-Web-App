import { readJson, writeJson } from '@/lib/storage';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const ONBOARDING_STORAGE_KEY = '@puf/onboarding-complete';

export type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_complete: boolean;
  app_state: Record<string, unknown>;
  updated_at: string | null;
};

type AuthContextValue = {
  isHydrating: boolean;
  onboardingComplete: boolean;
  session: Session | null;
  user: User | null;
  profile: ProfileRow | null;
  appState: Record<string, unknown>;
  completeOnboarding: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ confirmationRequired: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setAppStateValue: (key: string, value: unknown) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getDisplayName(user: User) {
  const metadataName = user.user_metadata?.full_name ?? user.user_metadata?.name;

  if (typeof metadataName === 'string' && metadataName.trim()) {
    return metadataName;
  }

  return user.email ?? 'PUF user';
}

function getAvatarUrl(user: User) {
  const avatar = user.user_metadata?.avatar_url ?? user.user_metadata?.picture;

  return typeof avatar === 'string' && avatar.trim() ? avatar : null;
}

function getRedirectTo() {
  return makeRedirectUri({ scheme: 'planyourfuture', path: 'auth/callback' });
}

function readHashParams(urlString: string) {
  const hash = urlString.includes('#') ? urlString.split('#')[1] : '';
  return new URLSearchParams(hash);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isHydrating, setIsHydrating] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  const refreshProfile = useCallback(async () => {
    const currentSession = session ?? (await supabase.auth.getSession()).data.session;

    if (!currentSession) {
      setProfile(null);
      return;
    }

    const user = currentSession.user;
    const localOnboarding = Boolean(await readJson<boolean>(ONBOARDING_STORAGE_KEY));
    const displayName = getDisplayName(user);
    const avatarUrl = getAvatarUrl(user);

    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, onboarding_complete, app_state, updated_at')
      .eq('id', user.id)
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    const nextProfileBase = {
      id: user.id,
      full_name: displayName,
      avatar_url: avatarUrl,
      onboarding_complete: localOnboarding || existingProfile?.onboarding_complete || false,
    };

    const profileResult = existingProfile
      ? await supabase
          .from('profiles')
          .update(nextProfileBase)
          .eq('id', user.id)
          .select('id, full_name, avatar_url, onboarding_complete, app_state, updated_at')
          .single()
      : await supabase
          .from('profiles')
          .insert(nextProfileBase)
          .select('id, full_name, avatar_url, onboarding_complete, app_state, updated_at')
          .single();

    if (profileResult.error) {
      throw profileResult.error;
    }

    const profileRow = profileResult.data;

    setProfile({
      id: profileRow.id,
      full_name: profileRow.full_name,
      avatar_url: profileRow.avatar_url,
      onboarding_complete: profileRow.onboarding_complete,
      app_state: (profileRow.app_state ?? {}) as Record<string, unknown>,
      updated_at: profileRow.updated_at,
    });
    setOnboardingComplete(Boolean(localOnboarding || profileRow.onboarding_complete));
  }, [session]);

  useEffect(() => {
    let isActive = true;

    async function hydrate() {
      try {
        const [storedOnboarding, sessionResult] = await Promise.all([
          readJson<boolean>(ONBOARDING_STORAGE_KEY),
          supabase.auth.getSession(),
        ]);

        if (!isActive) {
          return;
        }

        setOnboardingComplete(Boolean(storedOnboarding));
        setSession(sessionResult.data.session ?? null);

        if (sessionResult.data.session) {
          await refreshProfile();
        } else {
          setProfile(null);
        }
      } finally {
        if (isActive) {
          setIsHydrating(false);
        }
      }
    }

    hydrate();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!isActive) {
        return;
      }

      setSession(nextSession);

      if (nextSession) {
        try {
          await refreshProfile();
        } finally {
          setIsHydrating(false);
        }
      } else {
        setProfile(null);
        setIsHydrating(false);
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const completeOnboarding = useCallback(async () => {
    setOnboardingComplete(true);
    await writeJson(ONBOARDING_STORAGE_KEY, true);

    if (session) {
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_complete: true, updated_at: new Date().toISOString() })
        .eq('id', session.user.id);

      if (error) {
        throw error;
      }

      setProfile(current => current ? { ...current, onboarding_complete: true } : current);
    }
  }, [session]);

  const signInWithGoogle = useCallback(async () => {
    const redirectTo = getRedirectTo();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw error;
    }

    const authResult = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (authResult.type !== 'success') {
      throw new Error('Google sign-in was cancelled.');
    }

    const parsedUrl = new URL(authResult.url);
    const code = parsedUrl.searchParams.get('code');

    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        throw exchangeError;
      }
    } else {
      const hashParams = readHashParams(authResult.url);
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (!accessToken || !refreshToken) {
        throw new Error('OAuth callback did not return a Supabase session.');
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        throw sessionError;
      }
    }

    const nextSession = (await supabase.auth.getSession()).data.session;

    if (!nextSession) {
      throw new Error('Unable to establish a Supabase session.');
    }

    setSession(nextSession);
    await refreshProfile();
  }, [refreshProfile]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!data.session) {
      throw new Error('Email sign-in did not return a session.');
    }

    setSession(data.session);
    await refreshProfile();
  }, [refreshProfile]);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getRedirectTo(),
      },
    });

    if (error) {
      throw error;
    }

    if (data.session) {
      setSession(data.session);
      await refreshProfile();
      return { confirmationRequired: false };
    }

    return { confirmationRequired: true };
  }, [refreshProfile]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setSession(null);
    setProfile(null);
  }, []);

  const setAppStateValue = useCallback(async (key: string, value: unknown) => {
    if (!session) {
      return;
    }

    const nextAppState = {
      ...(profile?.app_state ?? {}),
      [key]: value,
    };

    setProfile(current => current ? { ...current, app_state: nextAppState } : current);

    const { error } = await supabase
      .from('profiles')
      .update({ app_state: nextAppState, updated_at: new Date().toISOString() })
      .eq('id', session.user.id);

    if (error) {
      throw error;
    }
  }, [profile?.app_state, session]);

  const value = useMemo<AuthContextValue>(() => ({
    isHydrating,
    onboardingComplete,
    session,
    user: session?.user ?? null,
    profile,
    appState: profile?.app_state ?? {},
    completeOnboarding,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    refreshProfile,
    setAppStateValue,
  }), [completeOnboarding, isHydrating, onboardingComplete, profile, refreshProfile, setAppStateValue, session, signInWithEmail, signInWithGoogle, signOut, signUpWithEmail]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}