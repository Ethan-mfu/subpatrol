import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { formatCurrency, getMonthlyEquivalent } from '../../../core/utils/subscriptionUtils';
import { BillingCycle } from '../../../models/subscription';

interface PriceInfoSectionProps {
  price: number;
  currency: string;
  billingCycle: BillingCycle;
}

export function PriceInfoSection({ price, currency, billingCycle }: PriceInfoSectionProps) {
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);

  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Price</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Amount</Text>
        <Text style={styles.priceValue}>{formatCurrency(price, currency)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Billing Cycle</Text>
        <Text style={styles.priceValue}>
          {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Monthly Equivalent</Text>
        <Text style={styles.priceValue}>{formatCurrency(monthlyEquivalent, currency)}/mo</Text>
      </View>
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
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  priceLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
});
