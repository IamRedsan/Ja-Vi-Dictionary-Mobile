import { Stack } from 'expo-router';
import React from 'react';

const TranslateLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='translate' />
    </Stack>
  );
};

export default TranslateLayout;
