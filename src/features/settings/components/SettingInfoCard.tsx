import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface SettingInfoCardProps {
  icon?: string;
  title: string;
  message: string;
  backgroundColor?: string;
  borderColor?: string;
}

export function SettingInfoCard({ 
  icon = '💡', 
  title, 
  message,
  backgroundColor = '#E3F2FD',
  borderColor = COLORS.primary,
}: SettingInfoCardProps) {
  return (
    <Card style={[styles.infoCard, { backgroundColor, borderColor, borderWidth: 1 }]}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoText}>{message}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    marginBottom: SPACING.lg,
  },
  infoIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  infoTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
