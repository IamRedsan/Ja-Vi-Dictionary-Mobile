import Stack from '@/components/Stack';
import { Stack as S } from 'expo-router';
import React from 'react';

const SettingLayout: React.FC = () => {
  return (
    <Stack>
      <S.Screen
        name='index'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <S.Screen
        name='profile'
        options={{
          title: 'Thông tin cá nhân',
        }}
      />
      <S.Screen
        name='password'
        options={{
          title: 'Đổi mật khẩu',
        }}
      />
      <S.Screen
        name='theme'
        options={{
          title: 'Màu sắc',
        }}
      />
      <S.Screen
        name='logout'
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          headerBackground: undefined,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack>
  );
};

export default SettingLayout;
