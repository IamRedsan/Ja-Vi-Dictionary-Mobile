import Table from '@/components/anki/deckTable/Table';
import FloatAction from '@/components/anki/FloatAction';
import { useAnkiContext } from '@/context/ankiContext';
import { useAppContext } from '@/context/appContext';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Decks = () => {
  const { user } = useAppContext();
  const { decks } = useAnkiContext();

  return (
    <SafeAreaView className='bg-primary-background flex-1'>
      <View className='relative flex-1 px-4 items-center'>
        <Image
          source={require('../../../assets/images/project-logo.png')}
          className='bg-primary rounded-full size-32 my-6'
        />
        <Text className='text-[40px] text-center mb-8 text-text'>
          Thẻ ghi nhớ
        </Text>
        {!user ? (
          <Text>Vui lòng đăng nhập để sử dụng tính năng này</Text>
        ) : (
          <Table />
        )}
        <FloatAction />
      </View>
    </SafeAreaView>
  );
};
export default Decks;
