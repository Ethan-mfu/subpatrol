# SubPatrol - Subscription Tracker App

A React Native (Expo) mobile app built with TypeScript to help university students track their subscriptions and free trials, with reminders before renewals to avoid unwanted payments.

## 🎯 Features

### Core Screens
- **Login Screen** - Simple authentication flow with centered button
- **Dashboard** - Overview of subscriptions with stats and upcoming renewals
- **Subscriptions List** - Comprehensive list with advanced filtering
- **Subscription Detail** - Detailed view of individual subscriptions
- **Add/Edit Form** - Complex form for managing subscriptions
- **Insights** - Analytics and spending breakdown
- **Settings** - User preferences management

### Key Capabilities
✅ **State Management** - Zustand for global state  
✅ **TypeScript** - Full type safety throughout the app  
✅ **Mock Data** - 7 sample subscriptions for prototype  
✅ **Advanced Filtering** - Filter by status, category, and search  
✅ **Complex Form** - Multi-field form with date pickers, switches, and validation  
✅ **Responsive UI** - Optimized for mobile with 16px spacing  
✅ **Accessibility** - Labels on all interactive elements  
✅ **Feature-based Architecture** - Organized by feature modules  

## 🏗️ Architecture

```
src/
├── components/           # Shared UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── EmptyState.tsx
│   └── SubscriptionCard.tsx
├── core/
│   ├── constants.ts      # App constants (colors, spacing, etc.)
│   ├── routes.ts         # Navigation route names
│   └── utils/
│       └── subscriptionUtils.ts
├── features/             # Feature-based modules
│   ├── auth/screens/
│   ├── dashboard/screens/
│   ├── subscriptions/screens/
│   ├── insights/screens/
│   └── settings/screens/
├── models/
│   ├── subscription.ts   # Subscription data model
│   └── user.ts          # User preferences model
├── navigation/
│   └── AppNavigator.tsx  # Navigation setup
├── services/
│   ├── api.ts           # API service (mock for now)
│   └── storage.ts       # Storage service with mock data
└── store/
    └── subscriptionStore.ts  # Zustand store
```

## 📊 Data Models

### Subscription
```typescript
{
  id: string;
  name: string;
  category: 'streaming' | 'music' | 'productivity' | 'fitness' | 'gaming' | 'education' | 'cloud' | 'other';
  price: number;
  currency: string;
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextBillingDate: string;
  isTrial: boolean;
  trialEndsDate?: string;
  status: 'active' | 'trial' | 'cancelled' | 'expired';
  reminderDaysBefore: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  iconColor?: string;
}
```

### User Preferences
```typescript
{
  currency: string;              // Default: 'THB'
  timezone: string;              // Default: 'Asia/Bangkok'
  notificationsEnabled: boolean; // Default: true
  defaultReminderDaysBefore: number; // Default: 3
}
```

## 🎨 Design System

### Colors
- **Primary**: `#007AFF` (iOS blue)
- **Secondary**: `#5856D6` (Purple)
- **Success**: `#34C759` (Green)
- **Warning**: `#FF9500` (Orange)
- **Error**: `#FF3B30` (Red)

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px ⭐ (Primary spacing)
- **lg**: 24px
- **xl**: 32px

### Typography
- **xxxl**: 32px (Screen titles)
- **xxl**: 28px (Section headers)
- **xl**: 24px (Large text)
- **lg**: 18px (Subheadings)
- **md**: 16px (Body text)
- **sm**: 14px (Small text)
- **xs**: 12px (Captions)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on a platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

## 📱 Screen Details

### 1. Dashboard Screen
- **Stats Cards**: Active subscriptions count, monthly spending
- **Alert Banner**: Shows subscriptions renewing soon
- **Next Renewals**: Top 3 upcoming subscriptions
- **Quick Stats**: Active, trials, cancelled counts

### 2. Subscriptions Screen (Complex Component)
**Filtering Capabilities:**
- **Tabs**: All, Active, Trial, Cancelled
- **Search**: Real-time text search
- **Categories**: 8 category chips with icons
- **Empty States**: Shows helpful messages

