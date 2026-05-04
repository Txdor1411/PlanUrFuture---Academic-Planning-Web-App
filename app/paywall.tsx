import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard, GlowBackground, PuffButton, PuffLogo } from '@/components/puff';
import { PUF } from '@/constants/theme';

const FEATURES = [
  { name: 'AI Essay Coach', desc: 'Live feedback on every draft, line by line.', locked: true },
  { name: 'Unlimited Match Insights', desc: 'See exactly what moves your odds at any school.', locked: true },
  { name: 'Track up to 10 schools', desc: 'Your full list with deadlines & progress.', locked: false },
  { name: 'Weekly AI plans', desc: 'A personalized 7-day roadmap, every Sunday.', locked: false },
];

export default function PaywallScreen() {
  const router = useRouter();
  const [annual, setAnnual] = useState(true);

  return (
    <GlowBackground variant="top">
      <SafeAreaView style={styles.safe}>
        {/* Top */}
        <View style={styles.topBar}>
          <View style={{ flex: 1 }} />
          <PuffLogo size={22} />
          <View style={styles.closeWrap}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroHeadline}>
              More{' '}
              <Text style={styles.heroAccent}>Reach.</Text>
            </Text>
            <Text style={styles.heroBody}>
              Unlock the AI coach and turn long shots into real shots.
            </Text>
          </View>

          {/* Billing toggle */}
          <View style={styles.segmentWrap}>
            <View style={styles.segment}>
              <TouchableOpacity
                style={[styles.segmentBtn, annual && styles.segmentBtnActive]}
                onPress={() => setAnnual(true)}
              >
                {annual ? (
                  <LinearGradient colors={[PUF.btnTop, PUF.btnMid]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.segmentGradient}>
                    <Text style={styles.segmentLabelActive}>Annual · save 40%</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.segmentLabel}>Annual · save 40%</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, !annual && styles.segmentBtnActive]}
                onPress={() => setAnnual(false)}
              >
                {!annual ? (
                  <LinearGradient colors={[PUF.btnTop, PUF.btnMid]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.segmentGradient}>
                    <Text style={styles.segmentLabelActive}>Monthly</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.segmentLabel}>Monthly</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Feature list */}
          <GlassCard radius={28} padding={6} tint="rgba(255,255,255,0.04)">
            {FEATURES.map((f, i) => (
              <View
                key={i}
                style={[
                  styles.featureRow,
                  i < FEATURES.length - 1 && styles.featureBorder,
                ]}
              >
                <View style={styles.featureText}>
                  <Text style={styles.featureName}>{f.name}</Text>
                  <Text style={styles.featureDesc}>{f.desc}</Text>
                </View>
                {f.locked
                  ? <Ionicons name="lock-closed-outline" size={18} color={PUF.textDim} />
                  : <Ionicons name="checkmark-circle" size={18} color={PUF.accentBright} />
                }
              </View>
            ))}
          </GlassCard>

          <Text style={styles.andMore}>and more!</Text>

          {/* CTA */}
          <PuffButton onPress={() => router.back()}>
            {annual ? 'Continue — 12 mo for $89' : 'Continue — $12/month'}
          </PuffButton>
          <Text style={styles.legal}>
            Recurring billing. Cancel anytime. By tapping Continue you agree to our{' '}
            <Text style={styles.legalLink}>Terms of Service</Text>.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 8, marginBottom: 18 },
  closeWrap: { flex: 1, alignItems: 'flex-end' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.10)', borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center' },

  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 36 },

  hero: { alignItems: 'center', paddingHorizontal: 32, marginBottom: 22 },
  heroHeadline: { fontSize: 40, fontWeight: '700', color: PUF.text, lineHeight: 44, textAlign: 'center', letterSpacing: -0.8 },
  heroAccent: { color: PUF.accentLight, fontStyle: 'italic' },
  heroBody: { marginTop: 8, fontSize: 14, color: PUF.textDim, lineHeight: 20, textAlign: 'center' },

  segmentWrap: { paddingHorizontal: 44, marginBottom: 16 },
  segment: { height: 44, borderRadius: 22, padding: 4, flexDirection: 'row', backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: PUF.glassBorder },
  segmentBtn: { flex: 1, borderRadius: 18, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  segmentBtnActive: {},
  segmentGradient: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  segmentLabel: { fontSize: 14, fontWeight: '500', color: PUF.textDim },
  segmentLabelActive: { fontSize: 14, fontWeight: '600', color: '#fff' },

  featureRow: { flexDirection: 'row', gap: 14, paddingHorizontal: 14, paddingVertical: 14, alignItems: 'center' },
  featureBorder: { borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.07)' },
  featureText: { flex: 1 },
  featureName: { fontSize: 14, fontWeight: '600', color: PUF.text },
  featureDesc: { fontSize: 12, color: PUF.textDim, marginTop: 3, lineHeight: 17 },

  andMore: { textAlign: 'center', fontSize: 13, color: PUF.textDim, marginVertical: 14 },

  legal: { textAlign: 'center', fontSize: 11, color: PUF.textFaint, marginTop: 12, lineHeight: 16, paddingHorizontal: 8 },
  legalLink: { color: PUF.accentLight, textDecorationLine: 'underline' },
});
