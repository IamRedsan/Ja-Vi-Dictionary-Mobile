import { Stack } from 'expo-router';
import React from 'react';

const DeckLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='(card)' />
      <Stack.Screen
        name='deck-modal'
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name='delete-deck'
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen name='update-deck' />
      <Stack.Screen name='create-deck' />
    </Stack>
  );
};

export default DeckLayout;
