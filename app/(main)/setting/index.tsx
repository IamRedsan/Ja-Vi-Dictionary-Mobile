import Avatar from '@/components/setting/Avatar';
import Settings from '@/components/setting/Settings';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/context/appContext';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { cssInterop } from 'nativewind';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const Setting = () => {
  const { user } = useAppContext();

  return (
    <>
      <SafeAreaView className='bg-primary-background' />
      <View className='bg-primary-background flex-1 pt-10'>
        {user ? (
          <Avatar
            username={user.fullname}
            url={user.avatar}
            className='mb-10'
          />
        ) : (
          <View className=' h-2/5 gap-10 justify-center items-center'>
            <View className='items-center'>
              <Image
                source={require('../../../assets/images/project-logo.png')}
                className='bg-primary rounded-full size-32'
              />
              <Text className='text-primary text-4xl font-bold mt-3'>Gaku</Text>
            </View>
            <Link href='/login' asChild>
              <Button>Đăng nhập</Button>
            </Link>
          </View>
        )}
        <Settings />
      </View>
    </>
  );
};
export default Setting;
