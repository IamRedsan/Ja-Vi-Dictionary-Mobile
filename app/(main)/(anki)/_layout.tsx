import { Stack } from 'expo-router';
import React from 'react';

const DeckLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='card' options={{ animation: 'slide_from_right' }} />
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
      <Stack.Screen
        name='update-deck'
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name='create-deck'
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
    </Stack>
  );
};

export default DeckLayout;
