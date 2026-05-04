import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { PUF } from '@/constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  radius?: number;
  padding?: number;
  tint?: string;
  borderColor?: string;
  intensity?: number;
}

export function GlassCard({
  children,
  style,
  radius = 24,
  padding = 18,
  tint,
  borderColor,
  intensity = 20,
}: GlassCardProps) {
  const bg = tint ?? PUF.glass;
  const border = borderColor ?? PUF.glassBorder;

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[
          styles.base,
          {
            borderRadius: radius,
            padding,
            borderColor: border,
            backgroundColor: bg,
          },
          style,
        ]}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View
      style={[
        styles.base,
        {
          borderRadius: radius,
          padding,
          borderColor: border,
          backgroundColor: bg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
});
