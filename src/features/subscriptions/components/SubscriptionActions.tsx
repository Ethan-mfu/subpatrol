import React from 'react';
import { View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from '../../../components/Button';
import { SPACING } from '../../../core/constants';

interface SubscriptionActionsProps {
  subscriptionName: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function SubscriptionActions({ 
  subscriptionName, 
  onEdit, 
  onDelete 
}: SubscriptionActionsProps) {
  const handleDelete = () => {
    Alert.alert(
      'Delete Subscription',
      `Are you sure you want to delete ${subscriptionName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <View style={styles.actions}>
      <Button
        title="Edit Subscription"
        onPress={onEdit}
        variant="primary"
        size="large"
        style={styles.actionButton}
      />
      <Button
        title="Delete"
        onPress={handleDelete}
        variant="danger"
        size="large"
        style={styles.deleteButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  actionButton: {
    width: '100%',
  },
  deleteButton: {
    width: '100%',
  },
});
