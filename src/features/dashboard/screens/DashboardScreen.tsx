import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { ROUTES } from '../../../core/routes';
import { Card } from '../../../components/Card';
import { SummaryCard } from '../components/SummaryCard';
import { UpcomingList } from '../components/UpcomingList';
import { QuickStatsCard } from '../components/QuickStatsCard';
import {
  calculateMonthlyTotal,
  formatCurrency,
  sortByNextBilling,
  daysUntilBilling,
} from '../../../core/utils/subscriptionUtils';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { subscriptions, isLoading, fetchSubscriptions } = useSubscriptionStore();
  const userPreferences = useSubscriptionStore((state) => state.userPreferences);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'active' || sub.status === 'trial'
  );

  const monthlyTotal = calculateMonthlyTotal(activeSubscriptions, userPreferences.currency);
  const upcomingSubscriptions = sortByNextBilling(activeSubscriptions).slice(0, 3);
  const urgentSubscriptions = activeSubscriptions.filter(
    (sub) => daysUntilBilling(sub.nextBillingDate) <= sub.reminderDaysBefore
  );

  const handleSubscriptionPress = (id: string) => {
    // @ts-ignore
    navigation.navigate(ROUTES.SUBSCRIPTIONS_TAB, {
      screen: ROUTES.SUBSCRIPTION_DETAIL,
      params: { id },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchSubscriptions} />
      }
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Welcome to SubPatrol</Text>
          </View>
        </View>

        {/* Statistics Cards */}
        <SummaryCard
          title="Active Subscriptions"
          value={activeSubscriptions.length.toString()}
          color={COLORS.primary}
        />

        <SummaryCard
          title="Monthly Spending"
          value={formatCurrency(monthlyTotal, userPreferences.currency)}
          subtitle={`Across ${activeSubscriptions.length} active subscriptions`}
          color={COLORS.success}
        />

        {urgentSubscriptions.length > 0 && (
          <Card style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚠️ Upcoming Renewals</Text>
            <Text style={styles.alertMessage}>
              {urgentSubscriptions.length} subscription{urgentSubscriptions.length > 1 ? 's' : ''} renewing soon
            </Text>
          </Card>
        )}

        {/* Upcoming Subscriptions */}
        {upcomingSubscriptions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Next Renewals</Text>
              <Pressable
                onPress={() => navigation.navigate(ROUTES.SUBSCRIPTIONS_TAB as never)}
                accessibilityLabel="View all subscriptions"
                accessibilityRole="button"
              >
                <Text style={styles.seeAll}>See All</Text>
              </Pressable>
            </View>

            <UpcomingList
              subscriptions={upcomingSubscriptions}
              onPressItem={handleSubscriptionPress}
              title=""
            />
          </View>
        )}

        {/* Quick Stats */}
        <QuickStatsCard
          totalSubscriptions={subscriptions.length}
          activeTrials={subscriptions.filter((s) => s.isTrial).length}
          cancelledCount={subscriptions.filter((s) => s.status === 'cancelled').length}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  alertCard: {
    backgroundColor: '#FFF3CD',
    borderWidth: 1,
    borderColor: COLORS.warning,
    marginBottom: SPACING.md,
  },
  alertTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  alertMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
