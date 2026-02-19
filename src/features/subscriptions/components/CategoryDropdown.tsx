import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, FlatList } from 'react-native';
import { SubscriptionCategory } from '../../../models/subscription';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, CATEGORIES } from '../../../core/constants';

interface CategoryDropdownProps {
  selectedCategory: SubscriptionCategory | 'all';
  onSelectCategory: (category: SubscriptionCategory | 'all') => void;
}

export function CategoryDropdown({ selectedCategory, onSelectCategory }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const allCategories = [{ value: 'all' as const, label: 'All Categories', icon: '📱' }, ...CATEGORIES];
  const selected = allCategories.find(cat => cat.value === selectedCategory);

  const handleSelect = (value: SubscriptionCategory | 'all') => {
    onSelectCategory(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.trigger}
        onPress={() => setIsOpen(true)}
        accessibilityLabel="Select category"
        accessibilityRole="button"
      >
        <View style={styles.triggerContent}>
          <Text style={styles.triggerIcon}>{selected?.icon}</Text>
          <Text style={styles.triggerText}>{selected?.label}</Text>
        </View>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <View style={styles.dropdown}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Select Category</Text>
              <Pressable onPress={() => setIsOpen(false)} hitSlop={8}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            <FlatList
              data={allCategories}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.option, item.value === selectedCategory && styles.optionSelected]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionIcon}>{item.icon}</Text>
                  <Text style={[styles.optionText, item.value === selectedCategory && styles.optionTextSelected]}>
                    {item.label}
                  </Text>
                  {item.value === selectedCategory && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  triggerIcon: {
    fontSize: FONT_SIZES.lg,
  },
  triggerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  chevron: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  dropdown: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  closeButton: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textSecondary,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  optionSelected: {
    backgroundColor: COLORS.primary + '10',
  },
  optionIcon: {
    fontSize: FONT_SIZES.lg,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 1,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
