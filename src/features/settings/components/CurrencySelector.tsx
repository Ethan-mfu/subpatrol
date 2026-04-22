import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, CURRENCIES } from '../../../core/constants';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
}

export function CurrencySelector({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) {
  const selected = CURRENCIES.find((c) => c.code === selectedCurrency);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Currency</Text>
      <Card style={styles.pickerCard}>
        <View style={styles.selectedPreview}>
          <Text style={styles.selectedSymbol}>{selected?.symbol}</Text>
          <View>
            <Text style={styles.selectedName}>{selected?.name}</Text>
            <Text style={styles.selectedCode}>{selected?.code}</Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          {CURRENCIES.map((item) => (
            <Pressable
              key={item.code}
              style={[
                styles.option,
                item.code === selectedCurrency && styles.optionActive,
              ]}
              onPress={() => onCurrencyChange(item.code)}
              accessibilityLabel={`Select ${item.name}`}
              accessibilityRole="button"
            >
              <Text style={styles.optionSymbol}>{item.symbol}</Text>
              <Text
                style={[
                  styles.optionText,
                  item.code === selectedCurrency && styles.optionTextActive,
                ]}
              >
                {item.code}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.md },
  pickerCard: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  selectedSymbol: { fontSize: FONT_SIZES.xxl, fontWeight: 'bold' },
  selectedName: { fontSize: FONT_SIZES.md, fontWeight: '500', color: COLORS.text },
  selectedCode: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  optionsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  optionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  optionSymbol: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
  optionText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  optionTextActive: {
    color: COLORS.card,
  },
});
