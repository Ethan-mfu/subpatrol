import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { useAuthStore } from '../../../store/authStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { NotificationSettings } from '../components/NotificationSettings';
import { CurrencySelector } from '../components/CurrencySelector';
import { RegionalSettings } from '../components/RegionalSettings';
import { AboutSection } from '../components/AboutSection';
import { SettingInfoCard } from '../components/SettingInfoCard';

interface SettingsScreenProps {
  onLogout?: () => void;
}

export default function SettingsScreen({ onLogout }: SettingsScreenProps) {
  const { userPreferences, updateUserPreferences } = useSubscriptionStore();
  const { mode, user } = useAuthStore();
  const isGuest = mode === 'guest';
  const accountLabel = isGuest ? 'Guest Mode' : 'Signed In';
  const emailText = user?.email || 'No email (guest session)';
  const initial = isGuest ? 'G' : (user?.email?.charAt(0).toUpperCase() || 'U');

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

        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileTitle}>{accountLabel}</Text>
              <Text style={styles.profileEmail}>{emailText}</Text>
            </View>
          </View>
          {isGuest && (
            <Text style={styles.profileHint}>
              Guest data is temporary for this session.
            </Text>
          )}
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

        {onLogout && (
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>{isGuest ? 'Exit Guest Mode' : 'Log Out'}</Text>
          </TouchableOpacity>
        )}
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
  profileCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    color: COLORS.card,
    fontWeight: '700',
    fontSize: FONT_SIZES.md,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  profileHint: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    color: COLORS.warning,
  },
  logoutButton: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.error,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
