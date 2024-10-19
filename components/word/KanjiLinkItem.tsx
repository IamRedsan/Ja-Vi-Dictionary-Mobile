import { Link } from 'expo-router';
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
  return (
    <Link href={`/kanji/${_id}`} key={_id} asChild>
      <TouchableOpacity className='flex-row'>
        <View className='w-1/8 justify-center'>
          <Text className='text-text text-5xl text-center'>{text}</Text>
        </View>
        <View className='w-7/8 flex-col ml-2'>
          <View className='h-fit w-full mb-1'>
            <Text className='text-text-light text-lg'>
              {phonetic ? phonetic.join(', ') : 'N/A'}
            </Text>
          </View>

          <View className='h-fit w-full'>
            <Text className='text-text-light text-md'>
              On: {onyomi ? onyomi.join(', ') : 'N/A'}
              Kun: {kunyomi ? kunyomi.join(', ') : 'N/A'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default KanjiLinkItem;
