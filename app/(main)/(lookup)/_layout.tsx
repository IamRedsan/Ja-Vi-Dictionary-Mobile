import { Stack } from 'expo-router';
import React from 'react';

const LookupLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="navigate/index" />
      <Stack.Screen name="typing/index" />
      <Stack.Screen name="alphabet/index" />
      <Stack.Screen name="dictionary/[id]" />
      <Stack.Screen name="kanji" />
    </Stack>
  );
};

export default LookupLayout;
