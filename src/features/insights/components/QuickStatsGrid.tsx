import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface QuickStatsGridProps {
  activeCount: number;
  trialsCount: number;
  cancelledCount: number;
  totalCount: number;
}

export function QuickStatsGrid({ 
  activeCount, 
  trialsCount, 
  cancelledCount, 
  totalCount 
}: QuickStatsGridProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statCardLabel}>Active</Text>
          <Text style={styles.statCardValue}>{activeCount}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statCardLabel}>Trials</Text>
          <Text style={styles.statCardValue}>{trialsCount}</Text>
        </Card>
      </View>
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statCardLabel}>Cancelled</Text>
          <Text style={styles.statCardValue}>{cancelledCount}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statCardLabel}>Total</Text>
          <Text style={styles.statCardValue}>{totalCount}</Text>
        </Card>
      </View>
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
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statCardLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  statCardValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
