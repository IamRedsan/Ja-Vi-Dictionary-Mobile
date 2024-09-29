import { Stack } from 'expo-router';
import React from 'react';

const LookupLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='decks' />
      <Stack.Screen name='add' />
      <Stack.Screen name='browse' />
      <Stack.Screen name='statics' />
      <Stack.Screen name='import' />
    </Stack>
  );
};

export default LookupLayout;
