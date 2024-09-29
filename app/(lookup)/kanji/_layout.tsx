import { Stack } from 'expo-router';
import React from 'react';

const KanjiLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='[id]' />
    </Stack>
  );
};

export default KanjiLayout;
