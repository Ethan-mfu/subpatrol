import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { ROUTES } from '../../../core/routes';
import { Card } from '../../../components/Card';
import { SubscriptionHeader } from '../components/SubscriptionHeader';
import { PriceInfoSection } from '../components/PriceInfoSection';
import { BillingInfoSection } from '../components/BillingInfoSection';
import { StatusInfoSection } from '../components/StatusInfoSection';
import { SubscriptionActions } from '../components/SubscriptionActions';
import { daysUntilBilling } from '../../../core/utils/subscriptionUtils';

export default function SubscriptionDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { subscriptions, deleteSubscription } = useSubscriptionStore();

  // @ts-ignore - route params
  const subscriptionId = route.params?.id;
  const subscription = subscriptions.find((s) => s.id === subscriptionId);

  if (!subscription) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Subscription not found</Text>
      </View>
    );
  }

  const handleEdit = () => {
    // @ts-ignore
    navigation.navigate(ROUTES.SUBSCRIPTION_FORM, { id: subscription.id });
  };

  const handleDelete = async () => {
    await deleteSubscription(subscription.id);
    navigation.goBack();
  };

  const daysUntil = daysUntilBilling(subscription.nextBillingDate);
  const isUrgent = daysUntil <= subscription.reminderDaysBefore && daysUntil >= 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SubscriptionHeader
          name={subscription.name}
          category={subscription.category}
          isTrial={subscription.isTrial}
          isUrgent={isUrgent}
          daysUntilBilling={daysUntil}
        />

        <PriceInfoSection
          price={subscription.price}
          currency={subscription.currency}
          billingCycle={subscription.billingCycle}
        />

        <BillingInfoSection
          nextBillingDate={subscription.nextBillingDate}
          daysUntilBilling={daysUntil}
          reminderDaysBefore={subscription.reminderDaysBefore}
          isTrial={subscription.isTrial}
          trialEndsDate={subscription.trialEndsDate}
          isUrgent={isUrgent}
        />

        <StatusInfoSection
          status={subscription.status}
          createdAt={subscription.createdAt}
          updatedAt={subscription.updatedAt}
        />

        {subscription.notes && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{subscription.notes}</Text>
          </Card>
        )}

        <SubscriptionActions
          subscriptionName={subscription.name}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
  errorText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  notesText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: 22,
  },
});
