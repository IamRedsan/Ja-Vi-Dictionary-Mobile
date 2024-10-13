import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import { cssInterop, useColorScheme } from 'nativewind';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const Translate = () => {
  const { toggleColorScheme } = useColorScheme();

  return (
    <>
      <SafeAreaView className='bg-primary-background' />
      <ScrollView className='bg-primary-background'>
        <Link href='/dictionary/1' asChild>
          <Button>Login</Button>
        </Link>
        <View className='pb-5'>
          <Button
            onPress={() => {
              toggleColorScheme();
            }}
          >
            Change Theme
          </Button>
        </View>
      </ScrollView>
    </>
  );
};
export default Translate;
