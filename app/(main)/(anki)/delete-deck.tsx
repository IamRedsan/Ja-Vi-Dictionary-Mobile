import Button from '@/components/ui/Button';
import { useAnkiContext } from '@/context/ankiContext';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
const Delete = () => {
  const params = useLocalSearchParams() as { deckId: string };
  const deckId = params.deckId;
  const { deleteDeck } = useAnkiContext();

  const handleDeleteDeck = async (deckId: string) => {
    deleteDeck(parseInt(deckId, 10));
    router.dismissAll();
  };

  const handleCancel = () => {
    router.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleCancel}>
      <View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.54)]'>
        <TouchableWithoutFeedback>
          <View className='bg-tertiary-background p-10 rounded-[10px]'>
            <Text className='text-center text-text mb-10 text-[16px]'>
              Bạn có muốn xóa bộ thẻ này ?
            </Text>
            <View className='flex-row justify-center gap-4'>
              <Button className='w-[100px]' onPress={handleCancel}>
                Huỷ
              </Button>
              <Button
                className='w-[100px]'
                type='dangerous'
                onPress={() => {
                  handleDeleteDeck(deckId);
                }}>
                Xóa bộ thẻ
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Delete;
