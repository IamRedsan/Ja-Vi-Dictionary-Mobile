import { Link } from 'expo-router';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';

interface KanjiListItemProps {
  _id: {
    $oid: string;
  };
  text: string;
  phonetic: string;
}

const KanjiListItem: React.FC<KanjiListItemProps> = ({
  _id,
  phonetic,
  text,
}) => {
  return (
    <Link href={('/kanji/' + _id.$oid) as any} asChild>
      <TouchableOpacity className="flex-col bg-secondary-background min-h-16 p-2">
        <Text className="text-primary text-4xl font-medium text-center">
          {text}
        </Text>
        <Text className="text-text text-xl text-center">{phonetic}</Text>
      </TouchableOpacity>
    </Link>
  );
};
export default KanjiListItem;
