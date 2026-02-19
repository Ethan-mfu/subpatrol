import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface AboutSectionProps {
  version?: string;
  appName?: string;
  purpose?: string;
}

export function AboutSection({ 
  version = '1.0.0', 
  appName = 'SubPatrol', 
  purpose = 'Subscription Tracker' 
}: AboutSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About</Text>
      <Card>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Version</Text>
          <Text style={styles.aboutValue}>{version}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>App Name</Text>
          <Text style={styles.aboutValue}>{appName}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Purpose</Text>
          <Text style={styles.aboutValue}>{purpose}</Text>
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
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  aboutLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  aboutValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
});
