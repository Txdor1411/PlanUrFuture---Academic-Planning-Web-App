import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlowBackground } from '@/components/puff';
import { PUF } from '@/constants/theme';

const STATS = [
  { label: 'GPA', value: '3.86', sub: 'Weighted 4.42' },
  { label: 'SAT', value: '1480', sub: '730 RW · 750 M' },
  { label: 'AP', value: '6', sub: '4 with 5s' },
];

const STRENGTHS = [
  { label: 'Academics', val: 88 },
  { label: 'Activities', val: 76 },
  { label: 'Leadership', val: 82 },
  { label: 'Essays', val: 41 },
  { label: 'Recs', val: 30 },
];

const SETTINGS = ['Edit profile', 'Linked accounts', 'Notifications', 'Privacy', 'Sign out'];

function StrengthBar({ label, val }: { label: string; val: number }) {
  const isWeak = val < 50;
  return (
    <View style={styles.strengthItem}>
      <View style={styles.strengthLabelRow}>
        <Text style={styles.strengthLabel}>{label}</Text>
        <Text style={styles.strengthVal}>{val}</Text>
      </View>
      <View style={styles.strengthTrack}>
        <View
          style={[
            styles.strengthFill,
            { width: `${val}%` as any },
            isWeak && { backgroundColor: PUF.tierReach },
          ]}
        />
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <GlowBackground variant="top">
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>You</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Identity card */}
          <GlassCard radius={24} padding={20} style={styles.card}>
            <View style={styles.identityRow}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarLabel}>MA</Text>
              </View>
              <View style={styles.identityInfo}>
                <Text style={styles.profileName}>Maya Adeyemi</Text>
                <Text style={styles.profileSub}>Junior · Westlake HS · Class of '27</Text>
                <View style={styles.profileTags}>
                  <View style={styles.tagAccent}>
                    <Text style={styles.tagAccentLabel}>Pre-med track</Text>
                  </View>
                  <View style={styles.tagDefault}>
                    <Text style={styles.tagDefaultLabel}>STEM</Text>
                  </View>
                </View>
              </View>
            </View>
          </GlassCard>

          {/* Stats */}
          <View style={styles.statsRow}>
            {STATS.map((s, i) => (
              <GlassCard key={i} radius={16} padding={14} style={styles.statCard}>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statSub}>{s.sub}</Text>
              </GlassCard>
            ))}
          </View>

          {/* Strengths */}
          <GlassCard radius={20} padding={18} style={styles.card}>
            <View style={styles.strengthsHeader}>
              <Text style={styles.sectionTitle}>Profile strength</Text>
              <Text style={styles.sectionSub}>vs. admitted students</Text>
            </View>
            {STRENGTHS.map((s, i) => <StrengthBar key={i} label={s.label} val={s.val} />)}
            <View style={styles.aiTip}>
              <Ionicons name="sparkles" size={16} color={PUF.accentLight} />
              <Text style={styles.aiTipText}>
                Essays + Recs are your biggest gaps. Tackling both adds{' '}
                <Text style={{ color: '#fff', fontWeight: '600' }}>~15 match pts</Text>.
              </Text>
            </View>
          </GlassCard>

          {/* Settings list */}
          <GlassCard radius={18} padding={0} style={styles.settingsList}>
            {SETTINGS.map((label, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.settingsRow, i < SETTINGS.length - 1 && styles.settingsBorder]}
                activeOpacity={0.7}
              >
                <Text style={styles.settingsLabel}>{label}</Text>
                <Ionicons name="chevron-forward" size={14} color={PUF.textFaint} />
              </TouchableOpacity>
            ))}
          </GlassCard>

          <View style={{ height: 90 }} />
        </ScrollView>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 14 },
  title: { fontSize: 36, fontWeight: '700', color: PUF.text, letterSpacing: -0.6 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16 },
  card: { marginBottom: 12 },

  identityRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: PUF.accent, alignItems: 'center', justifyContent: 'center' },
  profileAvatarLabel: { fontSize: 24, fontWeight: '600', color: '#fff' },
  identityInfo: { flex: 1 },
  profileName: { fontSize: 22, fontWeight: '600', color: PUF.text, letterSpacing: -0.3 },
  profileSub: { fontSize: 12, color: PUF.textDim, marginTop: 2 },
  profileTags: { flexDirection: 'row', gap: 6, marginTop: 8 },
  tagAccent: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: 'rgba(47,29,112,0.5)' },
  tagAccentLabel: { fontSize: 11, color: PUF.accentLight, fontWeight: '600' },
  tagDefault: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: PUF.glass },
  tagDefaultLabel: { fontSize: 11, color: PUF.textDim },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCard: { flex: 1 },
  statLabel: { fontSize: 11, color: PUF.textDim, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '600' },
  statValue: { fontSize: 26, fontWeight: '700', color: PUF.text, marginTop: 4, letterSpacing: -0.5 },
  statSub: { fontSize: 11, color: PUF.textDim, marginTop: 2 },

  strengthsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: PUF.text },
  sectionSub: { fontSize: 12, color: PUF.textDim },
  strengthItem: { marginBottom: 10 },
  strengthLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  strengthLabel: { fontSize: 12, color: PUF.text },
  strengthVal: { fontSize: 12, color: PUF.textDim },
  strengthTrack: { height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  strengthFill: { height: '100%', backgroundColor: PUF.accentBright, borderRadius: 2 },
  aiTip: { flexDirection: 'row', gap: 8, marginTop: 14, padding: 10, borderRadius: 12, backgroundColor: 'rgba(47,29,112,0.3)', alignItems: 'flex-start' },
  aiTipText: { flex: 1, fontSize: 12, color: PUF.textDim, lineHeight: 18 },

  settingsList: { marginBottom: 12, overflow: 'hidden' as const },
  settingsRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  settingsBorder: { borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  settingsLabel: { flex: 1, fontSize: 14, color: PUF.text },
});
