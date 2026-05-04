import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { PUF } from '@/constants/theme';

type Variant = 'top' | 'side' | 'center' | 'low';

interface BlobConfig {
  top: string;
  left: string;
  size: number;
  color: string;
  animDuration: number;
  toX: number;
  toY: number;
}

const BLOB_CONFIGS: Record<Variant, BlobConfig[]> = {
  top: [
    { top: '10%', left: '30%', size: 320, color: PUF.blobBright, animDuration: 18000, toX: 40, toY: -20 },
    { top: '55%', left: '55%', size: 240, color: PUF.brand, animDuration: 24000, toX: -35, toY: 25 },
    { top: '40%', left: '-5%', size: 220, color: PUF.blobDeep, animDuration: 30000, toX: 20, toY: -30 },
  ],
  side: [
    { top: '15%', left: '50%', size: 300, color: PUF.blobBright, animDuration: 20000, toX: -30, toY: 20 },
    { top: '60%', left: '-10%', size: 240, color: PUF.brand, animDuration: 26000, toX: 40, toY: -15 },
    { top: '-5%', left: '25%', size: 200, color: PUF.blobDeep, animDuration: 32000, toX: -20, toY: 35 },
  ],
  center: [
    { top: '30%', left: '25%', size: 350, color: PUF.blobBright, animDuration: 22000, toX: 30, toY: -30 },
    { top: '10%', left: '-10%', size: 220, color: PUF.brand, animDuration: 28000, toX: -20, toY: 40 },
    { top: '65%', left: '55%', size: 220, color: PUF.blobDeep, animDuration: 34000, toX: 25, toY: -20 },
  ],
  low: [
    { top: '55%', left: '10%', size: 320, color: PUF.blobBright, animDuration: 19000, toX: 35, toY: -25 },
    { top: '15%', left: '50%', size: 240, color: PUF.brand, animDuration: 25000, toX: -30, toY: 30 },
    { top: '75%', left: '30%', size: 220, color: PUF.blobDeep, animDuration: 31000, toX: -25, toY: -35 },
  ],
};

function AnimatedBlob({ config }: { config: BlobConfig }) {
  const anim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: { x: config.toX, y: config.toY },
          duration: config.animDuration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: { x: 0, y: 0 },
          duration: config.animDuration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Separate the percentage-based position (View) from the animated transform (Animated.View)
  // because Animated.View's style type rejects bare percentage strings for top/left.
  return (
    <View
      style={{
        position: 'absolute',
        top: config.top as any,
        left: config.left as any,
      }}
    >
      <Animated.View
        style={{
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          backgroundColor: config.color,
          opacity: 0.55,
          transform: anim.getTranslateTransform(),
        }}
      />
    </View>
  );
}

export function GlowBackground({
  variant = 'top',
  children,
}: {
  variant?: Variant;
  children?: React.ReactNode;
}) {
  const blobs = BLOB_CONFIGS[variant];

  return (
    <View style={styles.container}>
      {blobs.map((b, i) => (
        <AnimatedBlob key={i} config={b} />
      ))}
      {/* vignette overlay */}
      <View style={styles.vignette} pointerEvents="none" />
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
  vignette: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
  },
});
