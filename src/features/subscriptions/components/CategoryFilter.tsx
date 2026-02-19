import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { SubscriptionCategory } from '../../../models/subscription';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, CATEGORIES } from '../../../core/constants';

interface CategoryFilterProps {
  selectedCategory: SubscriptionCategory | 'all';
  onSelectCategory: (category: SubscriptionCategory | 'all') => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const allCategories = [{ value: 'all' as const, label: 'All', icon: '📱' }, ...CATEGORIES];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {allCategories.map((cat) => {
        const isSelected = selectedCategory === cat.value;
        return (
          <Pressable
            key={cat.value}
            onPress={() => onSelectCategory(cat.value)}
            style={[styles.chip, isSelected && styles.chipSelected]}
            accessibilityLabel={`Filter by ${cat.label}`}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={styles.icon}>{cat.icon}</Text>
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {cat.label}
            </Text>
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
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  icon: {
    fontSize: FONT_SIZES.md,
  },
  chipText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
  },
  chipTextSelected: {
    color: COLORS.card,
  },
});
