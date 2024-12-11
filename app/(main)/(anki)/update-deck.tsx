import { getDeckById } from '@/constants/Query';
import { Deck, useAnkiContext } from '@/context/ankiContext';
import { useAppContext } from '@/context/appContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const UpdateDeck = () => {
  const { user } = useAppContext();
  const { updateDeck } = useAnkiContext();
  const params = useLocalSearchParams() as { deckId: string };
  const deckId = params.deckId;
  const [deck, setDeck] = useState<Deck>();
  const db = useSQLiteContext();
  const [deckName, setDeckName] = useState('');
  const [numCards, setNumCards] = useState('');
  const nameInputRef = useRef<TextInput>(null);
  const isFormValid = deckName.trim() !== '' && numCards.trim() !== '';

  const handleCancel = () => {
    router.dismiss();
  };

  const handleUpdateDeck = async () => {
    if (deckName.trim() && numCards.trim()) {
      const updatedDeck = {
        id: deck!.id,
        localUpdatedDate: new Date(),
        updatedDate: new Date(),
        name: deckName,
        newCardQuantity: parseInt(numCards, 10),
        learning: deck?.learning,
        new: deck?.new,
        review: deck?.review,
      };
      await updateDeck(updatedDeck);
      router.dismissAll();
    }
  };

  useEffect(() => {
    if (nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current!.focus();
      }, 100);
    }

    const fetchDeck = async (deckId: number) => {
      const deckResult: any = await db.getFirstAsync(getDeckById, deckId);
      setDeck(deckResult);
      setDeckName(deckResult.name);
      setNumCards(deckResult.newCardQuantity.toString());
    };

    if (deckId) {
      fetchDeck(parseInt(deckId as string, 10));
    }
  }, [deckId]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-1 justify-center bg-[rgba(0,0,0,0.54)]'>
        <View className='bg-tertiary-background p-6 rounded-[10px] mx-10'>
          <Text className='text-2xl font-medium text-center text-text mb-4'>
            Cập nhật bộ thẻ
          </Text>
          <Text className='text-text text-xl my-1'>Tên bộ thẻ:</Text>
          <TextInput
            ref={nameInputRef}
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
