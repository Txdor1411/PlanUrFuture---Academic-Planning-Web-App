import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlassCard, GlowBackground } from '@/components/puff';
import { PUF } from '@/constants/theme';

const COLLEGES = [
  { name: 'Hartwell University', loc: 'New Haven, CT', score: 72, tier: 'Reach', selectivity: 'Very Selective', cost: '$58k' },
  { name: 'Lakeside College', loc: 'Madison, WI', score: 84, tier: 'Match', selectivity: 'Selective', cost: '$42k' },
  { name: 'Northbrook Tech', loc: 'Pasadena, CA', score: 61, tier: 'Reach', selectivity: 'Most Selective', cost: '$61k' },
  { name: 'Cedar State', loc: 'Eugene, OR', score: 91, tier: 'Safety', selectivity: 'Selective', cost: '$28k' },
  { name: 'Millbrook University', loc: 'Cambridge, MA', score: 58, tier: 'Reach', selectivity: 'Most Selective', cost: '$67k' },
  { name: 'Pineview College', loc: 'Portland, OR', score: 88, tier: 'Match', selectivity: 'Selective', cost: '$36k' },
];

const FILTERS = ['All 12', 'Reach 4', 'Match 5', 'Safety 3'];

function tierColor(tier: string) {
  if (tier === 'Safety') return PUF.tierSafety;
  if (tier === 'Match') return PUF.tierMatch;
  return PUF.tierReach;
}

function CollegeCard({ c }: { c: typeof COLLEGES[0] }) {
  const tc = tierColor(c.tier);
  return (
    <GlassCard radius={20} padding={16} style={styles.collegeCard}>
      <View style={styles.cardRow}>
        <View style={styles.crest}>
          <Text style={styles.crestLetter}>{c.name[0]}</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.collegeName} numberOfLines={1}>{c.name}</Text>
            <Text style={[styles.tierChip, { color: tc }]}>{c.tier.toUpperCase()}</Text>
          </View>
          <Text style={styles.collegeMeta}>{c.loc} · {c.selectivity} · {c.cost}/yr</Text>
          <View style={styles.scoreBarRow}>
            <View style={styles.scoreTrack}>
              <View style={[styles.scoreFill, { width: `${c.score}%` as any }]} />
            </View>
            <Text style={styles.scoreNum}>{c.score}</Text>
          </View>
        </View>
      </View>
    </GlassCard>
  );
}

export default function CollegesScreen() {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <GlowBackground variant="low">
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>Your list · 12 schools</Text>
          <Text style={styles.title}>Colleges</Text>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <GlassCard radius={14} padding={0} style={styles.searchBox}>
            <Ionicons name="search-outline" size={16} color={PUF.textDim} />
            <Text style={styles.searchPlaceholder}>Search schools, majors…</Text>
          </GlassCard>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((f, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setActiveFilter(i)}
              style={[styles.chip, i === activeFilter && styles.chipActive]}
            >
              <Text style={[styles.chipLabel, i === activeFilter && styles.chipLabelActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {COLLEGES.map((c, i) => <CollegeCard key={i} c={c} />)}
          <View style={{ height: 90 }} />
        </ScrollView>
      </SafeAreaView>
    </GlowBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 12, marginBottom: 14 },
  subtitle: { fontSize: 13, color: PUF.textDim },
  title: { fontSize: 36, fontWeight: '700', color: PUF.text, marginTop: 4, letterSpacing: -0.6 },

  searchRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 14 },
  searchBox: { flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12 },
  searchPlaceholder: { fontSize: 14, color: PUF.textDim },
  filterBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center' },

  chips: { paddingHorizontal: 24, gap: 6, marginBottom: 14 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, backgroundColor: PUF.glass, borderWidth: 0.5, borderColor: PUF.glassBorder },
  chipActive: { backgroundColor: '#fff', borderColor: 'transparent' },
  chipLabel: { fontSize: 12, fontWeight: '500', color: '#fff' },
  chipLabelActive: { color: '#1a0b2e' },

  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, gap: 10 },

  collegeCard: { marginBottom: 0 },
  cardRow: { flexDirection: 'row', gap: 12 },
  crest: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(47,29,112,0.5)', borderWidth: 0.5, borderColor: PUF.glassBorder, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  crestLetter: { fontSize: 22, color: '#fff', fontWeight: '600' },
  cardInfo: { flex: 1, minWidth: 0 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 2 },
  collegeName: { fontSize: 15, fontWeight: '600', color: PUF.text, flex: 1 },
  tierChip: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3, textTransform: 'uppercase', flexShrink: 0 },
  collegeMeta: { fontSize: 12, color: PUF.textDim },
  scoreBarRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  scoreTrack: { flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
  scoreFill: { height: '100%', backgroundColor: PUF.accentBright, borderRadius: 3 },
  scoreNum: { fontSize: 12, fontWeight: '600', color: PUF.text, minWidth: 24, textAlign: 'right' },
});
