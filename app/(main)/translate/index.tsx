import ListHistory from '@/components/history/ListHistory';
import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import { cssInterop, useColorScheme } from 'nativewind';
import { View, ScrollView, TouchableOpacity } from 'react-native';
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
      <View className='bg-secondary-background flex-1'>
        <Link href='/dictionary/66fe9ba4bcfa183ab0c8ca19' asChild>
          <Button>人</Button>
        </Link>
        <Link href='/dictionary/66fea511bcfa183ab0c8ca1e' asChild>
          <Button>足</Button>
        </Link>
        <Link href='/dictionary/66fea511bcfa183ab0c8ca28' asChild>
          <Button>あちら</Button>
        </Link>
      </View>
    </>
  );
};
export default Translate;
