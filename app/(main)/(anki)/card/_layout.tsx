import Stack from '@/components/Stack';
import { Stack as S } from 'expo-router';
import React from 'react';

const CardLayout: React.FC = () => {
  return (
    <Stack>
      <S.Screen
        name='index'
        options={{
          headerShown: false,
          headerBackground: undefined,
          animation: 'slide_from_right',
        }}
      />
      <S.Screen
        name='browse'
        options={{
          headerShown: false,
          headerBackground: undefined,
          animation: 'slide_from_right',
        }}
      />
      <S.Screen
        name='review-cards'
        options={{
          headerShown: false,
          headerBackground: undefined,
          animation: 'slide_from_right',
        }}
      />
      <S.Screen
        name='delete-card'
        options={{
          headerShown: false,
          headerBackground: undefined,
          animation: 'fade',
          presentation: 'transparentModal',
        }}
      />
      <S.Screen
        name='menu'
        options={{
          headerShown: false,
          headerBackground: undefined,
          animation: 'fade',
          presentation: 'transparentModal',
        }}
      />
    </Stack>
  );
};

export default CardLayout;
