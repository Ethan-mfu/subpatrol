import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SubscriptionCategory } from '../../../models/subscription';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, CATEGORIES } from '../../../core/constants';

interface CategoryDropdownProps {
  selectedCategory: SubscriptionCategory | 'all';
  onSelectCategory: (category: SubscriptionCategory | 'all') => void;
}

export function CategoryDropdown({ selectedCategory, onSelectCategory }: CategoryDropdownProps) {
  const allCategories = [{ value: 'all' as const, label: 'All Categories', icon: '📱' }, ...CATEGORIES];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsRow}
      >
        {allCategories.map((item) => (
          <Pressable
            key={item.value}
            style={[
              styles.option,
              item.value === selectedCategory && styles.optionSelected,
            ]}
            onPress={() => onSelectCategory(item.value)}
            accessibilityLabel={`Select ${item.label}`}
            accessibilityRole="button"
          >
            <Text style={styles.optionIcon}>{item.icon}</Text>
            <Text style={[styles.optionText, item.value === selectedCategory && styles.optionTextSelected]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  optionsRow: {
    gap: SPACING.sm,
    paddingRight: SPACING.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionIcon: {
    fontSize: FONT_SIZES.md,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: COLORS.card,
    fontWeight: '600',
  },
});
