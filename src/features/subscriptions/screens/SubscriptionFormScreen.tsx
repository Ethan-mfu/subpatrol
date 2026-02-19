import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, Pressable } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';
import { ROUTES } from '../../../core/routes';
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
    if (!formData.name.trim()) return Alert.alert('Error', 'Please enter a subscription name');
    if (!formData.price || parseFloat(formData.price) <= 0) return Alert.alert('Error', 'Please enter a valid price');

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
      // Navigate to subscriptions list
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTES.SUBSCRIPTIONS_LIST }],
        })
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof SubscriptionFormData, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleCancel = () => {
    // Navigate to subscriptions list
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTES.SUBSCRIPTIONS_LIST }],
      })
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Pressable onPress={handleCancel} style={styles.backButton} hitSlop={8}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{existingSubscription ? 'Edit Subscription' : 'New Subscription'}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <FormBasicInfo name={formData.name} category={formData.category} onNameChange={(v) => updateFormData('name', v)} onCategoryChange={(v) => updateFormData('category', v)} />
          <FormPricingSection price={formData.price} currency={formData.currency} billingCycle={formData.billingCycle} onPriceChange={(v) => updateFormData('price', v)} onCurrencyChange={(v) => updateFormData('currency', v)} onBillingCycleChange={(v) => updateFormData('billingCycle', v)} />
          <FormBillingDates nextBillingDate={formData.nextBillingDate} isTrial={formData.isTrial} trialEndsDate={formData.trialEndsDate} onNextBillingDateChange={(d) => updateFormData('nextBillingDate', d)} onTrialChange={(v) => { updateFormData('isTrial', v); if (!v) updateFormData('trialEndsDate', undefined); }} onTrialEndDateChange={(d) => updateFormData('trialEndsDate', d)} />
          <FormReminderStatus reminderDaysBefore={formData.reminderDaysBefore} status={formData.status} onReminderChange={(v) => updateFormData('reminderDaysBefore', v)} onStatusChange={(v) => updateFormData('status', v)} />
          <FormNotes notes={formData.notes || ''} onNotesChange={(v) => updateFormData('notes', v)} />

          <View style={styles.actions}>
            <Button title="Cancel" onPress={handleCancel} variant="outline" size="large" style={styles.actionButton} />
            <Button title={existingSubscription ? 'Update' : 'Add Subscription'} onPress={handleSubmit} variant="primary" size="large" loading={isSubmitting} style={styles.actionButton} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 28, color: COLORS.primary },
  headerTitle: { fontSize: FONT_SIZES.lg, fontWeight: '600', color: COLORS.text },
  headerSpacer: { width: 40 },
  scrollView: { flex: 1 },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  section: { marginBottom: SPACING.xs },
  actions: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.lg },
  actionButton: { flex: 1 },
});
