import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type HeaderProps = {
  setIsHiragana: (isHiragana: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ setIsHiragana }) => {
  return (
    <View className='w-full items-center justify-center bg-primary p-[8px] border-t-[0.2x] rounded-t-[10px] border-[rgba(0,0,0,1)]'>
      <Text className='text-text-button text-[28px]'>Bảng chữ cái</Text>
      <View className='flex-row mt-[10px] justify-between w-[50%]'>
        <TouchableOpacity
          onPress={() => setIsHiragana(true)}
          className='px-[8px] py-[4px] rounded-s-[4] min-w-[30px] bg-secondary'>
          <Text className='p-[5px] text-text-button'>Hiragana</Text>
        </TouchableOpacity>

        <View
          className='absolute top-1/2 left-1/2 bg-[#f5f5f5] items-center rounded-full p-1 z-10'
          style={{
            transform: [{ translateX: -12 }, { translateY: -12 }],
          }}>
          <AntDesign name='swap' className='collor-[#333]' size={16} />
        </View>

        <TouchableOpacity
          onPress={() => setIsHiragana(false)}
          className='px-[8px] py-[4px] rounded-e-[4] min-w-[30px] bg-secondary'>
          <Text className='p-[5px] text-text-button'>Katakana</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
