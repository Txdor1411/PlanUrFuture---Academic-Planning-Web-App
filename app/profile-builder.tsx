import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlowBackground, PuffButton } from '@/components/puff';
import { PUF } from '@/constants/theme';

const ACTIVITIES = [
  { name: 'Varsity Debate', tag: 'Captain' },
  { name: 'Robotics Club', tag: 'Lead engineer' },
  { name: 'Hospital volunteer', tag: '120 hrs' },
  { name: 'Cello — chamber orch.', tag: '4 yrs' },
  { name: 'Math Olympiad', tag: 'State qualifier' },
];

const STEPS = 7;
const CURRENT_STEP = 4;

export default function ProfileBuilderScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(new Set([0, 1, 2]));

  function toggle(i: number) {
    setSelected(s => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  }

  return (
    <GlowBackground variant="side">
      <SafeAreaView style={styles.safe}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          {/* Step indicator */}
          <View style={styles.stepBar}>
            {Array.from({ length: STEPS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.stepSegment,
                  i < CURRENT_STEP - 1 && { backgroundColor: PUF.accentBright },
                  i === CURRENT_STEP - 1 && { backgroundColor: PUF.accentBright, opacity: 0.5 },
                  i >= CURRENT_STEP && { backgroundColor: 'rgba(255,255,255,0.15)' },
                ]}
              />
            ))}
          </View>
          <Text style={styles.stepCount}>{CURRENT_STEP} / {STEPS}</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.stepLabel}>Step {CURRENT_STEP} — Activities</Text>
          <Text style={styles.heading}>What have you been up to outside class?</Text>
          <Text style={styles.body}>Pick up to 8. We'll figure out leadership, depth, and impact from here.</Text>

          <View style={styles.list}>
            {ACTIVITIES.map((a, i) => {
              const sel = selected.has(i);
              return (
                <TouchableOpacity key={i} onPress={() => toggle(i)} activeOpacity={0.8}>
                  <GlassCard
                    radius={16}
                    padding={14}
                    tint={sel ? 'rgba(124,53,201,0.18)' : PUF.glass}
                    borderColor={sel ? PUF.accentBright : 'rgba(255,255,255,0.10)'}
                    style={styles.activityCard}
                  >
                    <View style={[styles.checkBox, sel && { backgroundColor: PUF.accent, borderWidth: 0 }]}>
                      {sel && <Ionicons name="checkmark" size={13} color="#fff" />}
                    </View>
                    <View style={styles.activityText}>
                      <Text style={styles.activityName}>{a.name}</Text>
                      <Text style={styles.activityTag}>{a.tag}</Text>
                    </View>
                  </GlassCard>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity style={styles.addBtn}>
              <Ionicons name="add" size={16} color={PUF.textDim} />
              <Text style={styles.addBtnLabel}>Add another activity</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PuffButton onPress={() => router.replace('/(tabs)')}>Continue</PuffButton>
        </View>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepBar: { flex: 1, flexDirection: 'row', gap: 4 },
  stepSegment: { flex: 1, height: 3, borderRadius: 2 },
  stepCount: { fontSize: 13, color: PUF.textDim, flexShrink: 0 },

  scroll: { flex: 1 },
  content: { paddingHorizontal: 28, paddingTop: 4 },
  stepLabel: { fontSize: 13, color: PUF.accentLight, letterSpacing: 1, fontWeight: '600', textTransform: 'uppercase', marginBottom: 8 },
  heading: { fontSize: 32, fontWeight: '700', color: PUF.text, lineHeight: 36, letterSpacing: -0.6, marginBottom: 6 },
  body: { fontSize: 14, lineHeight: 20, color: PUF.textDim, marginBottom: 20 },

  list: { gap: 10 },
  activityCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkBox: { width: 24, height: 24, borderRadius: 6, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  activityText: { flex: 1 },
  activityName: { fontSize: 15, fontWeight: '500', color: PUF.text },
  activityTag: { fontSize: 12, color: PUF.textDim, marginTop: 2 },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 16, borderWidth: 0.5, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.22)', marginTop: 4 },
  addBtnLabel: { fontSize: 14, color: PUF.textDim },

  footer: { paddingHorizontal: 28, paddingBottom: 36, paddingTop: 16 },
});
