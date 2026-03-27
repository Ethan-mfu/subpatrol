import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, ActivityIndicator } from 'react-native';

import { ROUTES } from '../core/routes';

// Onboarding Screens
import LandingScreen from '../features/onboarding/screens/LandingScreen';

// Auth Screens
import LoginScreen from '../features/auth/screens/LoginScreen';
import SignupScreen from '../features/auth/screens/SignupScreen';

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
import { useAuthStore } from '../store/authStore';

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
function MainTabs({ onLogout }: { onLogout: () => void }) {
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
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 1.2 }}>⚙️</Text>
          ),
        }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');
  const {
    hasSeenLanding,
    setHasSeenLanding,
    mode,
    loading,
    initialized,
    error,
    clearError,
    initializeAuth,
    signIn,
    signUp,
    continueAsGuest,
    logout,
  } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => {
      unsubscribe();
    };
  }, [initializeAuth]);

  if (!initialized) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const renderCurrentStage = () => {
    if (!hasSeenLanding) {
      return (
        <RootStack.Screen name={ROUTES.LANDING}>
          {(props) => (
            <LandingScreen
              {...props}
              onGetStarted={() => {
                setHasSeenLanding(true);
                setAuthScreen('login');
              }}
            />
          )}
        </RootStack.Screen>
      );
    }

    if (mode === 'unauthenticated' && authScreen === 'login') {
      return (
        <RootStack.Screen name={ROUTES.LOGIN}>
          {(props) => (
            <LoginScreen
              {...props}
              loading={loading}
              error={error}
              onLogin={async (email, password) => {
                clearError();
                await signIn(email, password);
              }}
              onSignup={() => {
                clearError();
                setAuthScreen('signup');
              }}
              onContinueAsGuest={() => {
                clearError();
                continueAsGuest();
              }}
            />
          )}
        </RootStack.Screen>
      );
    }

    if (mode === 'unauthenticated' && authScreen === 'signup') {
      return (
        <RootStack.Screen name={ROUTES.SIGNUP}>
          {(props) => (
            <SignupScreen
              {...props}
              loading={loading}
              error={error}
              onSignupComplete={async (email, password) => {
                clearError();
                await signUp(email, password);
              }}
              onBackToLogin={() => {
                clearError();
                setAuthScreen('login');
              }}
              onContinueAsGuest={() => {
                clearError();
                continueAsGuest();
              }}
            />
          )}
        </RootStack.Screen>
      );
    }

    return (
      <RootStack.Screen name={ROUTES.MAIN_TABS}>
        {() => (
          <MainTabs
            onLogout={async () => {
              await logout();
              setAuthScreen('login');
            }}
          />
        )}
      </RootStack.Screen>
    );
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {renderCurrentStage()}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
