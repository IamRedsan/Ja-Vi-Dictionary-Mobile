import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View, Text, TouchableOpacity } from 'react-native';

interface KanjiLinkItemProps {
  _id: string;
  text: string;
  phonetic: string[];
  onyomi: string[];
  kunyomi: string[];
}

const KanjiLinkItem: React.FC<KanjiLinkItemProps> = ({
  _id,
  kunyomi,
  onyomi,
  phonetic,
  text,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <Link href={`dictionary/kanji/${_id}` as any} key={_id} asChild>
      <TouchableOpacity className='flex-row items-center'>
        <View className='justify-center'>
          <Text className='text-text text-5xl text-center'>{text}</Text>
        </View>
        <View className='flex-1 flex-col ml-2'>
          <View className='mb-1'>
            <Text className='text-text-light text-lg'>
              {phonetic ? phonetic.join(', ') : 'N/A'}
            </Text>
          </View>
          <View>
            <Text className='text-text-light text-md'>
              On: {onyomi ? onyomi.join(', ') : 'N/A'}
              {'\n'}
              Kun: {kunyomi ? kunyomi.join(', ') : 'N/A'}
            </Text>
          </View>
        </View>
        <Ionicons
          name='chevron-forward-outline'
          size={24}
          color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>
    </Link>
  );
};
export default KanjiLinkItem;
