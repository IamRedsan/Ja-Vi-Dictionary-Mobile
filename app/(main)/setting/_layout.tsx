import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SettingLayout: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const chosenColors = colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        headerBackground: () => {
          return <View className='bg-primary-foreground flex-1' />;
        },
        headerTintColor: chosenColors.tintColor,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name='index'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <Stack.Screen
        name='profile'
        options={{
          title: 'Thông tin cá nhân',
        }}
      />
      <Stack.Screen
        name='password'
        options={{
          title: 'Đổi mật khẩu',
        }}
      />
      <Stack.Screen
        name='theme'
        options={{
          title: 'Màu sắc',
        }}
      />
    </Stack>
  );
};

export default SettingLayout;

const colors = {
  light: {
    tintColor: '#343a40',
  },
  dark: {
    tintColor: '#ffbade',
  },
};
