import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { ROUTES } from '../../../core/routes';
import { Button } from '../../../components/Button';
import { DashboardHeader } from '../components/DashboardHeader';
import { MonthlyTotalCard } from '../components/MonthlyTotalCard';
import { YearlyTotalCard } from '../components/YearlyTotalCard';
import { AlertBanner } from '../components/AlertBanner';
import { UpcomingRenewalCard } from '../components/UpcomingRenewalCard';
import { calculateMonthlyTotal, formatCurrency, sortByNextBilling } from '../../../core/utils/subscriptionUtils';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { subscriptions, isLoading, fetchSubscriptions } = useSubscriptionStore();
  const userPreferences = useSubscriptionStore((state) => state.userPreferences);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active' || sub.status === 'trial');
  const monthlyTotal = calculateMonthlyTotal(activeSubscriptions, userPreferences.currency);
  const yearlyTotal = monthlyTotal * 12;
  const upcomingSubscriptions = sortByNextBilling(activeSubscriptions).slice(0, 5);
  const trialSubscriptions = activeSubscriptions.filter(sub => sub.isTrial && sub.trialEndsDate);
  const nextTrialEnding = trialSubscriptions.length > 0
    ? trialSubscriptions.sort((a, b) => new Date(a.trialEndsDate!).getTime() - new Date(b.trialEndsDate!).getTime())[0]
    : null;

  const handleSubscriptionPress = (id: string) => {
    // @ts-ignore
    navigation.navigate(ROUTES.SUBSCRIPTIONS_TAB, {
      screen: ROUTES.SUBSCRIPTION_DETAIL,
      params: { id },
    });
  };

  const handleAddSubscription = () => {
    // @ts-ignore
    navigation.navigate(ROUTES.SUBSCRIPTIONS_TAB, {
      screen: ROUTES.SUBSCRIPTION_FORM,
    });
  };

  const formatTrialEndDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchSubscriptions} />}>
      <View style={styles.content}>
        <DashboardHeader />

        <View style={styles.summaryRow}>
          <MonthlyTotalCard amount={formatCurrency(monthlyTotal, userPreferences.currency)} activeCount={activeSubscriptions.length} />
          <View style={styles.cardSpacer} />
          <YearlyTotalCard amount={formatCurrency(yearlyTotal, userPreferences.currency)} />
        </View>

        {nextTrialEnding?.trialEndsDate && (
          <AlertBanner title="Trial Ending Soon" message={`${nextTrialEnding.name} trial ends ${formatTrialEndDate(nextTrialEnding.trialEndsDate)}`} />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Button title="+ Add New Subscription" onPress={handleAddSubscription} variant="primary" size="large" style={styles.addButton} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Renewals</Text>
            <Pressable style={styles.calendarButton} onPress={() => {}} accessibilityRole="button" accessibilityLabel="View calendar">
              <Text style={styles.calendarIcon}>📅</Text>
            </Pressable>
          </View>
          {upcomingSubscriptions.length > 0 ? (
            upcomingSubscriptions.map((sub) => (
              <UpcomingRenewalCard key={sub.id} subscription={sub} onPress={() => handleSubscriptionPress(sub.id)} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No upcoming renewals</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  summaryRow: { flexDirection: 'row', marginBottom: SPACING.md },
  cardSpacer: { width: SPACING.md },
  section: { marginBottom: SPACING.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: '600', color: COLORS.text },
  calendarButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  calendarIcon: { fontSize: 16 },
  addButton: { width: '100%' },
  emptyContainer: { padding: SPACING.lg, alignItems: 'center' },
  emptyText: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary },
});
