import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
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
  type?: 'round' | 'primary';
}

const classNamePrimary =
  'disabled:bg-gray-500 disabled:text-gray-200 flex-row items-center justify-center bg-primary rounded-lg p-2';
const classNameRound =
  'disabled:bg-gray-500 disabled:text-gray-200 flex-row items-center justify-center bg-primary rounded-full p-2';

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ className, startIcon, endIcon, type, children, ...rest }, ref) => {
    return (
      <TouchableOpacity
        className={`${className ?? ''} ${
          type === 'round' ? classNameRound : classNamePrimary
        }`}
        ref={ref}
        {...rest}>
        {startIcon && (
          <FontAwesome
            name={startIcon}
            className='text-text-button text-[16px]'
          />
        )}
        {children && <Text className='px-2 text-text-button'>{children}</Text>}
        {endIcon && (
          <FontAwesome
            name={endIcon}
            className='text-text-button text-[16px]'
          />
        )}
      </TouchableOpacity>
    );
  }
);
export default Button;
