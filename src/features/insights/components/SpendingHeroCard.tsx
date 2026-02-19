import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { formatCurrency } from '../../../core/utils/subscriptionUtils';

interface SpendingHeroCardProps {
  monthlyTotal: number;
  yearlyProjection: number;
  currency: string;
}

export function SpendingHeroCard({ monthlyTotal, yearlyProjection, currency }: SpendingHeroCardProps) {
  return (
    <Card style={styles.heroCard}>
      <Text style={styles.heroLabel}>Estimated Monthly Spending</Text>
      <Text style={styles.heroValue}>
        {formatCurrency(monthlyTotal, currency)}
      </Text>
      <View style={styles.divider} />
      <Text style={styles.projectionLabel}>Yearly Projection</Text>
      <Text style={styles.projectionValue}>
        {formatCurrency(yearlyProjection, currency)}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.md,
  },
  heroLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  heroValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.md,
    width: '100%',
  },
  projectionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  projectionValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
  },
});
