import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cssInterop, useColorScheme } from 'nativewind';

cssInterop(FontAwesome, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

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
            className='text-secondary-foreground text-[16px]'
          />
        )}
        {children && (
          <Text className='text-primary-foreground px-2'>{children}</Text>
        )}
        {endIcon && (
          <FontAwesome
            name={endIcon}
            className='text-secondary-foreground text-[16px]'
          />
        )}
      </TouchableOpacity>
    );
  }
);
export default Button;
