import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Card } from '../../../components/Card';
import { FormInput } from './FormInput';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, CATEGORIES } from '../../../core/constants';
import { SubscriptionCategory } from '../../../models/subscription';

interface FormBasicInfoProps {
  name: string;
  category: SubscriptionCategory;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: SubscriptionCategory) => void;
}

export function FormBasicInfo({ name, category, onNameChange, onCategoryChange }: FormBasicInfoProps) {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Basic Information</Text>

      <FormInput
        label="Name"
        value={name}
        onChangeText={onNameChange}
        placeholder="e.g., Netflix, Spotify"
        required
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.value}
              style={[
                styles.categoryOption,
                category === cat.value && styles.categoryOptionActive,
              ]}
              onPress={() => onCategoryChange(cat.value as SubscriptionCategory)}
              accessibilityLabel={`Select ${cat.label} category`}
              accessibilityRole="button"
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.categoryOptionText,
                  category === cat.value && styles.categoryOptionTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
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
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  categoryScroll: {
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  categoryOption: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    marginRight: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    minWidth: 80,
  },
  categoryOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  categoryOptionText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
    fontWeight: '500',
  },
  categoryOptionTextActive: {
    color: COLORS.card,
  },
});
