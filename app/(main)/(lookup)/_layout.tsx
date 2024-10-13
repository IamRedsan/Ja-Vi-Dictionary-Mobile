import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const LookupLayout: React.FC = () => {
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
        name='navigate/index'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <Stack.Screen
        name='typing/index'
        options={{
          title: 'Gõ chữ',
        }}
      />
      <Stack.Screen
        name='alphabet/index'
        options={{
          title: 'Bảng chữ cái',
        }}
      />
      <Stack.Screen
        name='dictionary/[id]'
        options={{
          title: 'Từ điển',
        }}
      />
      <Stack.Screen
        name='kanji'
        options={{
          title: 'Kanji',
        }}
      />
      <Stack.Screen
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

const colors = {
  light: {
    tintColor: '#343a40',
  },
  dark: {
    tintColor: '#ffbade',
  },
};
