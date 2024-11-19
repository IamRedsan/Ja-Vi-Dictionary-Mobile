import Stack from '@/components/Stack';
import { Stack as S } from 'expo-router';
import React from 'react';

const DictionaryLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <S.Screen name='index' options={{ title: 'Danh sách hán tự' }} />
      <S.Screen
        name='kanji/[id]'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <S.Screen
        name='word/[id]'
        options={{ headerShown: false, headerBackground: undefined }}
      />
    </Stack>
  );
};

export default DictionaryLayout;
