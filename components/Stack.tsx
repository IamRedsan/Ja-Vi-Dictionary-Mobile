import { Stack as S } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { forwardRef } from 'react';
import { View } from 'react-native';

const Stack = forwardRef<View, React.ComponentProps<typeof S>>(
  ({ children, ...rest }, ref) => {
    const { colorScheme } = useColorScheme();
    const chosenColors = colors[colorScheme ?? 'light'];

    return (
      <S
        {...rest}
        ref={ref}
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
  }
);

export default Stack;

const colors = {
  light: {
    tintColor: '#343a40',
  },
  dark: {
    tintColor: '#ffbade',
  },
};
