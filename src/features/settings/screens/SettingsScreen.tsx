import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { NotificationSettings } from '../components/NotificationSettings';
import { CurrencySelector } from '../components/CurrencySelector';
import { RegionalSettings } from '../components/RegionalSettings';
import { AboutSection } from '../components/AboutSection';
import { SettingInfoCard } from '../components/SettingInfoCard';

export default function SettingsScreen() {
  const { userPreferences, updateUserPreferences } = useSubscriptionStore();

  const handleCurrencyChange = (currencyCode: string) => {
    updateUserPreferences({ currency: currencyCode });
  };

  const handleNotificationToggle = (value: boolean) => {
    updateUserPreferences({ notificationsEnabled: value });
  };

  const handleReminderChange = (days: number) => {
    updateUserPreferences({ defaultReminderDaysBefore: days });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your preferences</Text>
        </View>

        <NotificationSettings
          notificationsEnabled={userPreferences.notificationsEnabled}
          defaultReminderDaysBefore={userPreferences.defaultReminderDaysBefore}
          onNotificationToggle={handleNotificationToggle}
          onReminderChange={handleReminderChange}
        />

        <CurrencySelector
          selectedCurrency={userPreferences.currency}
          onCurrencyChange={handleCurrencyChange}
        />

        <RegionalSettings timezone={userPreferences.timezone} />

        <AboutSection />

        <SettingInfoCard
          title="Tip"
          message="Enable notifications to never miss a subscription renewal. Set custom reminders for each subscription in the edit screen."
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
});
