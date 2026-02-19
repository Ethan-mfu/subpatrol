import React from 'react';
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { SubscriptionStatus } from '../../../models/subscription';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';

export type FilterTab = 'all' | SubscriptionStatus;

interface TabbedFilterProps {
  value: FilterTab;
  onChange: (tab: FilterTab) => void;
  counts?: Partial<Record<FilterTab, number>>;
}

const TABS: Array<{ key: FilterTab; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'trial', label: 'Trial' },
  { key: 'cancelled', label: 'Cancelled' },
];

export function TabbedFilter({ value, onChange, counts }: TabbedFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {TABS.map((tab) => {
        const isSelected = value === tab.key;
        const count = counts?.[tab.key];

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, isSelected && styles.tabSelected]}
            accessibilityLabel={`${tab.label} subscriptions${count !== undefined ? `, ${count} items` : ''}`}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
              {tab.label}
            </Text>
            {count !== undefined && (
              <View style={[styles.badge, isSelected && styles.badgeSelected]}>
                <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>
                  {count}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: SPACING.md,
  },
  content: {
    gap: SPACING.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
  },
  tabSelected: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginRight: SPACING.xs,
  },
  tabTextSelected: {
    color: COLORS.card,
  },
  badge: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  badgeTextSelected: {
    color: COLORS.card,
  },
});
