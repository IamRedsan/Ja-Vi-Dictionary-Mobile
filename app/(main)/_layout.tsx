import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import React from 'react';
import { useColorScheme } from 'nativewind';

const MainLayout: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const chosenColors = colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: chosenColors.background,
          borderColor: chosenColors.background,
        },
        headerShown: false,
      }}
      initialRouteName='(lookup)'
    >
      <Tabs.Screen
        name='(lookup)'
        options={{
          title: 'Tra cứu',
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome
              name='search'
              size={size}
              color={
                focused ? chosenColors.iconActive : chosenColors.iconInactive
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name='translate'
        options={{
          title: 'Dịch',
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome
              name='language'
              size={size}
              color={
                focused ? chosenColors.iconActive : chosenColors.iconInactive
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(anki)'
        options={{
          title: 'Học',
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name='card-multiple-outline'
              size={size}
              color={
                focused ? chosenColors.iconActive : chosenColors.iconInactive
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name='settings'
              size={size}
              color={
                focused ? chosenColors.iconActive : chosenColors.iconInactive
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;

const colors = {
  light: {
    background: '#ffffff',
    iconActive: '#24b6b7',
    iconInactive: '#92dbdb',
  },
  dark: {
    background: '#201f31',
    iconActive: '#ffbade',
    iconInactive: '#805d6f',
  },
};
