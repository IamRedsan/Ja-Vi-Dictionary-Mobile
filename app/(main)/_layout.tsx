import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const MainLayout: React.FC = () => {
  return (
    <SafeAreaView className='flex-1'>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} initialRouteName='(lookup)'>
        <Tabs.Screen
          name='(lookup)'
          options={{
            title: 'Tra cứu',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='cog' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='translate'
          options={{
            title: 'Dịch',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='cog' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='(anki)'
          options={{
            title: 'Học',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='cog' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='setting'
          options={{
            title: 'Cài đặt',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='cog' color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default MainLayout;
