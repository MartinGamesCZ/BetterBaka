import { Stack } from "expo-router";
import { createTamagui, TamaguiProvider } from "tamagui";
import defaultConfig from "@tamagui/config/v3";
import * as themes from "../themes/main";
import { StatusBar } from "react-native";

const config = createTamagui({
  ...defaultConfig,
  themes,
});

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
      </Stack>
    </TamaguiProvider>
  );
}
