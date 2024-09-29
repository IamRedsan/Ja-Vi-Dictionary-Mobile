import { Stack } from 'expo-router';
import React from 'react';

const SettingLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profile' />
      <Stack.Screen name='setting' />
    </Stack>
  );
};

export default SettingLayout;
