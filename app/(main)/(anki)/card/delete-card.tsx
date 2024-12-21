import Button from '@/components/ui/Button';
import { AddUndoType, useAnkiContext } from '@/context/ankiContext';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
const DeleteCard = () => {
  const { cardId, fromPath }: { cardId: string; fromPath: string } =
    useLocalSearchParams();
  const { deleteCard, getDecks, getBrowseCards, setReloadWindowingCards } =
    useAnkiContext();

  const handleDeleteCard = async () => {
    let addUndoType = AddUndoType.NONE;
    if (fromPath === 'review-cards') {
      addUndoType = AddUndoType.NEW;
    }

    await deleteCard(Number.parseInt(cardId), addUndoType);
    await getDecks();
    if (fromPath === 'browse') {
      getBrowseCards();
    }
    if (fromPath === 'review-cards') {
      setReloadWindowingCards(true);
    }
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={handleCancel}>
      <View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.54)]'>
        <TouchableWithoutFeedback>
          <View className='bg-tertiary-background p-10 rounded-[10px]'>
            <Text className='text-center text-text mb-10 text-[16px]'>
              Bạn có muốn xóa thẻ này ?
            </Text>
            <View className='flex-row justify-center gap-4'>
              <Button className='w-[100px]' onPress={handleCancel}>
                Huỷ
              </Button>
              <Button
                className='w-[100px]'
                type='dangerous'
                onPress={handleDeleteCard}>
                Xóa thẻ
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default DeleteCard;
