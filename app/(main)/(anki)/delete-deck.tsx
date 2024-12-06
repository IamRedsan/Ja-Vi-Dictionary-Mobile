import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
const Delete = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteDeck = async (deckId: string) => {};

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
              <Button
                className='w-[100px]'
                onPress={handleCancel}
                disabled={loading}>
                Huỷ
              </Button>
              <Button
                className='w-[100px]'
                type='dangerous'
                onPress={() => {
                  handleDeleteDeck('123');
                }}
                disabled={loading}>
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
