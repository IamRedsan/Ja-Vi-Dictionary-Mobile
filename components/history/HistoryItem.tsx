import { HistoryEnum } from '@/constants/HistoryEnum';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { dateFormat } from '@/utils/dateFormatUtil';

interface HistoryItemProp {
  ordinal: number;
  _id: string;
  text: string;
  timeStamp: Date;
  type: HistoryEnum;
  isEditable?: boolean;
  onDelete: (_id: number) => void;
}

const HistoryItem: React.FC<HistoryItemProp> = ({
  ordinal,
  _id,
  text,
  timeStamp,
  type,
  isEditable = false,
  onDelete,
}) => {
  const { colorScheme } = useColorScheme();

  const translateX = useRef(new Animated.Value(0)).current;
  const deleteIconTranslateX = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isEditable ? 16 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(deleteIconTranslateX, {
      toValue: isEditable ? 8 : -50,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isEditable]);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <View className='flex-row items-center w-full'>
      {isEditable && (
        <Animated.View
          className='ml-2'
          style={{
            transform: [{ translateX: deleteIconTranslateX }],
          }}>
          <TouchableOpacity onPress={() => onDelete(ordinal)}>
            <MaterialCommunityIcons
              name='delete-outline'
              size={24}
              color='#ff3b3e'
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      <Link
        href={
          `/dictionary/${
            type === HistoryEnum.Kanji ? 'kanji' : 'word'
          }/${_id}` as any
        }
        asChild>
        <TouchableOpacity className='my-6 flex-1 flex-row'>
          <Animated.View
            className='ml-2 flex-row w-full items-center justify-between'
            style={{
              transform: [{ translateX }],
            }}>
            <View className='flex-row items-center'>
              <MaterialIcons
                name='history'
                size={24}
                color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
              />
              <Text className='ml-4 text-text text-xl'>
                {truncateText(text, 15)}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
      <View className='absolute right-0 flex-row mr-1'>
        <Text className='mt-8  opacity-70 text-text text-xs'>
          {dateFormat(timeStamp)}
        </Text>
        <View
          className={`${
            type === HistoryEnum.Kanji
              ? 'bg-type-kanjiYellow'
              : 'bg-type-dictionaryBlue'
          } rounded-full w-12 h-12 justify-center items-center`}>
          <Text className='text-white text-xl'>
            {type === HistoryEnum.Kanji ? 'K' : 'W'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryItem;
