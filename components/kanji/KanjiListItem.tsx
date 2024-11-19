import { Link } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

interface KanjiListItemProps {
  _id: string;
  text: string;
  phonetic: string[];
  isShowText: boolean;
  isShowPhonetic: boolean;
}

const KanjiListItem: React.FC<KanjiListItemProps> = ({
  _id,
  phonetic,
  text,
  isShowPhonetic,
  isShowText,
}) => {
  return (
    <Link href={('/dictionary/kanji/' + _id) as any} asChild>
      <TouchableOpacity className='flex-col bg-secondary-background min-h-16 px-2 py-4'>
        <Text
          className={`text-primary text-4xl font-medium text-center ${
            isShowText ? '' : 'opacity-0'
          }`}>
          {text}
        </Text>
        <Text
          className={`text-text text-xl text-center  ${
            isShowPhonetic ? '' : 'opacity-0'
          }`}>
          {phonetic[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};
export default KanjiListItem;
