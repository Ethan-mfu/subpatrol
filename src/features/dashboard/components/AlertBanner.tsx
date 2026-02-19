import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';

interface AlertBannerProps {
  title: string;
  message: string;
}

export function AlertBanner({ title, message }: AlertBannerProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚠️</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF5E6',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#FFB800',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    marginRight: SPACING.sm,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 2,
  },
  message: {
    fontSize: FONT_SIZES.sm,
    color: '#A0522D',
  },
});
