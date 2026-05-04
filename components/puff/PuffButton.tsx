import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { PUF } from '@/constants/theme';

interface PuffButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
  full?: boolean;
}

export function PuffButton({
  children,
  onPress,
  variant = 'primary',
  style,
  full = true,
}: PuffButtonProps) {
  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[styles.pill, full && styles.full, style]}
      >
        <LinearGradient
          colors={[PUF.btnTop, PUF.btnMid, PUF.btnBot]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.gradient, full && styles.full]}
        >
          <Text style={styles.primaryLabel}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.pill, styles.outline, full && styles.full, style]}
      >
        <Text style={styles.outlineLabel}>{children}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[style]}>
      <Text style={styles.ghostLabel}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  full: {
    width: '100%',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  outline: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineLabel: {
    color: PUF.text,
    fontSize: 17,
    fontWeight: '600',
  },
  ghostLabel: {
    color: PUF.textDim,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
