import Heatmap from '@/components/graph/Heatmap';
import PieChart from '@/components/graph/PieChart';
import AntDesignIconButton from '@/components/ui/AntDesignIconButton';
import Dropdown from '@/components/ui/Dropdown';
import { useAnkiContext } from '@/context/ankiContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
const graph: React.FC = () => {
  const { setCurDeckId, decks, curDeckId, browseLoading } = useAnkiContext();
  const mappedDecks = useMemo(() => {
    return decks.map(({ id, name }) => ({ value: String(id), label: name }));
  }, [decks]);
  const handleChangeDeck = (deckId: string) => {
    setCurDeckId(Number.parseInt(deckId));
  };

  const handleBackIconClicked = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <SafeAreaView className='bg-primary-foreground'>
      <View className='bg-primary-foreground py-3'>
        <View className='flex-row gap-2 mr-2'>
          <AntDesignIconButton
            iconName='arrowleft'
            onPress={handleBackIconClicked}
            disabled={browseLoading}
          />
          <Dropdown
            data={mappedDecks}
            iconName='book'
            onChange={handleChangeDeck}
            value={String(curDeckId)}
            disabled={browseLoading}
          />
        </View>
      </View>
      {!curDeckId ? (
        <View className='h-full items-center mt-24'>
          <FontAwesome6 name='sad-cry' className='text-primary text-[150px]' />
          <Text className='text-text mt-12 text-xl'>Bạn chưa chọn Deck</Text>
        </View>
      ) : (
        <ScrollView className='h-full bg-primary-background'>
          <View className='flex-col gap-2 px-4 py-2'>
            <Heatmap />
            <PieChart />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default graph;
