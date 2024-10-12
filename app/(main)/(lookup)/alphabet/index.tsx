import Table from '@/components/alphabet/Table';
import { ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
const Alphabet = () => {
  const { isDefaultHiragana } = useLocalSearchParams<{
    isDefaultHiragana: string;
  }>();

  const isHiragana = isDefaultHiragana === 'true';

  return (
    <ScrollView className="bg-primary-background">
      <Table isDefaultHiragana={isHiragana} />
    </ScrollView>
  );
};
export default Alphabet;
