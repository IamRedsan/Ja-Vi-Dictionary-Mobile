import { Stack as S } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

const Stack: React.FC<React.ComponentProps<typeof S>> = ({
  children,
  ...rest
}) => {
  const { colorScheme } = useColorScheme();
  const chosenColors = colors[colorScheme ?? 'light'];

  return (
    <S
      {...rest}
      screenOptions={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        headerBackground: () => {
          return <View className='bg-primary-foreground flex-1' />;
        },
        headerTintColor: chosenColors.tintColor,
        headerBackVisible: false,
      }}>
      {children}
    </S>
  );
};

export default Stack;

const colors = {
  light: {
    tintColor: '#343a40',
  },
  dark: {
    tintColor: '#ffbade',
  },
};
