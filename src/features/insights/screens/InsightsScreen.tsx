import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function InsightsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>Your spending analytics</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Spending Trend</Text>
          <Text style={styles.cardSubtext}>No data available yet</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Category Breakdown</Text>
          <Text style={styles.cardSubtext}>Add subscriptions to see insights</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardSubtext: {
    fontSize: 14,
    color: '#999',
  },
});
