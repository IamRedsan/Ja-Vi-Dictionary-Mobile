import Avatar from '@/components/setting/Avatar';
import Settings from '@/components/setting/Settings';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const Setting = () => {
  return (
    <>
      <SafeAreaView className='bg-primary-background' />
      <View className='bg-primary-background flex-1 pt-10'>
        <Avatar username='Kino' className='mb-10' />
        <Settings />
      </View>
    </>
  );
};
export default Setting;
