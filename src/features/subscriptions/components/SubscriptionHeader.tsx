import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';
import { getCategoryIcon, getRelativeTimeString } from '../../../core/utils/subscriptionUtils';

interface SubscriptionHeaderProps {
  name: string;
  category: string;
  isTrial: boolean;
  isUrgent: boolean;
  daysUntilBilling: number;
}

export function SubscriptionHeader({
  name,
  category,
  isTrial,
  isUrgent,
  daysUntilBilling,
}: SubscriptionHeaderProps) {
  return (
    <Card style={[styles.headerCard, isUrgent && styles.urgentCard]}>
      <View style={styles.headerIcon}>
        <Text style={styles.headerEmoji}>{getCategoryIcon(category)}</Text>
      </View>
      <Text style={styles.headerName}>{name}</Text>
      <Text style={styles.headerCategory}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>

      {isTrial && (
        <View style={styles.trialBadge}>
          <Text style={styles.trialBadgeText}>Free Trial</Text>
        </View>
      )}

      {isUrgent && (
        <View style={styles.urgentBanner}>
          <Text style={styles.urgentBannerText}>
            ⚠️ Renews {getRelativeTimeString(daysUntilBilling)}
          </Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  urgentCard: {
    borderWidth: 2,
    borderColor: COLORS.warning,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  headerEmoji: {
    fontSize: 40,
  },
  headerName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  headerCategory: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
  },
  trialBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
  },
  trialBadgeText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  urgentBanner: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  urgentBannerText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
