import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface WordLinkItemProp {
  _id: string;
  text: string;
  hiragana: string;
  meaning: string;
}

const WordLinkItem: React.FC<WordLinkItemProp> = ({
  _id,
  hiragana,
  meaning,
  text,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <Link href={`dictionary/${_id}`} key={_id} asChild>
      <TouchableOpacity className='px-2 py-3 flex-1 w-full flex-row justify-between'>
        <View className='flex-col'>
          <View className='flex-row gap-2'>
            <Text className='text-text font-semibold text-xl'>{text}</Text>
            <Text className='text-primary text-xl'>{`【${hiragana}】`}</Text>
          </View>
          <Text className='text-text-light mt-1'>{meaning}</Text>
        </View>
        <Ionicons
          name='chevron-forward-outline'
          size={24}
          color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
        />
      </TouchableOpacity>
    </Link>
  );
};
export default WordLinkItem;
