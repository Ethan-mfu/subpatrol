import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Subscription } from '../models/subscription';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../core/constants';
import {
  formatCurrency,
  formatDate,
  daysUntilBilling,
  getRelativeTimeString,
  getCategoryColor,
  getCategoryIcon,
} from '../core/utils/subscriptionUtils';

interface SubscriptionCardProps {
  subscription: Subscription;
  onPress: () => void;
}

export function SubscriptionCard({ subscription, onPress }: SubscriptionCardProps) {
  const daysUntil = daysUntilBilling(subscription.nextBillingDate);
  const isUrgent = daysUntil <= subscription.reminderDaysBefore && daysUntil >= 0;
  const categoryColor = subscription.iconColor || getCategoryColor(subscription.category);
  const categoryIcon = getCategoryIcon(subscription.category);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        isUrgent && styles.urgent,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${subscription.name} subscription, ${formatCurrency(subscription.price, subscription.currency)} per ${subscription.billingCycle}`}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.icon, { backgroundColor: categoryColor }]}>
            <Text style={styles.iconText}>{categoryIcon}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{subscription.name}</Text>
            <Text style={styles.category}>{subscription.category}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {formatCurrency(subscription.price, subscription.currency)}
            </Text>
            <Text style={styles.cycle}>/{subscription.billingCycle}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          {subscription.isTrial && (
            <View style={styles.trialBadge}>
              <Text style={styles.trialText}>Trial</Text>
            </View>
          )}
          <Text style={styles.nextBilling}>
            Next billing: {formatDate(subscription.nextBillingDate)}
          </Text>
          <Text style={[styles.daysUntil, isUrgent && styles.daysUntilUrgent]}>
            {getRelativeTimeString(daysUntil)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  urgent: {
    borderWidth: 2,
    borderColor: COLORS.warning,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  iconText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  category: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  cycle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  trialBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  trialText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  nextBilling: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  daysUntil: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  daysUntilUrgent: {
    color: COLORS.warning,
  },
});