### 3. Subscription Form Screen (Complex Component)
**Form Sections:**
- **Basic Info**: Name, Category (8 options with icons)
- **Pricing**: Price, Currency (4 options), Billing Cycle (4 options)
- **Billing Dates**: Next billing date picker, Trial toggle with date picker
- **Reminder**: Reminder days selector (1, 3, 7, 14 days)
- **Status**: Active, Cancelled, Expired
- **Notes**: Multi-line text input
- **Validation**: Required fields checked before save

### 4. Subscription Detail Screen
- **Header Card**: Large icon, name, category, trial badge
- **Urgent Banner**: Shows when renewal is within reminder window
- **Pricing Info**: Amount, cycle, monthly equivalent
- **Billing Info**: Next date, days until, reminder settings
- **Actions**: Edit button, Delete button with confirmation

### 5. Insights Screen
- **Monthly Spending**: Large hero card with yearly projection
- **Category Breakdown**: List with color dots and amounts
- **Billing Cycle Distribution**: Count by cycle type
- **Quick Stats Grid**: 4 stat cards

### 6. Settings Screen
- **Notifications**: Toggle switch, Reminder day selector
- **Currency**: Selectable list with checkmarks (THB, USD, EUR, GBP)
- **Regional**: Timezone display
- **About**: Version, app name, purpose
- **Info Card**: Tips for users

## 🔧 Technical Implementation

### State Management (Zustand)
```typescript
const { subscriptions, isLoading, fetchSubscriptions, addSubscription } = 
  useSubscriptionStore();
```

**Store Methods:**
- `fetchSubscriptions()` - Load all subscriptions
- `addSubscription(data)` - Create new subscription
- `updateSubscription(id, data)` - Update existing
- `deleteSubscription(id)` - Remove subscription
- `updateUserPreferences(prefs)` - Update settings

### Navigation
```typescript
// Bottom Tabs
- Dashboard
- Subscriptions (Stack: List → Detail → Form)
- Insights
- Settings

// Authentication Flow
Login → Main Tabs
```

### Utility Functions
- `formatCurrency(amount, code)` - Format with symbol
- `formatDate(dateString)` - Pretty date formatting
- `daysUntilBilling(date)` - Calculate days remaining
- `getRelativeTimeString(days)` - "in 3 days", "tomorrow"
- `calculateMonthlyTotal(subs, currency)` - Total spending
- `getCategoryColor(category)` - Category color mapping

## 📦 Dependencies

```json
{
  "expo": "~54.0.0",
  "react": "18.x",
  "react-native": "0.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "@react-native-community/datetimepicker": "^x.x",
  "zustand": "^4.x",
  "react-native-screens": "~x.x",
  "react-native-safe-area-context": "~x.x"
}
```

## 🎯 Accessibility Features

- All `Pressable` components have `accessibilityLabel`
- Proper `accessibilityRole` attributes
- Readable font sizes (minimum 12px)
- High contrast colors
- Touch targets minimum 44x44 points

## 🔮 Future Enhancements

- [ ] Connect to REST backend API
- [ ] Implement push notifications
- [ ] Add data export (CSV/PDF)
- [ ] Charts and graphs for insights
- [ ] Multi-currency conversion
- [ ] Recurring reminders
- [ ] Biometric authentication
- [ ] Dark mode support
- [ ] Offline support with sync
- [ ] Share subscriptions with family

## 📝 Notes

- **Week 4 Implementation**: Uses mock data and local storage
- **Production Ready**: Replace `apiService` with actual REST calls
- **Type Safe**: Full TypeScript coverage
- **Performance**: Optimized with useMemo for calculations
- **UX**: Pull-to-refresh on all lists
- **Validation**: Form validation before submission

## 👤 Author

Name: Than Htike Zaw
Std_id: 6731503086

---

**SubPatrol** - Never miss a subscription renewal again! 🎯
