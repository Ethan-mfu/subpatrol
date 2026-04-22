import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
  onSignup: () => void;
  onContinueAsGuest: () => void;
  loading?: boolean;
  error?: string | null;
}

export default function LoginScreen({
  onLogin,
  onForgotPassword,
  onSignup,
  onContinueAsGuest,
  loading = false,
  error,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    setLocalError(null);
    setSuccessMessage(null);
    await onLogin(trimmedEmail, password);
  };

  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setLocalError('Please enter your email address first.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    setLocalError(null);
    setSuccessMessage(null);

    try {
      await onForgotPassword(trimmedEmail);
      setSuccessMessage('Password reset email sent. Check your inbox.');
    } catch {
      // Parent store error will be shown below.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SubPatrol</Text>
      <Text style={styles.subtitle}>Track your subscriptions</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          if (localError) setLocalError(null);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          if (localError) setLocalError(null);
        }}
      />

      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}
      {!localError && error ? <Text style={styles.errorText}>{error}</Text> : null}
      {!localError && !error && successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.textButton} onPress={handleForgotPassword} disabled={loading}>
        <Text style={styles.textButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onSignup} disabled={loading}>
        <Text style={styles.secondaryButtonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textButton} onPress={onContinueAsGuest} disabled={loading}>
        <Text style={styles.textButtonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 12,
    maxWidth: 320,
    textAlign: 'center',
  },
  successText: {
    color: '#34C759',
    marginBottom: 12,
    maxWidth: 320,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 220,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textButton: {
    marginTop: 4,
    marginBottom: 12,
  },
  textButtonText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
