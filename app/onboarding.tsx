import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlassCard, GlowBackground, PuffButton, PuffLogo } from '@/components/puff';
import { PUF } from '@/constants/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    headline: 'Plan Smart,',
    accent: 'Get In.',
    body: 'From freshman GPA to senior essays, PUFF turns your four years into one clear path to your dream school.',
  },
  {
    headline: 'Track Every',
    accent: 'Deadline.',
    body: 'Never miss an Early Action cutoff. PUFF tracks all your applications and sends smart reminders.',
  },
  {
    headline: 'AI Coach,',
    accent: 'Always On.',
    body: 'Get personalized next-best-action advice powered by AI — so you always know exactly what to do next.',
  },
  {
    headline: 'Your Dream School',
    accent: "is Reachable.",
    body: 'Build the strongest possible application and watch your match scores climb with every improvement.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  function advance() {
    if (isLast) {
      router.replace('/(tabs)');
    } else {
      setIndex(i => i + 1);
    }
  }

  return (
    <GlowBackground variant="top">
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoRow}>
            <PuffLogo size={28} />
          </View>

          <View style={styles.spacer} />

          {/* Hero text */}
          <View style={styles.heroBlock}>
            <Text style={styles.headline}>
              {slide.headline}{'\n'}
              <Text style={styles.accent}>{slide.accent}</Text>
            </Text>
            <Text style={styles.body}>{slide.body}</Text>

            {/* Dot indicators */}
            <View style={styles.dots}>
              {SLIDES.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === index ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Actions */}
          <PuffButton onPress={advance}>
            {isLast ? 'Get Started' : 'Next'}
          </PuffButton>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.skipLabel}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 36,
  },
  logoRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  spacer: { flex: 1 },
  heroBlock: {
    marginBottom: 28,
  },
  headline: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '700',
    color: PUF.text,
    letterSpacing: -1.2,
    marginBottom: 14,
  },
  accent: {
    color: PUF.accentLight,
    fontStyle: 'italic',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: PUF.textDim,
    maxWidth: width - 56,
  },
  dots: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 22,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    width: 22,
    backgroundColor: PUF.accentBright,
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  skipBtn: {
    marginTop: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLabel: {
    color: PUF.textDim,
    fontSize: 16,
    fontWeight: '500',
  },
});
