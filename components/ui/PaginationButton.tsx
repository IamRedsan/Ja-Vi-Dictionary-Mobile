import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { cssInterop } from 'nativewind';

cssInterop(FontAwesome5, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface PaginationButtonProps {
  name?: string;
  numPage?: number;
  disabled?: boolean;
  onPress: () => void;
  isActive?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  name,
  numPage,
  onPress,
  isActive = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`aspect-square items-center justify-center w-12 mx-1 rounded-full border-[0.2px] ${
        isActive ? 'bg-primary' : 'bg-transparent'
      }`}>
      {name ? (
        <FontAwesome5 name={name} className='text-xl text-primary' />
      ) : (
        <Text
          className={` text-4 text-center ${
            isActive ? 'text-primary-background' : 'text-primary'
          } `}>
          {numPage}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default PaginationButton;
