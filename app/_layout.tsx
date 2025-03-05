import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="intro" options={{ title: 'Onboarding intro' }} />
      <Stack.Screen name="onboarding" options={{ title: 'Onboarding' }} />
    </Stack>
  );
}
