import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function AuthCallbackScreen() {
  const router = useRouter();
  const { session, isHydrating } = useAuth();

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    if (session) {
      router.replace('/(tabs)');
    } else {
      router.replace('/sign-in');
    }
  }, [isHydrating, router, session]);

  return <View style={{ flex: 1, backgroundColor: 'transparent' }} />;
}