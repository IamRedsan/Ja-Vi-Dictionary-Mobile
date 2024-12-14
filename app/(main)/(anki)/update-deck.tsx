import { useAnkiContext } from '@/context/ankiContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const UpdateDeck = () => {
  const { updateDeck, decks, getDecks, setReloadWindowingCards } =
    useAnkiContext();
  const {
    deckId,
    fromPath,
  }: {
    deckId: string;
    fromPath: string;
  } = useLocalSearchParams();
  const [deckName, setDeckName] = useState('');
  const [numCards, setNumCards] = useState('');
  const deck = useMemo(
    () => decks.find(({ id }) => id === Number.parseInt(deckId)),
    [decks, deckId]
  );

  const isFormValid = deckName.trim() !== '' && numCards.trim() !== '';

  const handleCancel = () => {
    router.back();
  };

  const handleUpdateDeck = async () => {
    if (deck && deckName.trim() && numCards.trim()) {
      await updateDeck({
        ...deck,
        name: deckName,
        newCardQuantity: Number.parseInt(numCards),
      });
      await getDecks();

      if (fromPath === 'review-cards') {
        setReloadWindowingCards(true);
      }

      router.back();
    }
  };

  useEffect(() => {
    if (!deck) return;

    setDeckName(deck.name);
    setNumCards(String(deck.newCardQuantity));
  }, [deck]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-1 justify-center bg-[rgba(0,0,0,0.54)]'>
        <View className='bg-tertiary-background p-6 rounded-[10px] mx-10'>
          <Text className='text-2xl font-medium text-center text-text mb-4'>
            Cập nhật bộ thẻ
          </Text>
          <Text className='text-text text-xl my-1'>Tên bộ thẻ:</Text>
          <TextInput
            value={deckName}
            onChangeText={setDeckName}
            className='p-2 mb-2 border-2 border-[#CBD5E1] focus:border-primary rounded-lg text-text text-xl caret-primary'
          />
          <Text className='text-text text-xl my-1'>Số thẻ mới:</Text>
          <TextInput
            value={numCards}
            onChangeText={(text) => {
              const sanitizedText = text.replace(/[^0-9]/g, '');
              setNumCards(sanitizedText);
            }}
            keyboardType='numeric'
            className='p-2 mb-2 border-2 border-[#CBD5E1] focus:border-primary rounded-lg text-text text-xl caret-primary'
          />
          <View className='flex-row justify-end gap-6'>
            <TouchableOpacity onPress={handleCancel}>
              <Text className='text-text text-xl'>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleUpdateDeck();
              }}
              disabled={!isFormValid}>
              <Text
                className={`text-primary text-xl font-medium ${
                  isFormValid ? '' : 'opacity-40'
                }`}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UpdateDeck;
