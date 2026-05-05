import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isHydrating, onboardingComplete, session } = useAuth();

  if (isHydrating) {
    return null;
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  if (!onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/sign-in" />;
}
