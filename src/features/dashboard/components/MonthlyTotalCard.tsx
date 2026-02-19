import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';

interface MonthlyTotalCardProps {
  amount: string;
  activeCount: number;
}

export function MonthlyTotalCard({ amount, activeCount }: MonthlyTotalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Monthly Total</Text>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.activeText}>{activeCount} active</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#4DB8A8',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: SPACING.xs,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: SPACING.xs,
  },
  activeText: {
    fontSize: FONT_SIZES.sm,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});
