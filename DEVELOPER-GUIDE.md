# SubPatrol - Developer Quick Reference

## 📁 File Structure Quick Reference

```
src/
├── components/              # Shared Components
│   ├── Button.tsx          # Reusable button with 4 variants
│   ├── Card.tsx            # Container with shadow
│   ├── EmptyState.tsx      # Empty view component
│   └── SubscriptionCard.tsx # Subscription list item
│
├── core/
│   ├── constants.ts        # COLORS, SPACING, FONT_SIZES, etc.
│   ├── routes.ts           # ROUTES.DASHBOARD, etc.
│   └── utils/
│       └── subscriptionUtils.ts # Helper functions
│
├── features/
│   ├── auth/screens/
│   │   └── LoginScreen.tsx
│   ├── dashboard/screens/
│   │   └── DashboardScreen.tsx
│   ├── subscriptions/screens/
│   │   ├── SubscriptionsScreen.tsx      # List with filters
│   │   ├── SubscriptionDetailScreen.tsx # Detail view
│   │   └── SubscriptionFormScreen.tsx   # Add/Edit form
│   ├── insights/screens/
│   │   └── InsightsScreen.tsx
│   └── settings/screens/
│       └── SettingsScreen.tsx
│
├── models/
│   ├── subscription.ts     # Subscription interface & types
│   └── user.ts            # UserPreferences interface
│
├── navigation/
│   └── AppNavigator.tsx    # Navigation setup
│
├── services/
│   ├── api.ts             # API calls (mock)
│   └── storage.ts         # Mock data storage
│
└── store/
    └── subscriptionStore.ts # Zustand global state
```

---

## 🎯 Common Tasks

### Add a new screen

1. Create screen file: `src/features/[feature]/screens/[Name]Screen.tsx`
2. Add route to `src/core/routes.ts`:
   ```typescript
   export const ROUTES = {
     // ...
     NEW_SCREEN: 'NewScreen',
   };
   ```
3. Add to navigation in `src/navigation/AppNavigator.tsx`

### Use global state

```typescript
import { useSubscriptionStore } from '../../../store/subscriptionStore';

// In component
const { subscriptions, fetchSubscriptions, addSubscription } = useSubscriptionStore();
const userPreferences = useSubscriptionStore((state) => state.userPreferences);
```

### Format currency

```typescript
import { formatCurrency } from '../core/utils/subscriptionUtils';

formatCurrency(419, 'THB') // ฿419.00
```

### Navigate to another screen

```typescript
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../core/routes';

const navigation = useNavigation();

// Simple navigation
navigation.navigate(ROUTES.DASHBOARD as never);

// With params
// @ts-ignore
navigation.navigate(ROUTES.SUBSCRIPTION_DETAIL, { id: '123' });
```

### Use design system values

```typescript
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../core/constants';

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,          // 16
    backgroundColor: COLORS.card, // #FFFFFF
  },
  title: {
    fontSize: FONT_SIZES.xl,      // 24
    color: COLORS.text,           // #333333
  },
  button: {
    borderRadius: BORDER_RADIUS.md, // 8
  },
});
```

### Create a reusable component

```typescript
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';

<Card style={styles.myCard}>
  <Button
    title="Save"
    onPress={handleSave}
    variant="primary"
    size="large"
    accessibilityLabel="Save subscription"
  />
</Card>
```

---

## 🔧 Utility Functions Reference

```typescript
import {
  formatCurrency,           // formatCurrency(419, 'THB') → '฿419.00'
  formatDate,              // formatDate('2026-03-01') → '1 Mar 2026'
  daysUntilBilling,       // daysUntilBilling('2026-03-01') → 10
  getRelativeTimeString,  // getRelativeTimeString(3) → 'In 3 days'
  getMonthlyEquivalent,   // getMonthlyEquivalent(99, 'yearly') → 8.25
  calculateMonthlyTotal,  // Total monthly spending
  getCategoryColor,       // getCategoryColor('streaming') → '#E50914'
  getCategoryIcon,        // getCategoryIcon('music') → '🎵'
  needsReminder,          // Returns true if within reminder window
  sortByNextBilling,      // Sort subs by date
} from '../core/utils/subscriptionUtils';
```

---

## 🎨 Design Tokens

### Colors
```typescript
COLORS.primary      // #007AFF - Main brand color
COLORS.secondary    // #5856D6 - Secondary actions
COLORS.success      // #34C759 - Success states
COLORS.warning      // #FF9500 - Warnings/alerts
COLORS.error        // #FF3B30 - Errors/delete
COLORS.background   // #F5F5F5 - Screen background
COLORS.card         // #FFFFFF - Card background
COLORS.text         // #333333 - Primary text
COLORS.textSecondary // #666666 - Secondary text
COLORS.textTertiary // #999999 - Tertiary text
COLORS.border       // #E0E0E0 - Borders
COLORS.divider      // #EEEEEE - Divider lines
```

### Spacing
```typescript
SPACING.xs  // 4
SPACING.sm  // 8
SPACING.md  // 16 ⭐ PRIMARY
SPACING.lg  // 24
SPACING.xl  // 32
```

