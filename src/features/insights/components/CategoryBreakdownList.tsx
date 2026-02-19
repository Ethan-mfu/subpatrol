import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { formatCurrency } from '../../../core/utils/subscriptionUtils';

interface CategoryStat {
  category: string;
  count: number;
  total: number;
  color: string;
}

interface CategoryBreakdownListProps {
  categoryStats: CategoryStat[];
  currency: string;
}

export function CategoryBreakdownList({ categoryStats, currency }: CategoryBreakdownListProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Category Breakdown</Text>
      <Card>
        {categoryStats.length > 0 ? (
          categoryStats.map((stat, index) => (
            <View key={stat.category}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.categoryDot, { backgroundColor: stat.color }]} />
                  <View>
                    <Text style={styles.categoryName}>
                      {stat.category.charAt(0).toUpperCase() + stat.category.slice(1)}
                    </Text>
                    <Text style={styles.categoryCount}>{stat.count} subscriptions</Text>
                  </View>
                </View>
                <Text style={styles.categoryAmount}>
                  {formatCurrency(stat.total, currency)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No active categories</Text>
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
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  categoryCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  categoryAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
});
