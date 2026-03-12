import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { ROUTES } from '../core/routes';

// Onboarding Screens
import LandingScreen from '../features/onboarding/screens/LandingScreen';

// Dashboard Screens
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';

// Subscription Screens
import SubscriptionsScreen from '../features/subscriptions/screens/SubscriptionsScreen';
import SubscriptionDetailScreen from '../features/subscriptions/screens/SubscriptionDetailScreen';
import SubscriptionFormScreen from '../features/subscriptions/screens/SubscriptionFormScreen';

// Insights Screens
import InsightsScreen from '../features/insights/screens/InsightsScreen';

// Settings Screens
import SettingsScreen from '../features/settings/screens/SettingsScreen';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SubscriptionsStack = createNativeStackNavigator();

// Subscriptions Stack Navigator
function SubscriptionsNavigator() {
  return (
    <SubscriptionsStack.Navigator screenOptions={{ headerShown: false }}>
      <SubscriptionsStack.Screen
        name={ROUTES.SUBSCRIPTIONS_LIST}
        component={SubscriptionsScreen}
      />
      <SubscriptionsStack.Screen
        name={ROUTES.SUBSCRIPTION_DETAIL}
        component={SubscriptionDetailScreen}
      />
      <SubscriptionsStack.Screen
        name={ROUTES.SUBSCRIPTION_FORM}
        component={SubscriptionFormScreen}
      />
    </SubscriptionsStack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999999',
      }}
    >
      <Tab.Screen
        name={ROUTES.DASHBOARD_TAB}
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 1.2 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SUBSCRIPTIONS_TAB}
        component={SubscriptionsNavigator}
        options={{
          title: 'Subscriptions',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 1.2 }}>💳</Text>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.INSIGHTS_TAB}
        component={InsightsScreen}
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 1.2 }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_TAB}
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 1.2 }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  const [hasSeenLanding, setHasSeenLanding] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSeenLanding ? (
          <RootStack.Screen name={ROUTES.LANDING}>
            {(props) => (
              <LandingScreen 
                {...props} 
                onGetStarted={() => setHasSeenLanding(true)} 
              />
            )}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
