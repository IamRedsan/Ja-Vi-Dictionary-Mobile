import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import KanjiContainer from '@/components/kanji/KanjiContainer';

const Kanji: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollView className="bg-secondary-background ">
      {id && <KanjiContainer _id={id} />}
      <View>
        <Text>Comment</Text>
      </View>
    </ScrollView>
  );
};
export default Kanji;
