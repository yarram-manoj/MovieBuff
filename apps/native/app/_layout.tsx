import React from "react";
import { Provider } from "react-redux";
import { store } from "@repo/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#667eea",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
          },
          headerBackTitle: "Back",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            title: "Movie Details",
            presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </Provider>
  );
}
