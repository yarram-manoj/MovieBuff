import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@repo/store';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY } from '@repo/ui';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: COLORS.TEXT_LIGHT,
          headerTitleStyle: {
            fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD as '600',
            fontSize: TYPOGRAPHY.FONT_SIZE.XL,
          },
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name="splash"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            title: 'Movie Details',
            presentation: 'modal',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </Provider>
  );
}
