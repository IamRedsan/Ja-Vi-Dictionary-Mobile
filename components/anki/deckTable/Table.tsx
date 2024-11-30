import { View } from 'react-native';
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
      <View className='mt-2 gap-2'>
        {decks.map(({ name, new: newNumber, learning, review, _id }) => {
          return (
            <Row
              active={_id === chosenDeckId}
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
      </View>
    </View>
  );
};
export default Table;
