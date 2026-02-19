import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from '../core/routes';

// Auth Screens
import LoginScreen from '../features/auth/screens/LoginScreen';

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
    <SubscriptionsStack.Navigator>
      <SubscriptionsStack.Screen
        name={ROUTES.SUBSCRIPTIONS_LIST}
        component={SubscriptionsScreen}
        options={{ title: 'Subscriptions' }}
      />
      <SubscriptionsStack.Screen
        name={ROUTES.SUBSCRIPTION_DETAIL}
        component={SubscriptionDetailScreen}
        options={{ title: 'Subscription Detail' }}
      />
      <SubscriptionsStack.Screen
        name={ROUTES.SUBSCRIPTION_FORM}
        component={SubscriptionFormScreen}
        options={{ title: 'Add/Edit Subscription' }}
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
      }}
    >
      <Tab.Screen
        name={ROUTES.DASHBOARD_TAB}
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name={ROUTES.SUBSCRIPTIONS_TAB}
        component={SubscriptionsNavigator}
        options={{ title: 'Subscriptions' }}
      />
      <Tab.Screen
        name={ROUTES.INSIGHTS_TAB}
        component={InsightsScreen}
        options={{ title: 'Insights' }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_TAB}
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name={ROUTES.LOGIN}>
            {(props) => (
              <LoginScreen {...props} onLogin={() => setIsAuthenticated(true)} />
            )}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
