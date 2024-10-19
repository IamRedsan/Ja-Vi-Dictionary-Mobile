import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';
import { Text, TouchableOpacity } from 'react-native';

interface SearchItem {
  _id: string;
}

const SearchItem: React.FC = () => {
  const { colorScheme } = useColorScheme();
  return (
    <TouchableOpacity className='p-5 flex-1 w-full flex-row justify-between'>
      <Text className='text-text text-lg'>SearchItem</Text>
      <TouchableOpacity className=''>
        <Ionicons
          name='chevron-forward-outline'
          size={24}
          color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default SearchItem;
