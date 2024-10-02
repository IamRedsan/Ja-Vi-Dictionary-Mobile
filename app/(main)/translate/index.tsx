import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View, Text } from 'react-native';

interface KanjiContainerProps {
  _id: string;
  text: string;
  phonetic: string[];
  onyomi: string[];
  kunyomi: string[];
  strokes: number;
  jlptLevel: number;
  meaning: string;
  composition: {
    _id: string;
    rawText: string;
    phonetic: string[];
  };
}

// const kanjiWord: KanjiContainerProps = {
//   _id: '1',
//   text: '多',
//   phonetic: ['ĐA'],
//   onyomi: ['スイ', 'シ'],
//   kunyomi: ['おおい', 'まさ.に', 'まさ.る'],
//   strokes: 6,
//   jlptLevel: 4,
//   meaning: 'Nhiều. Khen tốt. Hơn.',
//   composition: {
//     _id: '1',
//     rawText: '夕',
//     phonetic: ['TỊCH'],
//   },
// };

const Translate = () => {
  const { toggleColorScheme } = useColorScheme();

  return (
    <>
      <Link href="/login" asChild>
        <Button>Login</Button>
      </Link>
      <View className="pb-5">
        <Button
          onPress={() => {
            toggleColorScheme();
          }}
        >
          Change Theme
        </Button>
      </View>
    </>
  );
};
export default Translate;
