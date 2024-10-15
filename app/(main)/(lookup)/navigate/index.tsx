import CircleButton from '@/components/ui/CircleButton';
import { Link } from 'expo-router';
import { cssInterop } from 'nativewind';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const Navigate: React.FC = () => {
  return (
    <>
      <SafeAreaView className='bg-primary-background' />
      <ScrollView className='bg-primary-background '>
        <View className='items-center flex-col flex-1'>
          <Image
            source={require('../../../../assets/images/project-logo.png')}
            className='bg-primary rounded-full size-32 my-8'
          />
          <View className='flex-row items-center justify-center mb-3'>
            <Text className='text-text text-3xl'>Chào mừng đến với </Text>
            <Text className='text-primary text-4xl font-bold'>Gaku</Text>
          </View>
          <View className='flex-col justify-center items-center my-6 bg-secondary-background w-[90%] p-3 rounded-2xl'>
            <Text className='text-text text-2xl mb-2 font-semibold'>
              Hướng dẫn
            </Text>
            <View className='flex-row justify-between w-full p-2'>
              <View className='items-center flex-col '>
                <Link href='/alphabet?isDefaultHiragana=true' asChild>
                  <CircleButton className='size-20' text='ひ' />
                </Link>
                <Text className='text-text text-xl font-medium'>Hiragana</Text>
              </View>
              <View className='items-center flex-col'>
                <Link href='/alphabet?isDefaultHiragana=false' asChild>
                  <CircleButton className='size-20' text='カ' />
                </Link>
                <Text className='text-text text-xl font-medium'>Katakana</Text>
              </View>
              <View className='items-center flex-col '>
                <Link href='/typing' asChild>
                  <CircleButton className='size-20' iconName='keyboard-o' />
                </Link>
                <Text className='text-text text-xl font-medium'>Gõ chữ</Text>
              </View>
            </View>
          </View>
          <View className='flex-col justify-center items-center my-6 bg-secondary-background w-[90%] p-3 rounded-2xl'>
            <Text className='text-text text-2xl mb-2 font-semibold'>
              Học tập
            </Text>
            <View className='flex-row justify-between w-[80%] p-2'>
              <View className='items-center flex-col '>
                <Link href='/(anki)' asChild>
                  <CircleButton className='size-20' iconName='navicon' />
                </Link>
                <Text className='text-text text-xl font-medium'>
                  Thẻ ghi nhớ
                </Text>
              </View>
              <View className='items-center flex-col '>
                <Link href='/kanji' asChild>
                  <CircleButton className='size-20' text='漢' />
                </Link>
                <Text className='text-text text-xl font-medium'>
                  Danh sách Kanji
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Navigate;
