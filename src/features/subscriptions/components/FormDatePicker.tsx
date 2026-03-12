import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';

// Allow HTML elements in JSX for web
declare global {
  namespace JSX {
    interface IntrinsicElements {
      input: any;
    }
  }
}

interface FormDatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  required?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
}

export function FormDatePicker({
  label,
  value,
  onChange,
  error,
  required = false,
  mode = 'date',
  minimumDate,
  maximumDate,
}: FormDatePickerProps) {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleWebDateChange = (event: any) => {
    const dateString = event.target?.value || event.nativeEvent?.text;
    if (dateString) {
      // Parse YYYY-MM-DD format from input
      const [year, month, day] = dateString.split('-').map(Number);
      if (year && month && day) {
        const newDate = new Date(year, month - 1, day);
        if (!isNaN(newDate.getTime())) {
          onChange(newDate);
        }
      }
    }
  };

  const formatDate = (date: Date): string => {
    if (mode === 'time') {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    if (mode === 'datetime') {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Web-specific rendering
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        <input
          type="date"
          value={formatDateForInput(value)}
          onChange={handleWebDateChange}
          style={{
            backgroundColor: COLORS.card,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: error ? COLORS.error : COLORS.border,
            borderRadius: BORDER_RADIUS.md,
            padding: SPACING.md,
            fontSize: FONT_SIZES.md,
            color: COLORS.text,
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            width: '100%',
            boxSizing: 'border-box',
          }}
          aria-label={`Select ${label}`}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  // Native rendering (iOS/Android)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <Pressable
        onPress={() => setShow(true)}
        style={[styles.button, error && styles.buttonError]}
        accessibilityLabel={`Select ${label}`}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>{formatDate(value)}</Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
      
      {Platform.OS === 'ios' && show && (
        <Pressable
          style={styles.overlay}
          onPress={() => setShow(false)}
        />
      )}
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
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.error,
  },
  button: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    justifyContent: 'center',
  },
  buttonError: {
    borderColor: COLORS.error,
  },
  buttonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
