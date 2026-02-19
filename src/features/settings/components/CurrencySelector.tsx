import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, CURRENCIES } from '../../../core/constants';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
}

export function CurrencySelector({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Currency</Text>
      <Card>
        {CURRENCIES.map((currency, index) => (
          <View key={currency.code}>
            {index > 0 && <View style={styles.divider} />}
            <Pressable
              style={styles.currencyRow}
              onPress={() => onCurrencyChange(currency.code)}
              accessibilityLabel={`Select ${currency.name}`}
              accessibilityRole="button"
            >
              <View style={styles.currencyInfo}>
                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                <View>
                  <Text style={styles.currencyName}>{currency.name}</Text>
                  <Text style={styles.currencyCode}>{currency.code}</Text>
                </View>
              </View>
              {selectedCurrency === currency.code && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </Pressable>
          </View>
        ))}
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
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  currencySymbol: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    width: 40,
    textAlign: 'center',
  },
  currencyName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  currencyCode: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});
