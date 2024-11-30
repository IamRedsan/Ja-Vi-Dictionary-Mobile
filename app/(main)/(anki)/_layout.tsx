import { Stack } from 'expo-router';
import React from 'react';

const AnkiLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='decks' />
      <Stack.Screen name='review-cards' />
    </Stack>
  );
};

export default AnkiLayout;
