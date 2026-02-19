import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Subscription } from '../../../models/subscription';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';
import { formatCurrency, daysUntilBilling, getCategoryIcon } from '../../../core/utils/subscriptionUtils';

interface UpcomingRenewalCardProps {
  subscription: Subscription;
  onPress: () => void;
}

export function UpcomingRenewalCard({ subscription, onPress }: UpcomingRenewalCardProps) {
  const daysUntil = daysUntilBilling(subscription.nextBillingDate);
  const isUrgent = daysUntil <= 2 && daysUntil >= 0;
  
  const getDaysText = () => {
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days ago`;
    return `In ${daysUntil} days`;
  };

  const categoryIcon = getCategoryIcon(subscription.category);
  const categoryColor = subscription.iconColor || COLORS[subscription.category as keyof typeof COLORS] || COLORS.other;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${subscription.name} subscription`}
    >
      <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
        <Text style={styles.icon}>{categoryIcon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {subscription.name}
        </Text>
        <Text style={styles.daysText} numberOfLines={1}>
          {getDaysText()}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.price} numberOfLines={1}>
          {formatCurrency(subscription.price, subscription.currency)}
        </Text>
        {isUrgent && (
          <View style={styles.urgentPill}>
            <Text style={styles.urgentText}>Urgent</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  daysText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  urgentPill: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  urgentText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: '#FF3B30',
  },
});
