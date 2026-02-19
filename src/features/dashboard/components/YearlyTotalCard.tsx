import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';

interface YearlyTotalCardProps {
  amount: string;
}

export function YearlyTotalCard({ amount }: YearlyTotalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Yearly Total</Text>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.projectedText}>Projected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  projectedText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
