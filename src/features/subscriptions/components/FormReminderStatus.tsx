import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, REMINDER_OPTIONS } from '../../../core/constants';
import { SubscriptionStatus } from '../../../models/subscription';

interface FormReminderStatusProps {
  reminderDaysBefore: number;
  status: SubscriptionStatus;
  onReminderChange: (value: number) => void;
  onStatusChange: (value: SubscriptionStatus) => void;
}

export function FormReminderStatus({
  reminderDaysBefore,
  status,
  onReminderChange,
  onStatusChange,
}: FormReminderStatusProps) {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Reminder & Status</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Reminder</Text>
        <View style={styles.reminderContainer}>
          {REMINDER_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.reminderOption,
                reminderDaysBefore === option.value && styles.reminderOptionActive,
              ]}
              onPress={() => onReminderChange(option.value)}
              accessibilityLabel={`Remind ${option.label}`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.reminderOptionText,
                  reminderDaysBefore === option.value && styles.reminderOptionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          {(['active', 'cancelled', 'expired'] as SubscriptionStatus[]).map((statusOption) => (
            <Pressable
              key={statusOption}
              style={[
                styles.statusOption,
                status === statusOption && styles.statusOptionActive,
              ]}
              onPress={() => onStatusChange(statusOption)}
              accessibilityLabel={`Set status to ${statusOption}`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.statusOptionText,
                  status === statusOption && styles.statusOptionTextActive,
                ]}
              >
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
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
  reminderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  reminderOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  reminderOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  reminderOptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '500',
  },
  reminderOptionTextActive: {
    color: COLORS.card,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  statusOption: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  statusOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusOptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  statusOptionTextActive: {
    color: COLORS.card,
  },
});
