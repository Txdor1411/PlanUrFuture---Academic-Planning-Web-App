import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PUF } from '@/constants/theme';

const TAB_ITEMS = [
  { name: 'index', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { name: 'colleges', label: 'Colleges', icon: 'school', iconOutline: 'school-outline' },
  { name: 'tasks', label: 'Tasks', icon: 'list', iconOutline: 'list-outline' },
  { name: 'profile', label: 'You', icon: 'person', iconOutline: 'person-outline' },
] as const;

function PuffTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.pill}>
        {TAB_ITEMS.map((item, i) => {
          const focused = state.index === i;
          const color = focused ? PUF.accentLight : 'rgba(255,255,255,0.55)';
          const iconName = focused ? item.icon : item.iconOutline;

          return (
            <TouchableOpacity
              key={item.name}
              style={styles.tabItem}
              onPress={() => navigation.navigate(item.name)}
              activeOpacity={0.7}
            >
              <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={22} color={color} />
              <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <PuffTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="colleges" options={{ title: 'Colleges' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
      <Tabs.Screen name="profile" options={{ title: 'You' }} />
      {/* Hide the old explore tab */}
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 14,
    right: 14,
  },
  pill: {
    height: 60,
    borderRadius: 30,
    backgroundColor: PUF.navBg,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});
