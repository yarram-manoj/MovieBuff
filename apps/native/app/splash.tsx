import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { i18n } from '@repo/ui';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate to home after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)/');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🎬</Text>
        <Text style={styles.title}>{i18n.app.title}</Text>
        <Text style={styles.subtitle}>{i18n.app.subtitle}</Text>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  logo: {
    fontSize: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    maxWidth: 250,
  },
  loaderContainer: {
    marginTop: 16,
  },
});

export default SplashScreen;
