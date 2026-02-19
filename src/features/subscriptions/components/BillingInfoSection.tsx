import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { formatDate, getRelativeTimeString } from '../../../core/utils/subscriptionUtils';

interface BillingInfoSectionProps {
  nextBillingDate: string;
  daysUntilBilling: number;
  reminderDaysBefore: number;
  isTrial: boolean;
  trialEndsDate?: string;
  isUrgent: boolean;
}

export function BillingInfoSection({
  nextBillingDate,
  daysUntilBilling,
  reminderDaysBefore,
  isTrial,
  trialEndsDate,
  isUrgent,
}: BillingInfoSectionProps) {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Billing</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Next Billing Date</Text>
        <Text style={styles.infoValue}>{formatDate(nextBillingDate)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Days Until Billing</Text>
        <Text style={[styles.infoValue, isUrgent && styles.urgentText]}>
          {getRelativeTimeString(daysUntilBilling)}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Reminder</Text>
        <Text style={styles.infoValue}>
          {reminderDaysBefore} day{reminderDaysBefore > 1 ? 's' : ''} before
        </Text>
      </View>
      {isTrial && trialEndsDate && (
        <>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Trial Ends</Text>
            <Text style={styles.infoValue}>{formatDate(trialEndsDate)}</Text>
          </View>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  urgentText: {
    color: COLORS.warning,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
});
