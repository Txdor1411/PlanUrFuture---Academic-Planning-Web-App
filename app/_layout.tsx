import { PUF } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function RouteGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isHydrating, onboardingComplete, session } = useAuth();

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    const isPublicRoute = pathname === '/' || pathname === '/onboarding' || pathname === '/sign-in' || pathname === '/auth/callback';

    if (session) {
      if (isPublicRoute) {
        router.replace('/(tabs)');
      }

      return;
    }

    if (!onboardingComplete) {
      if (pathname !== '/onboarding') {
        router.replace('/onboarding');
      }

      return;
    }

    if (pathname !== '/sign-in') {
      router.replace('/sign-in');
    }
  }, [isHydrating, onboardingComplete, pathname, router, session]);

  if (isHydrating) {
    return <View style={{ flex: 1, backgroundColor: PUF.bg }} />;
  }

  return children;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RouteGate>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="profile-builder" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="tracker" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="paywall" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
          </Stack>
        </RouteGate>
      </AuthProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
