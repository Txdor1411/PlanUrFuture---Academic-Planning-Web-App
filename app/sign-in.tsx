import { GlassCard, GlowBackground, PuffButton, PuffLogo } from '@/components/puff';
import { PUF } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthMode = 'signIn' | 'signUp';

export default function SignInScreen() {
  const router = useRouter();
  const { session, signInWithEmail, signInWithGoogle, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)');
    }
  }, [router, session]);

  async function handleEmailSubmit() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Enter both an email address and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setMessage(null);

      if (mode === 'signIn') {
        await signInWithEmail(trimmedEmail, password);
        router.replace('/(tabs)');
        return;
      }

      const result = await signUpWithEmail(trimmedEmail, password);

      if (result.confirmationRequired) {
        setMessage('Check your email to confirm your account before signing in.');
        return;
      }

      router.replace('/(tabs)');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setIsGoogleLoading(true);
      setError(null);
      setMessage(null);
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Google sign-in failed.');
    } finally {
      setIsGoogleLoading(false);
    }
  }

  if (session) {
    return null;
  }

  const isSignIn = mode === 'signIn';
  const primaryLabel = isSubmitting ? 'Working...' : isSignIn ? 'Sign in' : 'Create account';

  return (
    <GlowBackground variant="top">
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoRow}>
              <PuffLogo size={28} />
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>{isSignIn ? 'Welcome back' : 'Create your account'}</Text>
              <Text style={styles.body}>
                {isSignIn
                  ? 'Use your email and password, or continue with Google.'
                  : 'Use email and password, or continue with Google to set up a new account.'}
              </Text>
            </View>

            <GlassCard
              radius={24}
              padding={18}
              style={styles.card}
              tint="rgba(255,255,255,0.04)"
              borderColor="rgba(255,255,255,0.12)"
            >
              <View style={styles.segmentRow}>
                <TouchableOpacity
                  onPress={() => setMode('signIn')}
                  activeOpacity={0.85}
                  style={[styles.segment, isSignIn && styles.segmentActive]}
                >
                  <Text style={[styles.segmentLabel, isSignIn && styles.segmentLabelActive]}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setMode('signUp')}
                  activeOpacity={0.85}
                  style={[styles.segment, !isSignIn && styles.segmentActive]}
                >
                  <Text style={[styles.segmentLabel, !isSignIn && styles.segmentLabelActive]}>Sign up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={PUF.textFaint}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={PUF.textFaint}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  textContentType={isSignIn ? 'password' : 'newPassword'}
                  autoComplete="password"
                  returnKeyType="done"
                  onSubmitEditing={handleEmailSubmit}
                />
              </View>

              {error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {message && (
                <View style={styles.successBox}>
                  <Text style={styles.successText}>{message}</Text>
                </View>
              )}

              <PuffButton onPress={handleEmailSubmit} disabled={isSubmitting}>
                {primaryLabel}
              </PuffButton>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <PuffButton variant="outline" onPress={handleGoogleSignIn} disabled={isGoogleLoading}>
                {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
              </PuffButton>

              <TouchableOpacity
                onPress={() => setMode(isSignIn ? 'signUp' : 'signIn')}
                activeOpacity={0.85}
                style={styles.switchRow}
              >
                <Text style={styles.switchText}>
                  {isSignIn ? 'New here? Create an account' : 'Already have an account? Sign in'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color={PUF.textFaint} />
              </TouchableOpacity>
            </GlassCard>

            <View style={styles.footerRow}>
              <Ionicons name="lock-closed-outline" size={14} color={PUF.textFaint} />
              <Text style={styles.footerText}>Supabase handles the session for email/password and Google.</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1 },
  content: { paddingHorizontal: 24, paddingBottom: 36 },
  logoRow: { alignItems: 'center', marginTop: 8, marginBottom: 26 },
  header: { marginBottom: 18 },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    color: PUF.text,
    letterSpacing: -0.8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: PUF.textDim,
    marginTop: 10,
  },
  card: { marginBottom: 16 },
  segmentRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 4,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  segmentLabel: {
    color: PUF.textFaint,
    fontSize: 14,
    fontWeight: '600',
  },
  segmentLabelActive: {
    color: PUF.text,
  },
  fieldGroup: { marginBottom: 14 },
  label: {
    color: PUF.textDim,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.14)',
    color: PUF.text,
    fontSize: 15,
  },
  errorBox: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(251,146,60,0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(251,146,60,0.3)',
  },
  errorText: { color: '#FECACA', fontSize: 13, lineHeight: 18 },
  successBox: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(74,222,128,0.10)',
    borderWidth: 0.5,
    borderColor: 'rgba(74,222,128,0.24)',
  },
  successText: { color: '#DCFCE7', fontSize: 13, lineHeight: 18 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  dividerText: {
    color: PUF.textFaint,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
  },
  switchText: {
    color: PUF.textDim,
    fontSize: 13,
    fontWeight: '500',
  },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, justifyContent: 'center' },
  footerText: { color: PUF.textFaint, fontSize: 11 },
});
