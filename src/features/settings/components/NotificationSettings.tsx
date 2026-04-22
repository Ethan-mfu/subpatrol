import React from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';

interface NotificationSettingsProps {
  notificationsEnabled: boolean;
  defaultReminderDaysBefore: number;
  onNotificationToggle: (value: boolean) => void;
  onReminderChange: (days: number) => void;
}

const REMINDER_DAYS = [1, 3, 7, 14];

export function NotificationSettings({
  notificationsEnabled,
  defaultReminderDaysBefore,
  onNotificationToggle,
  onReminderChange,
}: NotificationSettingsProps) {
  const handleToggle = (value: boolean) => {
    onNotificationToggle(value);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      <Card>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>
              Get reminders before subscriptions renew
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggle}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={COLORS.card}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Default Reminder</Text>
            <Text style={styles.settingDescription}>Days before billing to remind you</Text>
          </View>
        </View>
        <View style={styles.reminderOptions}>
          {REMINDER_DAYS.map((days) => (
            <Pressable
              key={days}
              style={[
                styles.reminderOption,
                defaultReminderDaysBefore === days && styles.reminderOptionActive,
              ]}
              onPress={() => onReminderChange(days)}
              accessibilityLabel={`Set default reminder to ${days} days`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.reminderOptionText,
                  defaultReminderDaysBefore === days && styles.reminderOptionTextActive,
                ]}
              >
                {days} day{days > 1 ? 's' : ''}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  settingInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  settingLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  reminderOptions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  reminderOption: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  reminderOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  reminderOptionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  reminderOptionTextActive: {
    color: COLORS.card,
  },
});
