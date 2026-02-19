import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, CURRENCIES } from '../../../core/constants';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
}

export function CurrencySelector({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = CURRENCIES.find(c => c.code === selectedCurrency);

  const handleSelect = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsOpen(false);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Currency</Text>
      <Pressable
        style={styles.trigger}
        onPress={() => setIsOpen(true)}
        accessibilityLabel="Select currency"
        accessibilityRole="button"
      >
        <View style={styles.triggerContent}>
          <Text style={styles.triggerSymbol}>{selected?.symbol}</Text>
          <View>
            <Text style={styles.triggerName}>{selected?.name}</Text>
            <Text style={styles.triggerCode}>{selected?.code}</Text>
          </View>
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
              <Text style={styles.dropdownTitle}>Select Currency</Text>
              <Pressable onPress={() => setIsOpen(false)} hitSlop={8}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            <FlatList
              data={CURRENCIES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.option, item.code === selectedCurrency && styles.optionSelected]}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.optionSymbol}>{item.symbol}</Text>
                  <View style={styles.optionInfo}>
                    <Text style={[styles.optionName, item.code === selectedCurrency && styles.optionTextSelected]}>
                      {item.name}
                    </Text>
                    <Text style={styles.optionCode}>{item.code}</Text>
                  </View>
                  {item.code === selectedCurrency && (
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
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.md },
  trigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.card, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  triggerContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, flex: 1 },
  triggerSymbol: { fontSize: FONT_SIZES.xxl, fontWeight: 'bold' },
  triggerName: { fontSize: FONT_SIZES.md, fontWeight: '500', color: COLORS.text },
  triggerCode: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  chevron: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: SPACING.md },
  dropdown: { backgroundColor: COLORS.card, borderRadius: BORDER_RADIUS.lg, width: '100%', maxWidth: 400, maxHeight: '70%', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  dropdownTitle: { fontSize: FONT_SIZES.lg, fontWeight: '600', color: COLORS.text },
  closeButton: { fontSize: FONT_SIZES.xl, color: COLORS.textSecondary },
  option: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  optionSelected: { backgroundColor: COLORS.primary + '10' },
  optionSymbol: { fontSize: FONT_SIZES.xxl, fontWeight: 'bold' },
  optionInfo: { flex: 1 },
  optionName: { fontSize: FONT_SIZES.md, fontWeight: '500', color: COLORS.text },
  optionTextSelected: { color: COLORS.primary, fontWeight: '600' },
  optionCode: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  checkmark: { fontSize: FONT_SIZES.lg, color: COLORS.primary, fontWeight: 'bold' },
});
