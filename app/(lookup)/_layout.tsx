import { Stack } from 'expo-router';
import React from 'react';

const LookupLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='alphabet' />
      <Stack.Screen name='dictionary' />
      <Stack.Screen name='kanji' />
    </Stack>
  );
};

export default LookupLayout;
