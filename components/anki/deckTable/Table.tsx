import { ScrollView, Text, View } from 'react-native';
import Header from './Header';
import Row from './Row';
import { useAnkiContext } from '@/context/ankiContext';
import { useRouter } from 'expo-router';

const Table = () => {
  const { decks, curDeckId, setCurDeckId } = useAnkiContext();
  const router = useRouter();

  const handleOnPressRow = (deckId: number) => {
    if (curDeckId !== deckId) {
      setCurDeckId(deckId);
      return;
    }
  };
  return (
    <View className='border-[0.5px] border-black rounded-[10px] bg-anki-card p-4 w-full'>
      <Header />
      {decks.length === 0 ? (
        <Text className='bg-anki-card pt-12 pb-8 text-xl text-center text-text'>
          Bạn chưa có bộ thẻ nào. Tạo ngay thôi!
        </Text>
      ) : (
        <ScrollView className='mt-2 gap-2 max-h-3/4'>
          {decks.map(({ name, new: newNumber, learning, review, id }) => {
            return (
              <Row
                active={id === curDeckId}
                id={id}
                name={name}
                new={newNumber!}
                learning={learning!}
                review={review!}
                key={id}
                onPress={() => {
                  handleOnPressRow(id!);
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
