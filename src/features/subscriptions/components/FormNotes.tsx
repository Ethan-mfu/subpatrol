import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from '../../../components/Card';
import { FormInput } from './FormInput';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface FormNotesProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

export function FormNotes({ notes, onNotesChange }: FormNotesProps) {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Notes (Optional)</Text>
      <FormInput
        value={notes || ''}
        onChangeText={onNotesChange}
        placeholder="Add any additional notes..."
        multiline
        numberOfLines={4}
        style={styles.textArea}
      />
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
  textArea: {
    minHeight: 100,
  },
});
