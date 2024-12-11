import CardBrowseHeader from '@/components/anki/CardBrowseHeader';
import Table from '@/components/anki/cardTable/Table';
import { useAnkiContext } from '@/context/ankiContext';
import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
const CardBrowse = () => {
  const { getBrowseCards, browseSearch, curDeckId } = useAnkiContext();

  useEffect(() => {
    if (!curDeckId) return;

    getBrowseCards(curDeckId, browseSearch);
  }, [browseSearch, curDeckId]);

  return (
    <SafeAreaView className='bg-primary-background flex-1'>
      <CardBrowseHeader />
      <View className='p-2 flex-1'>
        <Table />
      </View>
    </SafeAreaView>
  );
};
export default CardBrowse;
