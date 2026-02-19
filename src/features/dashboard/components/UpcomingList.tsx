import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Subscription } from '../../../models/subscription';
import { SubscriptionCard } from '../../../components/SubscriptionCard';
import { EmptyState } from '../../../core/components/EmptyState';
import { COLORS, SPACING, FONT_SIZES } from '../../../core/constants';

interface UpcomingListProps {
  subscriptions: Subscription[];
  onPressItem: (id: string) => void;
  title?: string;
}

export function UpcomingList({ 
  subscriptions, 
  onPressItem, 
  title = 'Upcoming Renewals' 
}: UpcomingListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subscriptions.length === 0 ? (
        <EmptyState
          icon="📅"
          title="No upcoming renewals"
          message="All your subscriptions are up to date"
        />
      ) : (
        subscriptions.map((item) => (
          <SubscriptionCard
            key={item.id}
            subscription={item}
            onPress={() => onPressItem(item.id)}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
});
