import Button from '@/components/ui/Button';
import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
const DeckModal = () => {
  const { deckId } = useLocalSearchParams();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        router.dismiss();
      }}>
      <View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.54)]'>
        <TouchableWithoutFeedback>
          <View className='bg-tertiary-background p-10 rounded-[10px]'>
            <Text className='text-center text-text mb-10 text-[16px]'>
              Bạn có muốn đăng xuất
            </Text>
            <View className='flex-row justify-center gap-4'>
              <Text>{deckId}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default DeckModal;
