import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'nativewind';

type FontAwesomeName = keyof typeof FontAwesome.glyphMap;

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  startIcon?: FontAwesomeName;
  endIcon?: FontAwesomeName;
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ className, startIcon, endIcon, children, ...rest }, ref) => {
    const { colorScheme } = useColorScheme();

    return (
      <TouchableOpacity
        className={`flex-row items-center justify-center bg-primary rounded-lg p-2 ${
          className ? className : ''
        }`}
        ref={ref}
        {...rest}
      >
        {startIcon && (
          <FontAwesome
            name={startIcon}
            size={16}
            color={colorScheme === 'light' ? '#ffffff' : '#000000'}
          />
        )}
        {children && (
          <Text className='text-primary-foreground px-2'>{children}</Text>
        )}
        {endIcon && (
          <FontAwesome
            name={endIcon}
            size={16}
            color={colorScheme === 'light' ? '#ffffff' : '#000000'}
          />
        )}
      </TouchableOpacity>
    );
  }
);
export default Button;
