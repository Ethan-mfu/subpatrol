import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface CycleStat {
  cycle: string;
  count: number;
}

interface BillingCycleChartProps {
  cycleStats: CycleStat[];
}

export function BillingCycleChart({ cycleStats }: BillingCycleChartProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Billing Cycle Distribution</Text>
      <Card>
        {cycleStats.length > 0 ? (
          cycleStats.map((stat, index) => (
            <View key={stat.cycle}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>
                  {stat.cycle.charAt(0).toUpperCase() + stat.cycle.slice(1)}
                </Text>
                <View style={styles.statBadge}>
                  <Text style={styles.statBadgeText}>{stat.count}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No active subscriptions</Text>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  statBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  statBadgeText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
});
