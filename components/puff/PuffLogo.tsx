import React from 'react';
import { Image, StyleSheet } from 'react-native';

const LOGO = require('@/assets/images/puff-logo.png');

interface PuffLogoProps {
  size?: number;
}

export function PuffLogo({ size = 22 }: PuffLogoProps) {
  return (
    <Image
      source={LOGO}
      style={[styles.logo, { height: size * 2.6, width: size * 2.6 * 1.2 }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    opacity: 1,
  },
});
