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
    <Link href={`/kanji/${_id}`} key={_id} asChild replace>
      <TouchableOpacity className='flex-row items-center'>
        {/* Kanji Text Section */}
        <View className='justify-center'>
          <Text className='text-text text-5xl text-center'>{text}</Text>
        </View>

        {/* Phonetic & Reading Section */}
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
          style={{ marginLeft: 'auto' }} // Ensures the icon is aligned to the end
        />
      </TouchableOpacity>
    </Link>
  );
};
export default KanjiLinkItem;
