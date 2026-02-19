import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface QuickStatsProps {
  totalSubscriptions: number;
  activeTrials: number;
  cancelledCount: number;
}

export function QuickStatsCard({ 
  totalSubscriptions, 
  activeTrials, 
  cancelledCount 
}: QuickStatsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Stats</Text>
      <Card>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatLabel}>Total Subscriptions</Text>
          <Text style={styles.quickStatValue}>{totalSubscriptions}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.quickStat}>
          <Text style={styles.quickStatLabel}>Active Trials</Text>
          <Text style={styles.quickStatValue}>{activeTrials}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.quickStat}>
          <Text style={styles.quickStatLabel}>Cancelled</Text>
          <Text style={styles.quickStatValue}>{cancelledCount}</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  quickStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  quickStatLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  quickStatValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
});
