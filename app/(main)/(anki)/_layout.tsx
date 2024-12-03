import { Stack } from 'expo-router';
import React from 'react';

const AnkiLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='decks' />
      <Stack.Screen name='review-cards' />
      <Stack.Screen
        name='deck-modal'
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
    </Stack>
  );
};

export default AnkiLayout;
