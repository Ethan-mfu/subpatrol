import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';
import { formatDate } from '../../../core/utils/subscriptionUtils';

interface StatusInfoSectionProps {
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function StatusInfoSection({ status, createdAt, updatedAt }: StatusInfoSectionProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'active':
        return styles.statusactive;
      case 'trial':
        return styles.statustrial;
      case 'cancelled':
        return styles.statuscancelled;
      case 'expired':
        return styles.statusexpired;
      default:
        return styles.statusactive;
    }
  };

  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Status & Info</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Status</Text>
        <View style={[styles.statusBadge, getStatusStyle()]}>
          <Text style={styles.statusBadgeText}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Created</Text>
        <Text style={styles.infoValue}>{formatDate(createdAt)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Last Updated</Text>
        <Text style={styles.infoValue}>{formatDate(updatedAt)}</Text>
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusactive: {
    backgroundColor: COLORS.success,
  },
  statustrial: {
    backgroundColor: COLORS.secondary,
  },
  statuscancelled: {
    backgroundColor: COLORS.textTertiary,
  },
  statusexpired: {
    backgroundColor: COLORS.error,
  },
  statusBadgeText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
