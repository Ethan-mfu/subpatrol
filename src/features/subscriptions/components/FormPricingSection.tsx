import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { FormInput } from './FormInput';
import { FormPicker } from './FormPicker';
import { COLORS, SPACING, FONT_SIZES, CURRENCIES, BILLING_CYCLES } from '../../../core/constants';
import { BillingCycle } from '../../../models/subscription';

interface FormPricingSectionProps {
  price: string;
  currency: string;
  billingCycle: BillingCycle;
  onPriceChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onBillingCycleChange: (value: BillingCycle) => void;
}

export function FormPricingSection({
  price,
  currency,
  billingCycle,
  onPriceChange,
  onCurrencyChange,
  onBillingCycleChange,
}: FormPricingSectionProps) {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Pricing</Text>

      <FormInput
        label="Price"
        value={price}
        onChangeText={onPriceChange}
        placeholder="0.00"
        keyboardType="decimal-pad"
        required
      />

      <FormPicker
        label="Currency"
        value={currency}
        onValueChange={onCurrencyChange}
        required
        items={CURRENCIES.map((curr) => ({
          label: `${curr.symbol} ${curr.code} - ${curr.name}`,
          value: curr.code,
        }))}
      />

      <FormPicker
        label="Billing Cycle"
        value={billingCycle}
        onValueChange={onBillingCycleChange}
        required
        items={BILLING_CYCLES.map((cycle) => ({
          label: cycle.label,
          value: cycle.value as BillingCycle,
        }))}
      />
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
});
