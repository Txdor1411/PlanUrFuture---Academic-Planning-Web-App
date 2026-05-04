import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PUF } from '@/constants/theme';

type Variant = 'top' | 'side' | 'center' | 'low';

export function GlowBackground({
  variant: _variant = 'top',
  children,
}: {
  variant?: Variant;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PUF.bg,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});
