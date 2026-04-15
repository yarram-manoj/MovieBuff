import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { i18n, COLORS, SPACING, TYPOGRAPHY, APP_CONSTANTS } from '@repo/ui';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate to home after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)/');
    }, APP_CONSTANTS.SPLASH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🎬</Text>
        <Text style={styles.title}>{i18n.app.title}</Text>
        <Text style={styles.subtitle}>{i18n.app.subtitle}</Text>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.TEXT_LIGHT} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.XL,
  },
  logo: {
    fontSize: 80,
    marginBottom: SPACING.MD,
  },
  title: {
    fontSize: TYPOGRAPHY.FONT_SIZE['4XL'],
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD as '700',
    color: COLORS.TEXT_LIGHT,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM as '500',
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
    maxWidth: 250,
  },
  loaderContainer: {
    marginTop: SPACING.LG,
  },
});

export default SplashScreen;
