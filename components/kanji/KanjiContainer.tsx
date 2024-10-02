import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import KanjiGuide from './KanjiGuide';

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

const KanjiContainer: React.FC<KanjiContainerProps> = ({
  _id,
  composition,
  jlptLevel,
  kunyomi,
  meaning,
  onyomi,
  phonetic,
  strokes,
  text,
}) => {
  const kanjiRef = useRef<any>(null);
  return (
    <ScrollView>
      <View className="justify-center items-center w-full">
        <KanjiGuide
          size={120}
          word={text}
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
            {phonetic.join(', ')}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Bộ thủ
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {composition
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
            {strokes}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light  ml-1 p-1 min-w-24 text-lg ">
              JLPT
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1">
            {'N' + jlptLevel}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Kunyomi
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {kunyomi.join(', ')}
          </Text>
        </View>
        <View className="m-1 flex-row ">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Onyomi
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {onyomi.join(', ')}
          </Text>
        </View>
        <View className="m-1 flex-row">
          <View className="bg-primary-background rounded-md h-9">
            <Text className="text-text-light ml-1 p-1 min-w-24 text-lg ">
              Nghĩa
            </Text>
          </View>
          <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
            {meaning}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default KanjiContainer;
