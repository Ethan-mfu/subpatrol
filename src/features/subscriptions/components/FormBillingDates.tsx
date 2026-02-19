import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Card } from '../../../components/Card';
import { FormDatePicker } from './FormDatePicker';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface FormBillingDatesProps {
  nextBillingDate: Date;
  isTrial: boolean;
  trialEndsDate?: Date;
  onNextBillingDateChange: (date: Date) => void;
  onTrialChange: (value: boolean) => void;
  onTrialEndDateChange: (date: Date) => void;
}

export function FormBillingDates({
  nextBillingDate,
  isTrial,
  trialEndsDate,
  onNextBillingDateChange,
  onTrialChange,
  onTrialEndDateChange,
}: FormBillingDatesProps) {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Billing Dates</Text>

      <FormDatePicker
        label="Next Billing Date"
        value={nextBillingDate}
        onChange={onNextBillingDateChange}
      />

      <View style={styles.switchRow}>
        <View>
          <Text style={styles.label}>Trial Period</Text>
          <Text style={styles.helpText}>Is this a free trial?</Text>
        </View>
        <Switch
          value={isTrial}
          onValueChange={onTrialChange}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={COLORS.card}
        />
      </View>

      {isTrial && (
        <FormDatePicker
          label="Trial Ends On"
          value={trialEndsDate || new Date()}
          onChange={onTrialEndDateChange}
        />
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
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  helpText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
