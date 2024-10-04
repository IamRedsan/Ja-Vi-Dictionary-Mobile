import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import KanjiContainer from '@/components/kanji/KanjiContainer';

const Kanji = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <KanjiContainer _id={id} />
    </View>
  );
};
export default Kanji;
