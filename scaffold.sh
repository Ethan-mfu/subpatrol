#!/bin/bash

# Create main directories
mkdir -p src/core
mkdir -p src/features
mkdir -p src/services
mkdir -p src/models
mkdir -p src/navigation

# Create feature folders with subdirectories
mkdir -p src/features/auth/{screens,components,hooks}
mkdir -p src/features/dashboard/{screens,components,hooks}
mkdir -p src/features/subscriptions/{screens,components,hooks}
mkdir -p src/features/insights/{screens,components,hooks}
mkdir -p src/features/settings/{screens,components,hooks}

# Create placeholder screen files
touch src/features/auth/screens/LoginScreen.tsx
touch src/features/dashboard/screens/DashboardScreen.tsx
touch src/features/subscriptions/screens/SubscriptionsScreen.tsx
touch src/features/subscriptions/screens/SubscriptionDetailScreen.tsx
touch src/features/subscriptions/screens/SubscriptionFormScreen.tsx
touch src/features/insights/screens/InsightsScreen.tsx
touch src/features/settings/screens/SettingsScreen.tsx

# Create navigation file
touch src/navigation/AppNavigator.tsx

# Create core files
touch src/core/routes.ts
touch src/core/constants.ts

# Create model files
touch src/models/subscription.ts
touch src/models/user.ts

# Create service files
touch src/services/storage.ts
touch src/services/api.ts

echo "✅ SubPatrol project structure created successfully!"
