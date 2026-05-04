import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlowBackground } from '@/components/puff';
import { PUF } from '@/constants/theme';

interface Task {
  text: string;
  meta: string;
  done: boolean;
  hot?: boolean;
}

interface Group {
  label: string;
  tasks: Task[];
}

const INITIAL_GROUPS: Group[] = [
  {
    label: 'Today',
    tasks: [
      { text: 'Outline "Why Hartwell" essay', meta: 'AI coach · ~45 min', done: false, hot: true },
      { text: 'Email Mr. Ortiz about rec letter', meta: 'Counselor task · 5 min', done: false },
    ],
  },
  {
    label: 'This week',
    tasks: [
      { text: 'Take SAT practice test #4', meta: 'Sat · Khan + PUFF', done: false },
      { text: 'Update activities list (debate award)', meta: 'Profile', done: true },
      { text: 'Brainstorm 3 essay angles', meta: 'AI coach', done: true },
    ],
  },
];

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[
        styles.taskRow,
        task.hot && { backgroundColor: 'rgba(47,29,112,0.35)', borderColor: PUF.accentBright },
      ]}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={[
          styles.checkbox,
          task.done && { backgroundColor: PUF.accent, borderWidth: 0 },
        ]}
      >
        {task.done && <Ionicons name="checkmark" size={12} color="#fff" />}
      </TouchableOpacity>
      <View style={styles.taskContent}>
        <Text style={[styles.taskText, task.done && styles.taskDone]}>{task.text}</Text>
        <View style={styles.taskMetaRow}>
          {task.hot && <Ionicons name="sparkles" size={12} color={PUF.accentLight} />}
          <Text style={styles.taskMeta}>{task.meta}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function TasksScreen() {
  const [groups, setGroups] = useState(INITIAL_GROUPS);

  function toggleTask(gi: number, ti: number) {
    setGroups(gs =>
      gs.map((g, gIdx) =>
        gIdx !== gi
          ? g
          : { ...g, tasks: g.tasks.map((t, tIdx) => tIdx !== ti ? t : { ...t, done: !t.done }) }
      )
    );
  }

  const total = groups.reduce((s, g) => s + g.tasks.length, 0);
  const done = groups.reduce((s, g) => s + g.tasks.filter(t => t.done).length, 0);

  return (
    <GlowBackground variant="side">
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.subtitle}>Week of Oct 5</Text>
            <Text style={styles.title}>Tasks</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={14} color={PUF.accentLight} />
            <Text style={styles.streakLabel}>12-day streak</Text>
          </View>
        </View>

        {/* Progress */}
        <GlassCard style={styles.progressCard} radius={18} padding={14}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Week progress</Text>
            <Text style={styles.progressCount}>{done} / {total} done</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(done / total) * 100}%` as any }]} />
          </View>
        </GlassCard>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {groups.map((g, gi) => (
            <View key={gi} style={styles.group}>
              <Text style={styles.groupLabel}>{g.label}</Text>
              {g.tasks.map((task, ti) => (
                <TaskRow key={ti} task={task} onToggle={() => toggleTask(gi, ti)} />
              ))}
            </View>
          ))}
          <View style={{ height: 90 }} />
        </ScrollView>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 12, marginBottom: 14 },
  subtitle: { fontSize: 13, color: PUF.textDim },
  title: { fontSize: 36, fontWeight: '700', color: PUF.text, marginTop: 2, letterSpacing: -0.6 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, backgroundColor: 'rgba(47,29,112,0.5)', borderWidth: 0.5, borderColor: PUF.accentBright },
  streakLabel: { fontSize: 13, fontWeight: '600', color: PUF.text },

  progressCard: { marginHorizontal: 16, marginBottom: 14 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 },
  progressLabel: { fontSize: 13, color: PUF.textDim },
  progressCount: { fontSize: 13, fontWeight: '600', color: PUF.text },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: PUF.accentBright, borderRadius: 3 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24 },
  group: { marginBottom: 18 },
  groupLabel: { fontSize: 12, color: PUF.textDim, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '600', marginBottom: 8 },

  taskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 12, borderRadius: 16, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 8 },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.30)', alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
  taskContent: { flex: 1 },
  taskText: { fontSize: 14, fontWeight: '500', color: PUF.text },
  taskDone: { textDecorationLine: 'line-through', color: PUF.textDim },
  taskMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  taskMeta: { fontSize: 12, color: PUF.textDim },
});
