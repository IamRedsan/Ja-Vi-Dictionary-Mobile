import Table from '@/components/anki/deckTable/Table';
import FloatAction from '@/components/anki/FloatAction';
import { useAnkiContext } from '@/context/ankiContext';
import { useAppContext } from '@/context/appContext';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Decks = () => {
  const { user } = useAppContext();
  const { decks } = useAnkiContext();

  return (
    <SafeAreaView className='bg-primary-background flex-1'>
      <View className='relative flex-1 px-4'>
        <Text className='font-[UTM-Father] text-[40px] text-center mt-20 mb-20 text-text'>
          Thẻ ghi nhớ
        </Text>
        {!user ? (
          <Text>Vui lòng đăng nhập để sử dụng tính năng này</Text>
        ) : decks.length === 0 ? (
          <Text className='bg-anki-card py-10 border-[0.5px] border-black rounded-[10px] font-[UTM-Father] text-[22px] text-center text-text'>
            Bạn chưa có bộ thẻ nào. Tạo ngay thôi!
          </Text>
        ) : (
          <Table />
        )}
        <FloatAction />
      </View>
    </SafeAreaView>
  );
};
export default Decks;
