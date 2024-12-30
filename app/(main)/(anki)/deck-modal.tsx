import { useAnkiContext } from '@/context/ankiContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
const DeckModal = () => {
  const router = useRouter();
  const {
    deckId,
  }: {
    deckId: string;
  } = useLocalSearchParams();
  const { decks } = useAnkiContext();

  const deck = useMemo(
    () => decks.find(({ id }) => id === Number.parseInt(deckId)),
    [decks, deckId]
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBack}>
      <View className='flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]'>
        <TouchableWithoutFeedback>
          <View className='w-[80%] rounded-[10px] shadow overflow-hidden bg-tertiary-background py-4'>
            <Text className='text-primary text-xl font-bold px-4 py-2'>
              Bộ thẻ: {deck?.name}
            </Text>
            <View className='bg-primary'>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  router.replace({
                    pathname: '/(main)/(anki)/update-deck',
                    params: { deckId: deck?.id },
                  });
                }}>
                <Text className='text-text text-lg w-full bg-tertiary-background py-2 px-4'>
                  Sửa bộ thẻ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  router.replace({
                    pathname: '/(main)/(anki)/delete-deck',
                    params: { deckId: deck?.id },
                  });
                }}>
                <Text className='text-red-500 text-lg w-full bg-tertiary-background py-2 px-4'>
                  Xóa bộ thẻ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  router.replace({
                    pathname: '/(main)/(anki)/card',
                  });
                }}>
                <Text className='text-text text-lg w-full bg-tertiary-background py-2 px-4'>
                  Thêm thẻ mới
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  router.replace({
                    pathname: '/(main)/(anki)/card/browse',
                  });
                }}>
                <Text className='text-text text-lg w-full bg-tertiary-background py-2 px-4'>
                  Tất cả thẻ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default DeckModal;
