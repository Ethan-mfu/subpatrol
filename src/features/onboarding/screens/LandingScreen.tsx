import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface LandingScreenProps {
  onGetStarted: () => void;
}

export default function LandingScreen({ onGetStarted }: LandingScreenProps) {
  const features = [
    { icon: '📊', title: 'Track Subscriptions', description: 'Keep all your subscriptions in one place' },
    { icon: '💰', title: 'Save Money', description: 'Identify unused subscriptions and cut costs' },
    { icon: '🔔', title: 'Get Reminders', description: 'Never miss a renewal date again' },
    { icon: '📈', title: 'Analyze Spending', description: 'Understand your subscription patterns' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.logo}>📱 SubPatrol</Text>
        <Text style={styles.tagline}>Track your subscriptions{'\n'}effortlessly</Text>
        <Text style={styles.subtitle}>
          Take control of your recurring payments and never overpay again
        </Text>
      </View>

      {/* Features Grid */}
      <View style={styles.features}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>

      {/* CTA Button */}
      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={onGetStarted}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaButtonText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Free to use • No credit card required</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: SPACING.xl,
    paddingTop: SPACING.xl * 2,
  },
  hero: {
    alignItems: 'center',
    marginBottom: SPACING.xl * 2,
  },
  logo: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  tagline: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.md,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl * 2,
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  featureTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  footer: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
