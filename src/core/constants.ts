export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#E0E0E0',
  divider: '#EEEEEE',
  
  // Category colors
  streaming: '#E50914',
  music: '#1DB954',
  productivity: '#0078D4',
  fitness: '#FF6B35',
  gaming: '#9146FF',
  education: '#4CAF50',
  cloud: '#4285F4',
  other: '#757575',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const CURRENCIES = [
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

export const BILLING_CYCLES = [
  { value: 'daily' as const, label: 'Daily' },
  { value: 'weekly' as const, label: 'Weekly' },
  { value: 'monthly' as const, label: 'Monthly' },
  { value: 'yearly' as const, label: 'Yearly' },
];

export const CATEGORIES = [
  { value: 'streaming' as const, label: 'Streaming', icon: '🎬' },
  { value: 'music' as const, label: 'Music', icon: '🎵' },
  { value: 'productivity' as const, label: 'Productivity', icon: '💼' },
  { value: 'fitness' as const, label: 'Fitness', icon: '💪' },
  { value: 'gaming' as const, label: 'Gaming', icon: '🎮' },
  { value: 'education' as const, label: 'Education', icon: '📚' },
  { value: 'cloud' as const, label: 'Cloud Storage', icon: '☁️' },
  { value: 'other' as const, label: 'Other', icon: '📱' },
];

export const REMINDER_OPTIONS = [
  { value: 1, label: '1 day before' },
  { value: 3, label: '3 days before' },
  { value: 7, label: '1 week before' },
  { value: 14, label: '2 weeks before' },
];
