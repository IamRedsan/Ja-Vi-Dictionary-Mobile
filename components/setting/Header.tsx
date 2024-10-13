import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <View
      className={`flex-row items-center gap-2 mx-4 my-2 ${className ?? ''}`}>
      <View>
        <Text className='text-gray-500'>{title}</Text>
      </View>
      <LinearGradient
        colors={['#6b7280', 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className='flex-grow h-[0.5px]'
      />
    </View>
  );
};
export default Header;
