import KanjiListContainer from '@/components/kanji/KanjiListContainer';
import KanjiListItem from '@/components/kanji/KanjiListItem';
import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

const kanji_item = {
  _id: {
    $oid: '1',
  },
  text: '多 ',
  phonetic: 'ĐA',
};

const Kanji = () => {
  return (
    <>
      <Link href="/kanji/1" asChild>
        <Button>Hello</Button>
      </Link>
      <View className="w-full h-full">
        {/* <KanjiListItem {...kanji_item} /> */}
        <KanjiListContainer></KanjiListContainer>
      </View>
    </>
  );
};
export default Kanji;
