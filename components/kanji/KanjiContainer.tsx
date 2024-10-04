import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import KanjiGuide from './KanjiGuide';
import { useColorScheme } from 'nativewind';
import KanjiLoading from '../loading/KanjiLoading';

interface KanjiContainerProps {
  _id: string;
}

interface Kanji {
  _id: {
    $oid: string;
  };
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

const data = {
  _id: {
    $oid: '1',
  },
  text: '多',
  phonetic: ['ĐA', 'HƠI'],
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

const fetchData = {
  data: { message: 'OK', is_success: true, data: data },
};

const KanjiContainer: React.FC<KanjiContainerProps> = ({ _id }) => {
  const kanjiRef = useRef<any>(null);
  const [kanji, setKanji] = useState<Kanji | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(async () => {
      const response = fetchData; // Gọi API
      setKanji(response.data.data);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <ScrollView className="bg-secondary-background h-full">
        <KanjiLoading />
      </ScrollView>
    );
  }

  return (
    <ScrollView className="bg-secondary-background h-full">
      <View className="justify-center items-center w-full mt-3">
        <KanjiGuide
          size={120}
          word={kanji!.text}
          ref={(el) => (kanjiRef.current = el)}
        />
      </View>
      <View className="w-full flex-col m-2">
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Hán Việt
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {kanji?.phonetic.join(', ')}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Bộ thủ
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {kanji?.composition
              .map((item) => `${item.rawText} ${item.phonetic}`)
              .join(', ')}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light  ml-1 p-1 min-w-24 text-lg ">
              Số nét
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1">
            {kanji?.strokes}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light  ml-1 p-1 min-w-24 text-lg ">
              JLPT
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1">
            {'N' + kanji?.jlptLevel}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Kunyomi
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {kanji?.kunyomi.join(', ')}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Onyomi
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {kanji?.onyomi.join(', ')}
          </Text>
        </View>
        <View className="m-1 flex-row">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Nghĩa
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {kanji?.meaning}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default KanjiContainer;
