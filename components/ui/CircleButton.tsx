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

interface CircleButtonProps extends TouchableOpacityProps {
  text?: string;
  iconName?: FontAwesomeName;
}

const CircleButton = forwardRef<TouchableOpacity, CircleButtonProps>(
  ({ className, text, iconName, ...rest }, ref) => {
    const isFontAwesomeIcon = (name: string): name is FontAwesomeName => {
      return Object.keys(FontAwesome.glyphMap).includes(name);
    };

    return (
      <TouchableOpacity
        className={`flex-row items-center justify-center bg-primary rounded-full p-2 ${
          className ? className : ''
        }`}
        ref={ref}
        {...rest}
      >
        {iconName ? (
          <FontAwesome name={iconName} className="text-white text-4xl" />
        ) : (
          text && <Text className="text-white text-4xl font-bold">{text}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

export default CircleButton;
