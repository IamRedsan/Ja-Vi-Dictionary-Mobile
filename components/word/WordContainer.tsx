import { View, Text } from 'react-native';

interface WordContainerProps {
  _id: string;
  text: string;
  romanjis: string[];
  hiraganas: string[];
  meanings: {
    _id: string;
    type: string;
    content: string;
  }[];
}

const WordContainer: React.FC<WordContainerProps> = ({
  _id,
  hiraganas,
  text,
  meanings,
  romanjis,
}) => {
  return (
    <View className="flex-1 flex-col gap-4">
      <View className="flex-1 flex-col mt-4 mx-4 gap-2">
        <View>
          <Text className="text-text text-3xl font-extrabold">{text}</Text>
        </View>
        <View className="flex-row gap-3">
          {hiraganas.length > 0 &&
            hiraganas.map((hiragana, index) => (
              <View className="flex-col " key={index}>
                <Text className="text-text text-xl text-center">
                  {hiragana}
                </Text>
                <Text className="text-text-soft text-lg text-center font-light">
                  {romanjis[index] || 'N/A'}
                </Text>
              </View>
            ))}
        </View>
      </View>
      {meanings.length > 0 &&
        meanings.map((meaning) => (
          <View className="flex-col" key={meaning._id}>
            <View className="flex-row gap-3">
              <View className="h-full bg-primary w-1"></View>
              <Text className="text-text ">{meaning.type || 'N/A'}</Text>
            </View>
            <View>
              <Text className="text-text text-sm mx-4 my-1">
                {meaning.content || 'N/A'}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
};
export default WordContainer;
