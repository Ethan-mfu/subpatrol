import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

export function DashboardHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.title}>SubPatrol</Text>
        <Text style={styles.subtitle}>Track your subscriptions</Text>
      </View>
      <Pressable
        style={styles.bellButton}
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
      >
        <Text style={styles.bellIcon}>🔔</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  headerLeft: {
    flex: 1,
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
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  bellIcon: {
    fontSize: 20,
  },
});
