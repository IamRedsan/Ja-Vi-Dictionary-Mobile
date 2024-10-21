import { HistoryEnum } from '@/constants/HistoryEnum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import HistoryItem from './HistoryItem';
import { useFocusEffect } from 'expo-router';
import { useColorScheme } from 'nativewind';
import HistoryLoading from '../loading/HistoryLoading';

interface HistoryItem {
  ordinal: number;
  _id: string;
  text: string;
  timeStamp: Date;
  type: HistoryEnum;
}

const ListHistory: React.FC = () => {
  const [histories, setHistories] = useState<HistoryItem[]>([]);
  const [isEditAble, setIsEditAble] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading
  const { colorScheme } = useColorScheme();
  const imageSource =
    colorScheme === 'dark'
      ? require('../../assets/images/empty-box-dark.png')
      : require('../../assets/images/empty-box-light.png');

  const handleDeleteHistory = async (ordinal: number) => {
    const updatedHistories = histories.filter(
      (item) => item.ordinal !== ordinal
    );
    setHistories(updatedHistories);
    await AsyncStorage.setItem('history', JSON.stringify(updatedHistories));
  };

  const handleDeleteHistories = async () => {
    await AsyncStorage.setItem('history', JSON.stringify([]));
    setHistories([]);
  };

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('history');
      setHistories(storedHistory ? JSON.parse(storedHistory) : []);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  if (loading) {
    return (
      <>
        <View className='flex-row justify-between p-4 mt-2 items-center rounded-t-2xl bg-primary-foreground'>
          <TouchableOpacity
            className='hit-slop-4 z-10'
            onPress={() => {
              setIsEditAble(!isEditAble);
            }}>
            <Text className='text-text'>{isEditAble ? 'Xong' : 'Sửa'}</Text>
          </TouchableOpacity>
          <Text className='text-text absolute left-0 right-0 text-center'>
            Lịch sử tìm kiếm
          </Text>
          <TouchableOpacity
            className='hit-slop-4 z-10'
            onPress={handleDeleteHistories}
            disabled={!isEditAble}>
            <Text className={`text-text ${isEditAble ? '' : 'opacity-50'}`}>
              Xóa hết
            </Text>
          </TouchableOpacity>
        </View>
        <HistoryLoading />
      </>
    );
  }

  return (
    <>
      <View className='flex-row justify-between p-4 mt-2 items-center rounded-t-2xl bg-primary-foreground'>
        <TouchableOpacity
          className='hit-slop-4 z-10'
          onPress={() => {
            setIsEditAble(!isEditAble);
          }}>
          <Text className='text-text'>{isEditAble ? 'Xong' : 'Sửa'}</Text>
        </TouchableOpacity>
        <Text className='text-text absolute left-0 right-0 text-center'>
          Lịch sử tìm kiếm
        </Text>
        <TouchableOpacity
          className='hit-slop-4 z-10'
          onPress={handleDeleteHistories}
          disabled={!isEditAble}>
          <Text className={`text-text ${isEditAble ? '' : 'opacity-50'}`}>
            Xóa hết
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={histories}
        keyExtractor={(item) => item.ordinal.toString()}
        renderItem={({ item }) => (
          <View>
            <HistoryItem
              {...item}
              onDelete={handleDeleteHistory}
              isEditable={isEditAble}
            />
          </View>
        )}
        ListEmptyComponent={
          <View className='flex-1 justify-center items-center'>
            <Image source={imageSource} className='size-60 mt-12 mb-6' />
            <Text className='w-full text-center text-primary text-2xl'>
              Lịch sử hiện giờ đang trống
            </Text>
          </View>
        }
      />
    </>
  );
};

export default ListHistory;
