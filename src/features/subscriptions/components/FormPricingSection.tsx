import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Card } from '../../../components/Card';
import { FormInput } from './FormInput';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, CURRENCIES, BILLING_CYCLES } from '../../../core/constants';
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

      <View style={styles.row}>
        <View style={styles.flex1}>
          <FormInput
            label="Price"
            value={price}
            onChangeText={onPriceChange}
            placeholder="0.00"
            keyboardType="decimal-pad"
            required
          />
        </View>

        <View style={[styles.inputGroup, styles.flex1]}>
          <Text style={styles.label}>Currency</Text>
          <View style={styles.pickerContainer}>
            {CURRENCIES.map((curr) => (
              <Pressable
                key={curr.code}
                style={[
                  styles.pickerOption,
                  currency === curr.code && styles.pickerOptionActive,
                ]}
                onPress={() => onCurrencyChange(curr.code)}
                accessibilityLabel={`Select ${curr.name}`}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    currency === curr.code && styles.pickerOptionTextActive,
                  ]}
                >
                  {curr.symbol} {curr.code}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Billing Cycle</Text>
        <View style={styles.cycleContainer}>
          {BILLING_CYCLES.map((cycle) => (
            <Pressable
              key={cycle.value}
              style={[
                styles.cycleOption,
                billingCycle === cycle.value && styles.cycleOptionActive,
              ]}
              onPress={() => onBillingCycleChange(cycle.value as BillingCycle)}
              accessibilityLabel={`Select ${cycle.label} billing`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.cycleOptionText,
                  billingCycle === cycle.value && styles.cycleOptionTextActive,
                ]}
              >
                {cycle.label}
              </Text>
            </Pressable>
          ))}
        </View>
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
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  flex1: {
    flex: 1,
  },
  pickerContainer: {
    gap: SPACING.sm,
  },
  pickerOption: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pickerOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pickerOptionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  pickerOptionTextActive: {
    color: COLORS.card,
  },
  cycleContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cycleOption: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  cycleOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  cycleOptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  cycleOptionTextActive: {
    color: COLORS.card,
  },
});
