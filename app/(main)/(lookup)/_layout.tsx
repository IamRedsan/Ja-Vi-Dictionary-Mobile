import Stack from '@/components/Stack';
import { Stack as S } from 'expo-router';
import React from 'react';

const LookupLayout: React.FC = () => {
  return (
    <Stack>
      <S.Screen
        name='navigate/index'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <S.Screen
        name='typing/index'
        options={{
          title: 'Gõ chữ',
        }}
      />
      <S.Screen
        name='alphabet/index'
        options={{
          title: 'Bảng chữ cái',
        }}
      />
      <S.Screen
        name='dictionary/[id]'
        options={{
          title: 'Từ điển',
        }}
      />
      <S.Screen
        name='kanji'
        options={{
          title: 'Kanji',
        }}
      />
      <S.Screen
        name='search/index'
        options={{
          animation: 'none',
          headerBackground: undefined,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LookupLayout;
