import { View, Text, FlatList, Pressable } from 'react-native';
import Header from './Header';
import Row from './Row';
import { useAnkiContext } from '@/context/ankiContext';
import { Link } from 'expo-router';
const Table = () => {
  const { browseCards } = useAnkiContext();

  return (
    <View className='rounded-[10px] border-text border-[0.5px] overflow-hidden flex-1'>
      <Header />
      <FlatList
        data={browseCards}
        renderItem={({ index, item }) => {
          return (
            <Link
              asChild
              href={{
                pathname: '/(main)/(anki)/card',
                params: { id: item.id },
              }}>
              <Row
                key={index}
                example={item.sentence}
                word={item.word}
                isOdd={index % 2 != 0}
              />
            </Link>
          );
        }}
      />
    </View>
  );
};
export default Table;
