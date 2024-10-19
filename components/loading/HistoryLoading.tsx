import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import Loading from '../ui/Loading';

const { width } = Dimensions.get('window');

const HistoryLoading: React.FC = () => {
  return (
    <ScrollView className='h-full '>
      {Array.from({ length: 8 }).map((_, index) => (
        <View key={index} className='items-flex-col w-full my-2'>
          <View className='flex-1 ml-2 flex-row gap-2'>
            <View>
              <Loading height={56} width={56} borderRadius={9999}></Loading>
            </View>
            <View>
              <Loading
                height={30}
                width={width - 180}
                borderRadius={10}></Loading>
            </View>
            <View className='absolute right-0 flex-row mr-1'>
              <View className='mt-10'>
                <Loading height={16} width={120} borderRadius={10}></Loading>
              </View>
              <View>
                <Loading height={56} width={56} borderRadius={9999}></Loading>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HistoryLoading;
