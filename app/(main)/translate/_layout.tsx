import Stack from '@/components/Stack';
import { Stack as S } from 'expo-router';
import React from 'react';

const TranslateLayout: React.FC = () => {
  return (
    <Stack>
      <S.Screen
        name='index'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <S.Screen name='from-image' options={{ title: 'Dịch từ ảnh' }} />
    </Stack>
  );
};

export default TranslateLayout;
