import { View, Text, FlatList, Pressable } from 'react-native';
import Header from './Header';
import Row from './Row';
import { useAnkiContext } from '@/context/ankiContext';
import { Link, useRouter } from 'expo-router';
import CircleSpin from '@/components/loading/CircleSpin';
const Table = () => {
  const { browseCards, browseLoading } = useAnkiContext();
  const router = useRouter();

  return (
    <View className='rounded-[10px] border-text border-[0.5px] overflow-hidden flex-1'>
      <Header />
      {browseLoading ? (
        <CircleSpin />
      ) : (
        <FlatList
          data={browseCards}
          renderItem={({ index, item }) => {
            return (
              <Link
                asChild
                href={{
                  pathname: '/(main)/(anki)/card',
                  params: { id: item.id, fromPath: 'browse' },
                }}>
                <Row
                  onLongPress={() => {
                    router.push({
                      pathname: '/(main)/(anki)/card/menu',
                      params: {
                        id: item.id,
                      },
                    });
                  }}
                  key={index}
                  example={item.sentence}
                  word={item.word}
                  isOdd={index % 2 != 0}
                />
              </Link>
            );
          }}
        />
      )}
    </View>
  );
};
export default Table;
