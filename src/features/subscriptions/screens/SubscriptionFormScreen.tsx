import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { Button } from '../../../components/Button';
import { FormBasicInfo } from '../components/FormBasicInfo';
import { FormPricingSection } from '../components/FormPricingSection';
import { FormBillingDates } from '../components/FormBillingDates';
import { FormReminderStatus } from '../components/FormReminderStatus';
import { FormNotes } from '../components/FormNotes';
import { SubscriptionFormData } from '../../../models/subscription';
import { getCategoryColor } from '../../../core/utils/subscriptionUtils';

export default function SubscriptionFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addSubscription, updateSubscription, subscriptions } = useSubscriptionStore();
  // @ts-ignore - route params
  const subscriptionId = route.params?.id;
  const existingSubscription = subscriptionId ? subscriptions.find((s) => s.id === subscriptionId) : null;

  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: existingSubscription?.name || '',
    category: existingSubscription?.category || 'other',
    price: existingSubscription?.price.toString() || '',
    currency: existingSubscription?.currency || 'THB',
    billingCycle: existingSubscription?.billingCycle || 'monthly',
    nextBillingDate: existingSubscription ? new Date(existingSubscription.nextBillingDate) : new Date(),
    isTrial: existingSubscription?.isTrial || false,
    trialEndsDate: existingSubscription?.trialEndsDate ? new Date(existingSubscription.trialEndsDate) : undefined,
    status: existingSubscription?.status || 'active',
    reminderDaysBefore: existingSubscription?.reminderDaysBefore || 3,
    notes: existingSubscription?.notes || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a subscription name');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    setIsSubmitting(true);
    try {
      const subscriptionData = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        currency: formData.currency,
        billingCycle: formData.billingCycle,
        nextBillingDate: formData.nextBillingDate.toISOString(),
        isTrial: formData.isTrial,
        trialEndsDate: formData.trialEndsDate?.toISOString(),
        status: formData.status,
        reminderDaysBefore: formData.reminderDaysBefore,
        notes: formData.notes,
        iconColor: getCategoryColor(formData.category),
      };

      if (existingSubscription) {
        await updateSubscription(existingSubscription.id, subscriptionData);
      } else {
        await addSubscription(subscriptionData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof SubscriptionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>{existingSubscription ? 'Edit Subscription' : 'Add Subscription'}</Text>

          <FormBasicInfo
            name={formData.name}
            category={formData.category}
            onNameChange={(value) => updateFormData('name', value)}
            onCategoryChange={(value) => updateFormData('category', value)}
          />
          <FormPricingSection
            price={formData.price}
            currency={formData.currency}
            billingCycle={formData.billingCycle}
            onPriceChange={(value) => updateFormData('price', value)}
            onCurrencyChange={(value) => updateFormData('currency', value)}
            onBillingCycleChange={(value) => updateFormData('billingCycle', value)}
          />
          <FormBillingDates
            nextBillingDate={formData.nextBillingDate}
            isTrial={formData.isTrial}
            trialEndsDate={formData.trialEndsDate}
            onNextBillingDateChange={(date) => updateFormData('nextBillingDate', date)}
            onTrialChange={(value) => {
              updateFormData('isTrial', value);
              if (!value) updateFormData('trialEndsDate', undefined);
            }}
            onTrialEndDateChange={(date) => updateFormData('trialEndsDate', date)}
          />
          <FormReminderStatus
            reminderDaysBefore={formData.reminderDaysBefore}
            status={formData.status}
            onReminderChange={(value) => updateFormData('reminderDaysBefore', value)}
            onStatusChange={(value) => updateFormData('status', value)}
          />
          <FormNotes notes={formData.notes || ''} onNotesChange={(value) => updateFormData('notes', value)} />

          <View style={styles.actions}>
            <Button title="Cancel" onPress={() => navigation.goBack()} variant="outline" size="large" style={styles.actionButton} />
            <Button
              title={existingSubscription ? 'Update' : 'Add Subscription'}
              onPress={handleSubmit}
              variant="primary"
              size="large"
              loading={isSubmitting}
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  actionButton: {
    flex: 1,
  },
});
