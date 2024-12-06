import { Stack } from 'expo-router';
import React from 'react';

const CardLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='review-cards' />
      <Stack.Screen name='delete-card' />
      <Stack.Screen name='update-card' />
      <Stack.Screen name='create-card' />
    </Stack>
  );
};

export default CardLayout;
