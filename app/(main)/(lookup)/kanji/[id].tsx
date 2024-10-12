import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import KanjiContainer from '@/components/kanji/KanjiContainer';

const Kanji = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <View>{id && <KanjiContainer _id={id} />}</View>;
};
export default Kanji;
