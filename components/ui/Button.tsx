import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'nativewind';

type FontAwesomeName = keyof typeof FontAwesome.glyphMap;

type ButtonProps = {
  children?: string;
  startIcon?: FontAwesomeName;
  endIcon?: FontAwesomeName;
};

const Button: React.FC<
  ButtonProps & React.ComponentProps<typeof TouchableOpacity>
> = ({ children, startIcon, endIcon, className, ...rest }) => {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center bg-primary rounded-[8] p-2${
        className ? ' ' + className : ''
      }`}
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
};
export default Button;
