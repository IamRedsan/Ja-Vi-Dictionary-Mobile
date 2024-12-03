import { ScrollView, Text, View } from 'react-native';
import Header from './Header';
import Row from './Row';
import { useState } from 'react';
import { useAnkiContext } from '@/context/ankiContext';
import { useRouter } from 'expo-router';

const Table = () => {
  const [chosenDeckId, setChosenDeckId] = useState<string | null>(null);
  const { decks } = useAnkiContext();
  const router = useRouter();

  const handleOnPressRow = (deckId: string) => {
    if (chosenDeckId !== deckId) {
      setChosenDeckId(deckId);
      return;
    }

    router.push({
      pathname: '/(main)/(anki)/review-cards',
      params: { deckId },
    });
  };

  return (
    <View className='border-[0.5px] border-black rounded-[10px] bg-anki-card p-4 w-full'>
      <Header />
      {decks.length === 0 ? (
        <Text className='bg-anki-card pt-12 pb-8 text-xl text-center text-text'>
          Bạn chưa có bộ thẻ nào. Tạo ngay thôi!
        </Text>
      ) : (
        <ScrollView className='mt-2 gap-2 max-h-3/5'>
          {decks.map(({ name, new: newNumber, learning, review, _id }) => {
            return (
              <Row
                active={_id === chosenDeckId}
                _id={_id}
                name={name}
                new={newNumber}
                learning={learning}
                review={review}
                key={_id}
                onPress={() => {
                  handleOnPressRow(_id);
                }}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
export default Table;
