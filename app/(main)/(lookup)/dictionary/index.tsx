import KanjiListContainer from '@/components/kanji/KanjiListContainer';
import React from 'react';
import { View } from 'react-native';
const Dictionary: React.FC = () => {
  return (
    <View className='w-full h-full'>
      <KanjiListContainer />
    </View>
  );
};
export default Dictionary;
