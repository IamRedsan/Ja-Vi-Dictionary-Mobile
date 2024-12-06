import Table from '@/components/anki/deckTable/Table';
import FloatAction from '@/components/anki/FloatAction';
import { useAnkiContext } from '@/context/ankiContext';
import { useAppContext } from '@/context/appContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { cssInterop } from 'nativewind';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

cssInterop(FontAwesome6, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

cssInterop(Entypo, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const Decks = () => {
  const { user } = useAppContext();
  const { decks } = useAnkiContext();
  const insets = useSafeAreaInsets();
  const [isConflict, setIsConflict] = useState<boolean>(true);

  if (!user) {
    return (
      <View className='bg-primary-background flex-1'>
        <View
          className='bg-primary-foreground p-3'
          style={{
            paddingTop: insets.top,
          }}>
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
      </View>
    );
  }

  return (
    <View className='bg-primary-background flex-1'>
      <View
        className='bg-primary-foreground p-3'
        style={{
          paddingTop: insets.top,
        }}>
        <View className='flex-row items-center justify-between px-3'>
          <Text className='text-2xl text-center text-text'>Thẻ ghi nhớ</Text>
          <View className='flex-row gap-4 justify-center items-center'>
            <TouchableOpacity>
              <Entypo name='bar-graph' className='text-2xl text-icon' />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name='sync' className='text-3xl text-icon' />
            </TouchableOpacity>
            <View className='absolute -right-1 -top-1 z-100'>
              {isConflict && (
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
        {!user ? (
          <Text>Vui lòng đăng nhập để sử dụng tính năng này</Text>
        ) : (
          <Table />
        )}
        <FloatAction />
      </View>
    </View>
  );
};
export default Decks;
