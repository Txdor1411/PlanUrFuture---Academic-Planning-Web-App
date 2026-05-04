import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlassCard, GlowBackground, ProgressRing, PuffButton } from '@/components/puff';
import { PUF } from '@/constants/theme';

const STAGES = [
  { name: 'Profile saved', done: true },
  { name: 'Common App started', done: true },
  { name: 'Essay drafted', done: true },
  { name: 'Recs requested', done: false, current: true, sub: '2 teachers + 1 counselor needed' },
  { name: 'Submitted', done: false },
];

export default function TrackerScreen() {
  const router = useRouter();

  return (
    <GlowBackground variant="top">
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View style={styles.heroRow}>
            <View style={styles.heroCrest}>
              <Text style={styles.heroCrestLetter}>H</Text>
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.heroTag}>Reach · 72 match</Text>
              <Text style={styles.heroName}>Hartwell{'\n'}University</Text>
            </View>
          </View>

          {/* Countdown */}
          <GlassCard
            style={styles.countdownCard}
            radius={20}
            padding={16}
            tint="rgba(47,29,112,0.4)"
            borderColor="rgba(148,72,218,0.4)"
          >
            <View style={styles.countdownRow}>
              <View>
                <Text style={styles.countdownTag}>Early Action</Text>
                <Text style={styles.countdownDays}>9 days</Text>
                <Text style={styles.countdownSub}>Due Oct 14 · 11:59 PM</Text>
              </View>
              <View style={{ flex: 1 }} />
              <ProgressRing value={80} size={64} color={PUF.accentBright} label="9" />
            </View>
          </GlassCard>

          {/* Stage tracker */}
          <Text style={styles.stagesTitle}>Where you are</Text>
          <View style={styles.stages}>
            {STAGES.map((s, i) => (
              <View key={i} style={styles.stageItem}>
                <View style={styles.stageLeft}>
                  <View style={[
                    styles.stageNode,
                    s.done && { backgroundColor: PUF.accent, borderWidth: 0 },
                    s.current && { backgroundColor: 'transparent', borderWidth: 2, borderColor: PUF.accentBright },
                  ]}>
                    {s.done && <Ionicons name="checkmark" size={12} color="#fff" />}
                    {s.current && <View style={styles.stageDot} />}
                  </View>
                  {i < STAGES.length - 1 && (
                    <View style={[styles.stageLine, s.done && { backgroundColor: PUF.accent }]} />
                  )}
                </View>
                <View style={styles.stageBody}>
                  <Text style={[
                    styles.stageName,
                    (s.done || s.current) && { color: '#fff' },
                    s.current && { fontWeight: '600' },
                  ]}>
                    {s.name}
                  </Text>
                  {s.current && s.sub && (
                    <Text style={styles.stageSub}>{s.sub}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          <PuffButton onPress={() => {}}>Continue applying</PuffButton>
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 8 },

  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 22 },
  heroCrest: { width: 62, height: 62, borderRadius: 18, backgroundColor: 'rgba(47,29,112,0.5)', borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center' },
  heroCrestLetter: { fontSize: 30, color: '#fff', fontWeight: '600' },
  heroInfo: { flex: 1 },
  heroTag: { fontSize: 12, color: PUF.accentLight, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  heroName: { fontSize: 26, fontWeight: '700', color: PUF.text, lineHeight: 30, marginTop: 4, letterSpacing: -0.4 },

  countdownCard: { marginBottom: 22 },
  countdownRow: { flexDirection: 'row', alignItems: 'center' },
  countdownTag: { fontSize: 11, color: PUF.textDim, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  countdownDays: { fontSize: 32, fontWeight: '700', color: PUF.text, lineHeight: 40, marginTop: 4 },
  countdownSub: { fontSize: 12, color: PUF.textDim, marginTop: 4 },

  stagesTitle: { fontSize: 14, fontWeight: '600', color: PUF.text, marginBottom: 14 },
  stages: { marginBottom: 24 },
  stageItem: { flexDirection: 'row', gap: 14 },
  stageLeft: { alignItems: 'center' },
  stageNode: { width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  stageDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: PUF.accentBright },
  stageLine: { width: 1.5, flex: 1, marginTop: 2, backgroundColor: 'rgba(255,255,255,0.10)', minHeight: 28 },
  stageBody: { flex: 1, paddingBottom: 14, paddingTop: 1 },
  stageName: { fontSize: 14, fontWeight: '500', color: PUF.textDim },
  stageSub: { fontSize: 12, color: PUF.textDim, marginTop: 3 },
});
