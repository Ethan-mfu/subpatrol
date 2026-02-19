import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { EmptyState } from '../../../core/components/EmptyState';
import { SpendingHeroCard } from '../components/SpendingHeroCard';
import { CategoryBreakdownList } from '../components/CategoryBreakdownList';
import { BillingCycleChart } from '../components/BillingCycleChart';
import { QuickStatsGrid } from '../components/QuickStatsGrid';
import {
  calculateMonthlyTotal,
  getCategoryColor,
} from '../../../core/utils/subscriptionUtils';

export default function InsightsScreen() {
  const { subscriptions, fetchSubscriptions } = useSubscriptionStore();
  const userPreferences = useSubscriptionStore((state) => state.userPreferences);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'active' || sub.status === 'trial'
  );

  // Calculate category breakdown
  const categoryStats = useMemo(() => {
    const stats: Record<string, { count: number; total: number; color: string }> = {};
    
    activeSubscriptions.forEach((sub) => {
      if (!stats[sub.category]) {
        stats[sub.category] = {
          count: 0,
          total: 0,
          color: sub.iconColor || getCategoryColor(sub.category),
        };
      }
      stats[sub.category].count += 1;
      stats[sub.category].total += sub.price;
    });

    return Object.entries(stats)
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.total - a.total);
  }, [activeSubscriptions]);

  // Calculate billing cycle breakdown
  const cycleStats = useMemo(() => {
    const stats: Record<string, number> = {};
    activeSubscriptions.forEach((sub) => {
      stats[sub.billingCycle] = (stats[sub.billingCycle] || 0) + 1;
    });
    return Object.entries(stats).map(([cycle, count]) => ({ cycle, count }));
  }, [activeSubscriptions]);

  const monthlyTotal = calculateMonthlyTotal(activeSubscriptions, userPreferences.currency);
  const yearlyProjection = monthlyTotal * 12;

  if (subscriptions.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="📊"
          title="No insights yet"
          message="Add subscriptions to see your spending analytics"
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>Your spending analytics</Text>
        </View>

        <SpendingHeroCard
          monthlyTotal={monthlyTotal}
          yearlyProjection={yearlyProjection}
          currency={userPreferences.currency}
        />

        <CategoryBreakdownList
          categoryStats={categoryStats}
          currency={userPreferences.currency}
        />

        <BillingCycleChart cycleStats={cycleStats} />

        <QuickStatsGrid
          activeCount={subscriptions.filter((s) => s.status === 'active').length}
          trialsCount={subscriptions.filter((s) => s.isTrial).length}
          cancelledCount={subscriptions.filter((s) => s.status === 'cancelled').length}
          totalCount={subscriptions.length}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
});
