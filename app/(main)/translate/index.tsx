import KanjiContainer from '@/components/kanji/KanjiContainer';
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
    phonetic: string;
  }[];
}

const kanjiWord: KanjiContainerProps = {
  _id: '1',
  text: '多',
  phonetic: [
    'ĐA',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
    'HƠI',
  ],
  onyomi: ['スイ', 'シ'],
  kunyomi: ['おおい', 'まさ.に', 'まさ.る'],
  strokes: 6,
  jlptLevel: 4,
  meaning:
    'Đồ để ăn. Ăn. Lộc. Mòn, khuyết, cùng nghĩa với chữ thực [蝕]. Thực ngôn [食言] ăn lời, đã nói ra mà lại lật lại gọi là thực ngôn. Thực chỉ [食指] ngón tay trỏ, có khi dùng để đếm số người ăn. Một âm là tự, cùng nghĩa với chữ tự [飼] cho ăn.',
  composition: [
    {
      _id: '1',
      rawText: '夕',
      phonetic: 'TỊCH',
    },
    {
      _id: '3',
      rawText: '夕',
      phonetic: 'TỊCH',
    },
  ],
};

const Translate = () => {
  const { toggleColorScheme, setColorScheme, colorScheme } = useColorScheme();

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
      <View className="bg-secondary-background ">
        <KanjiContainer {...kanjiWord} />
      </View>
    </>
  );
};
export default Translate;
