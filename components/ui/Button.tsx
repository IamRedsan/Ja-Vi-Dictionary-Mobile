import React, { forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cssInterop } from 'nativewind';

cssInterop(FontAwesome, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

type FontAwesomeName = keyof typeof FontAwesome.glyphMap;

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  startIcon?: FontAwesomeName;
  endIcon?: FontAwesomeName;
  type?: 'round' | 'primary' | 'dangerous';
}

const classNames = {
  round:
    'disabled:bg-gray-500 disabled:text-gray-200 flex-row items-center justify-center bg-primary rounded-full p-2 shadow',
  primary:
    'disabled:bg-gray-500 disabled:text-gray-200 flex-row items-center justify-center bg-primary rounded-lg p-2 shadow',
  dangerous:
    'disabled:bg-gray-500 disabled:text-gray-200 flex-row items-center justify-center bg-red-500 rounded-lg p-2 shadow',
};

const Button = forwardRef<View, ButtonProps>(
  ({ className, startIcon, endIcon, type, children, ...rest }, ref) => {
    return (
      <TouchableOpacity
        className={`${className ?? ''} ${classNames[type ?? 'primary']}`}
        ref={ref}
        {...rest}>
        {startIcon && (
          <FontAwesome
            name={startIcon}
            className={`${
              type === 'dangerous' ? 'text-white' : 'text-text-button'
            } text-[16px]`}
          />
        )}
        {children && (
          <Text
            className={`${
              type === 'dangerous' ? 'text-white' : 'text-text-button'
            } px-2`}>
            {children}
          </Text>
        )}
        {endIcon && (
          <FontAwesome
            name={endIcon}
            className={`${
              type === 'dangerous' ? 'text-white' : 'text-text-button'
            } text-[16px]`}
          />
        )}
      </TouchableOpacity>
    );
  }
);
export default Button;
