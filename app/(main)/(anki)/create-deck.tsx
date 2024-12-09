import { createDeck, getDeckById } from '@/constants/Query';
import { Deck, useAnkiContext } from '@/context/ankiContext';
import { useAppContext } from '@/context/appContext';
import { router } from 'expo-router';
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

const CreateDeck = () => {
  const { user } = useAppContext();
  const { createDeck } = useAnkiContext();
  const [deckName, setDeckName] = useState('');
  const [numCards, setNumCards] = useState('20'); // user.reviewCard
  const nameInputRef = useRef<TextInput>(null);
  const isFormValid = deckName.trim() !== '' && numCards.trim() !== '';

  const handleCancel = () => {
    router.dismiss();
  };

  const handleCreateDeck = async () => {
    if (deckName.trim() && numCards.trim()) {
      const newDeck: Omit<Deck, 'id'> = {
        name: deckName,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        localUpdatedDate: new Date().toISOString(),
        newCardQuantity: parseInt(numCards, 10),
        learning: 0,
        new: 0,
        review: 0,
      };
      await createDeck(newDeck);
      router.dismiss();
    }
  };

  useEffect(() => {
    if (nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current!.focus();
      }, 100);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-1 justify-center bg-[rgba(0,0,0,0.54)]'>
        <View className='bg-tertiary-background p-6 rounded-[10px] mx-10'>
          <Text className='text-2xl font-medium text-center text-text mb-4'>
            Tạo bộ thẻ
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
                handleCreateDeck();
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

export default CreateDeck;
