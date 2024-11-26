import { View, Text, TouchableOpacity } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { cssInterop } from 'nativewind';

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface HeaderProps {
  source: string;
  target: string;
  onPress: () => void;
  disabled: boolean;
}

const Header: React.FC<HeaderProps> = ({
  source,
  target,
  onPress,
  disabled,
}) => {
  return (
    <View className='flex-row justify-between items-center px-4 py-3 border-b-[0.5px] border-b-primary'>
      <Text className='text-primary text-lg w-[30%]'>{source}</Text>
      <TouchableOpacity onPress={onPress} disabled={disabled} className='px-6'>
        <AntDesign name='swap' className='text-primary text-[24px]' />
      </TouchableOpacity>
      <Text className='text-primary text-lg w-[30%] text-right'>{target}</Text>
    </View>
  );
};
export default Header;