### Font Sizes
```typescript
FONT_SIZES.xs    // 12 - Captions
FONT_SIZES.sm    // 14 - Small text
FONT_SIZES.md    // 16 - Body text ⭐
FONT_SIZES.lg    // 18 - Subheadings
FONT_SIZES.xl    // 24 - Large text
FONT_SIZES.xxl   // 28 - Section headers
FONT_SIZES.xxxl  // 32 - Screen titles
```

### Border Radius
```typescript
BORDER_RADIUS.sm  // 4
BORDER_RADIUS.md  // 8 ⭐ PRIMARY
BORDER_RADIUS.lg  // 12
BORDER_RADIUS.xl  // 16
```

---

## 🗂️ Constants Arrays

### Categories
```typescript
CATEGORIES = [
  { value: 'streaming', label: 'Streaming', icon: '🎬' },
  { value: 'music', label: 'Music', icon: '🎵' },
  // ... 8 total
]
```

### Billing Cycles
```typescript
BILLING_CYCLES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]
```

### Currencies
```typescript
CURRENCIES = [
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
]
```

### Reminder Options
```typescript
REMINDER_OPTIONS = [
  { value: 1, label: '1 day before' },
  { value: 3, label: '3 days before' },
  { value: 7, label: '1 week before' },
  { value: 14, label: '2 weeks before' },
]
```

---

## 📡 API Service

All CRUD operations:

```typescript
import { apiService } from '../services/api';

// Fetch all subscriptions
const subscriptions = await apiService.fetchSubscriptions();

// Get one subscription
const subscription = await apiService.fetchSubscriptionById('123');

// Create new subscription
const newSub = await apiService.createSubscription({
  name: 'Netflix',
  category: 'streaming',
  price: 419,
  // ... other fields
});

// Update subscription
const updated = await apiService.updateSubscription('123', {
  price: 449,
});

// Delete subscription
const success = await apiService.deleteSubscription('123');
```

---

## 🏪 Store Actions

```typescript
import { useSubscriptionStore } from '../store/subscriptionStore';

const {
  // State
  subscriptions,
  isLoading,
  error,
  userPreferences,
  
  // Actions
  fetchSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  updateUserPreferences,
} = useSubscriptionStore();

// Or select specific state
const currency = useSubscriptionStore((state) => state.userPreferences.currency);
```

---

## 🎭 TypeScript Types

### Import types
```typescript
import type {
  Subscription,
  SubscriptionCategory,
  SubscriptionStatus,
  BillingCycle,
  SubscriptionFormData,
} from '../models/subscription';

import type { UserPreferences } from '../models/user';
```

### Type guards
```typescript
const isActive = (sub: Subscription): boolean => {
  return sub.status === 'active' || sub.status === 'trial';
};
```

---

## 🧪 Mock Data

7 pre-loaded subscriptions in `src/services/storage.ts`:
- Netflix (₿419/month)
- Spotify (₿129/month, trial)
- ChatGPT Plus ($20/month)
- Adobe Creative Cloud (₿1,899/month)
- YouTube Premium (₿159/month)
- GitHub Pro ($4/month)
- Notion ($10/month)

---

## ⚡ Performance Tips

1. **Use useMemo for calculations**
   ```typescript
   const monthlyTotal = useMemo(() => 
     calculateMonthlyTotal(subscriptions, currency),
     [subscriptions, currency]
   );
   ```

2. **FlatList for long lists**
   ```typescript
   <FlatList
     data={subscriptions}
     keyExtractor={(item) => item.id}
     renderItem={({ item }) => <SubscriptionCard subscription={item} />}
   />
   ```

3. **Avoid inline functions in renders**
   ```typescript
   // ❌ Bad
   onPress={() => deleteItem(id)}
   
   // ✅ Good
   const handleDelete = () => deleteItem(id);
   onPress={handleDelete}
   ```

---

## 🐛 Common Issues & Solutions

### Navigation type errors
```typescript
// Add @ts-ignore above navigate calls
// @ts-ignore
navigation.navigate(ROUTES.DETAIL, { id: '123' });
```

### Date picker not showing
```typescript
// Make sure you installed it:
npx expo install @react-native-community/datetimepicker
```

### State not updating
```typescript
// Make sure you're calling the action:
await fetchSubscriptions(); // ✅
// Not just reading: subscriptions ❌
```

---

## 📱 Testing in App

1. **Start app**: `npm start`
2. **Login**: Tap "Continue" button
3. **Dashboard**: See 7 subscriptions loaded
4. **Filter**: Try tabs and search
5. **Add**: Tap "+ Add" and fill form
6. **Edit**: Tap subscription → Edit
7. **Settings**: Change currency, see updates

---

## 🚀 Next Steps for Production

1. Replace `apiService` with real REST API
2. Add authentication (JWT tokens)
3. Implement push notifications
4. Add data persistence (AsyncStorage/SecureStore)
5. Add error boundaries
6. Add analytics tracking
7. Add unit tests
8. Add E2E tests
9. Optimize images
10. Add offline support

---

**Happy Coding!** 🎉
