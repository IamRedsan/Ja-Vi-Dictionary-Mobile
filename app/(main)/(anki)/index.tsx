import Table from '@/components/anki/deckTable/Table';
import FloatAction from '@/components/anki/FloatAction';
import { useAppContext } from '@/context/appContext';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { cssInterop } from 'nativewind';
import { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnkiSyncContext } from '@/context/ankiSyncContext';
import { useIsFocused } from '@react-navigation/native';

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

cssInterop(FontAwesome6, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

cssInterop(Entypo, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

const Decks = () => {
  const { user } = useAppContext();
  const { isSync, loading, prepareSync } = useAnkiSyncContext();
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    if (!loading) prepareSync();
  }, [isFocused]);

  if (!user) {
    return (
      <SafeAreaView className='bg-primary-background flex-1'>
        <View className='bg-primary-foreground p-3'>
          <View className='flex-row items-center justify-between px-3'>
            <Text className='text-2xl text-center text-text'>Thẻ ghi nhớ</Text>
            <View className='flex-row gap-4 justify-center items-center'>
              <Entypo name='bar-graph' className='text-2xl text-icon' />
              <MaterialIcons name='sync' className='text-3xl text-icon' />
            </View>
          </View>
        </View>
        <View className='h-full items-center mt-24'>
          <FontAwesome6 name='sad-cry' className='text-primary text-[150px]' />
          <Text className='text-text mt-12 text-xl'>
            Chức năng này bạn cần phải{' '}
            <Link
              href='/login'
              className='text-primary font-semibold underline'
              replace>
              Đăng nhập
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='bg-primary-background flex-1'>
      <View className='bg-primary-foreground p-3'>
        <View className='flex-row items-center justify-between px-3'>
          <Text className='text-2xl text-center text-text'>Thẻ ghi nhớ</Text>
          <View className='flex-row gap-4 justify-center items-center'>
            <Link href='/graph' asChild>
              <TouchableOpacity>
                <Entypo name='bar-graph' className='text-2xl text-icon' />
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              disabled={loading}
              onPress={() => {
                router.push('/(main)/(anki)/sync');
              }}>
              <MaterialIcons name='sync' className='text-3xl text-icon' />
            </TouchableOpacity>
            <View className='absolute -right-1 -top-1 z-100'>
              {!isSync && (
                <MaterialIcons
                  name='error'
                  className='text-sm text-[#ff9966]'
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View className='relative flex-1 px-4 items-center mt-12'>
        <Table />
        <FloatAction />
      </View>
    </SafeAreaView>
  );
};
export default Decks;
