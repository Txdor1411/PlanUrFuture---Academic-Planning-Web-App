import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlowBackground, ProgressRing } from '@/components/puff';
import { PUF } from '@/constants/theme';

function DeadlineRow({
  month,
  day,
  school,
  task,
  daysLeft,
  urgent,
}: {
  month: string;
  day: string;
  school: string;
  task: string;
  daysLeft: number;
  urgent?: boolean;
}) {
  return (
    <View style={styles.deadlineRow}>
      <View
        style={[
          styles.dateBox,
          urgent && { backgroundColor: 'rgba(124,53,201,0.25)', borderColor: PUF.accentBright },
        ]}
      >
        <Text style={styles.dateMonth}>{month}</Text>
        <Text style={styles.dateDay}>{day}</Text>
      </View>
      <View style={styles.deadlineInfo}>
        <Text style={styles.deadlineSchool} numberOfLines={1}>{school}</Text>
        <Text style={styles.deadlineTask} numberOfLines={1}>{task}</Text>
      </View>
      <Text style={[styles.daysLeft, urgent && { color: PUF.accentLight }]}>{daysLeft}d</Text>
    </View>
  );
}

function MiniTile({
  icon,
  label,
  badge,
  badgeAccent,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge: string;
  badgeAccent?: boolean;
}) {
  return (
    <GlassCard style={styles.miniTile} radius={18} padding={14}>
      <View style={styles.miniTileTop}>
        <Ionicons name={icon} size={22} color="#fff" />
        <View style={[styles.badge, badgeAccent && { backgroundColor: PUF.accent }]}>
          <Text style={styles.badgeLabel}>{badge}</Text>
        </View>
      </View>
      <Text style={styles.miniTileLabel}>{label}</Text>
    </GlassCard>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <GlowBackground variant="top">
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Greeting */}
          <View style={styles.greeting}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLabel}>MA</Text>
            </View>
            <View style={styles.greetingText}>
              <Text style={styles.greetingTime}>Good evening</Text>
              <Text style={styles.greetingName}>Maya</Text>
            </View>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* AI Coach card */}
          <GlassCard
            style={styles.coachCard}
            radius={28}
            padding={20}
            tint="rgba(47,29,112,0.45)"
            borderColor="rgba(148,72,218,0.4)"
          >
            <View style={styles.coachHeader}>
              <View style={styles.coachIconWrap}>
                <Ionicons name="sparkles" size={18} color="#fff" />
              </View>
              <Text style={styles.coachTitle}>Next Best Move</Text>
            </View>
            <Text style={styles.coachBody}>
              Draft your{' '}
              <Text style={styles.coachAccent}>"Why Hartwell"</Text>
              {' '}essay this week — it's the single biggest lift to your match score.
            </Text>
            <View style={styles.coachMeta}>
              <Ionicons name="sparkles" size={13} color={PUF.accentLight} />
              <Text style={styles.coachMetaText}>+8 match pts</Text>
              <View style={styles.metaDot} />
              <Text style={styles.coachMetaText}>~45 min</Text>
            </View>
            <TouchableOpacity
              style={styles.coachCta}
              onPress={() => router.push('/tracker')}
              activeOpacity={0.85}
            >
              <Text style={styles.coachCtaLabel}>Start with the AI coach</Text>
              <Ionicons name="arrow-forward" size={16} color="#1a0b2e" />
            </TouchableOpacity>
          </GlassCard>

          {/* Match score */}
          <GlassCard style={styles.matchCard} radius={20} padding={16}>
            <View style={styles.matchRow}>
              <ProgressRing value={72} size={64} color={PUF.accentBright} />
              <View style={styles.matchInfo}>
                <Text style={styles.matchLabel}>Match score · Hartwell U.</Text>
                <Text style={styles.matchScore}>
                  Reach <Text style={{ color: PUF.accentLight }}>72</Text>
                </Text>
                <Text style={styles.matchSub}>+4 this week from new SAT score</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={PUF.textFaint} />
            </View>
          </GlassCard>

          {/* Mini tiles */}
          <View style={styles.tiles}>
            <MiniTile icon="school-outline" label="Colleges" badge="12" />
            <MiniTile icon="list-outline" label="Tasks" badge="3 due" badgeAccent />
            <MiniTile icon="book-outline" label="Essays" badge="2" />
          </View>

          {/* Coming up */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Coming up</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <GlassCard radius={20} padding={0} style={styles.deadlines}>
            <View style={styles.deadlineList}>
              <DeadlineRow month="OCT" day="14" school="Hartwell University" task="Early Action — Common App" daysLeft={9} urgent />
              <DeadlineRow month="OCT" day="22" school="Northbrook Tech" task="Supplemental essay — 250 wd" daysLeft={17} />
              <DeadlineRow month="NOV" day="01" school="Lakeside College" task="Recommendation request" daysLeft={27} />
            </View>
          </GlassCard>

          <View style={{ height: 90 }} />
        </ScrollView>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 12 },

  greeting: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: PUF.accent, alignItems: 'center', justifyContent: 'center' },
  avatarLabel: { color: '#fff', fontSize: 14, fontWeight: '600' },
  greetingText: { flex: 1 },
  greetingTime: { fontSize: 12, color: PUF.textDim },
  greetingName: { fontSize: 17, fontWeight: '600', color: PUF.text, marginTop: 1 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center' },

  coachCard: { marginBottom: 12 },
  coachHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  coachIconWrap: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(196,173,250,0.2)', alignItems: 'center', justifyContent: 'center' },
  coachTitle: { fontSize: 12, fontWeight: '600', letterSpacing: 1, color: PUF.accentLight, textTransform: 'uppercase' },
  coachBody: { fontSize: 20, lineHeight: 26, color: PUF.text, fontWeight: '400', letterSpacing: -0.3 },
  coachAccent: { color: PUF.accentLight, fontStyle: 'italic' },
  coachMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  coachMetaText: { fontSize: 12, color: PUF.textDim },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: 'rgba(255,255,255,0.3)' },
  coachCta: { marginTop: 14, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.95)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  coachCtaLabel: { fontSize: 15, fontWeight: '600', color: '#1a0b2e' },

  matchCard: { marginBottom: 12 },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  matchInfo: { flex: 1 },
  matchLabel: { fontSize: 13, color: PUF.textDim },
  matchScore: { fontSize: 22, fontWeight: '600', color: PUF.text, marginTop: 2, letterSpacing: -0.4 },
  matchSub: { fontSize: 12, color: PUF.textDim, marginTop: 2 },

  tiles: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  miniTile: { flex: 1 },
  miniTileTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  miniTileLabel: { fontSize: 13, fontWeight: '500', color: PUF.text },
  badge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 9, backgroundColor: PUF.glass },
  badgeLabel: { fontSize: 10, fontWeight: '600', color: '#fff', letterSpacing: 0.2 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: PUF.text },
  seeAll: { fontSize: 13, color: PUF.accentLight },

  deadlines: { overflow: 'hidden' },
  deadlineList: { paddingHorizontal: 16 },
  deadlineRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.08)' },
  dateBox: { width: 44, paddingVertical: 6, borderRadius: 10, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center' },
  dateMonth: { fontSize: 9, fontWeight: '600', color: PUF.textDim, letterSpacing: 0.5 },
  dateDay: { fontSize: 16, fontWeight: '600', color: PUF.text, lineHeight: 20 },
  deadlineInfo: { flex: 1, minWidth: 0 },
  deadlineSchool: { fontSize: 14, fontWeight: '500', color: PUF.text },
  deadlineTask: { fontSize: 12, color: PUF.textDim, marginTop: 2 },
  daysLeft: { fontSize: 11, fontWeight: '600', color: PUF.textDim, letterSpacing: 0.2 },
});
