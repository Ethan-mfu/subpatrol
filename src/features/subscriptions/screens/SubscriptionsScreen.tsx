import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../core/constants';
import { ROUTES } from '../../../core/routes';
import { SubscriptionCard } from '../../../components/SubscriptionCard';
import { EmptyState } from '../../../core/components/EmptyState';
import { Subscription, SubscriptionCategory } from '../../../models/subscription';
import { SearchBar } from '../components/SearchBar';
import { TabbedFilter, FilterTab } from '../components/TabbedFilter';
import { CategoryFilter } from '../components/CategoryFilter';

export default function SubscriptionsScreen() {
  const navigation = useNavigation();
  const { subscriptions, isLoading, fetchSubscriptions } = useSubscriptionStore();
  
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubscriptionCategory | 'all'>('all');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleAddSubscription = () => {
    navigation.navigate(ROUTES.SUBSCRIPTION_FORM as never);
  };

  const handleSubscriptionPress = (id: string) => {
    // @ts-ignore
    navigation.navigate(ROUTES.SUBSCRIPTION_DETAIL, { id });
  };

  // Filter subscriptions based on active tab
  const getFilteredByStatus = (): Subscription[] => {
    switch (activeTab) {
      case 'active':
        return subscriptions.filter((sub) => sub.status === 'active');
      case 'trial':
        return subscriptions.filter((sub) => sub.isTrial);
      case 'cancelled':
        return subscriptions.filter((sub) => sub.status === 'cancelled');
      default:
        return subscriptions;
    }
  };

  // Apply search and category filters
  const filteredSubscriptions = getFilteredByStatus().filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate counts for each tab
  const counts = {
    all: subscriptions.length,
    active: subscriptions.filter((s) => s.status === 'active').length,
    trial: subscriptions.filter((s) => s.isTrial).length,
    cancelled: subscriptions.filter((s) => s.status === 'cancelled').length,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Subscriptions</Text>
          <Pressable
            style={styles.addButton}
            onPress={handleAddSubscription}
            accessibilityLabel="Add new subscription"
            accessibilityRole="button"
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </Pressable>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TabbedFilter
          value={activeTab}
          onChange={setActiveTab}
          counts={counts}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      {/* Subscriptions List */}
      {filteredSubscriptions.length === 0 ? (
        <EmptyState
          icon="📭"
          title={searchQuery || selectedCategory !== 'all' ? 'No matches found' : 'No subscriptions yet'}
          message={
            searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'Add your first subscription to start tracking'
          }
          actionLabel={searchQuery || selectedCategory !== 'all' ? undefined : 'Add Subscription'}
          onAction={searchQuery || selectedCategory !== 'all' ? undefined : handleAddSubscription}
        />
      ) : (
        <FlatList
          data={filteredSubscriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionCard
              subscription={item}
              onPress={() => handleSubscriptionPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchSubscriptions} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.card,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  addButtonText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  listContent: {
    padding: SPACING.md,
  },
});
