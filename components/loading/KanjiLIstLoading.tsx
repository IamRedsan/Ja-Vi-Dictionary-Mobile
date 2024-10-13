import React from 'react';
import { View, Dimensions } from 'react-native';
import Loading from '../ui/Loading';

const { width, height } = Dimensions.get('window');

const KanjiListLoading: React.FC = () => {
  return (
    <View className='items-center'>
      <Loading height={height} width={width - 32} borderRadius={10}></Loading>
    </View>
  );
};
export default KanjiListLoading;
