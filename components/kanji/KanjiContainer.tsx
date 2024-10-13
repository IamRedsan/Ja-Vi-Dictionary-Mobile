import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import KanjiGu_ide from './KanjiGuide';
import KanjiLoading from '../loading/KanjiLoading';
import axios from 'axios';

interface KanjiContainerProps {
  _id: string;
  kanji?: Kanji;
}

interface Kanji {
  _id: string;
  text: string;
  phonetic: string[];
  onyomi: string[];
  kunyomi: string[];
  strokes: number;
  jlpt_level: number;
  meaning: string;
  composition: {
    _id: string;
    raw_text: string;
    phonetic: string;
  }[];
}

interface KanjiAttribute {
  label: string;
  value: string | number;
}

interface RelatedWords {
  _id: string;
  text: string;
  phonetic: string;
}

const KanjiContainer: React.FC<KanjiContainerProps> = ({
  _id,
  kanji: initialKanji,
}) => {
  const kanjiRef = useRef<any>(null);
  const [kanji, setKanji] = useState<Kanji | undefined>(initialKanji);
  const [isLoading, setIsLoading] = useState<boolean>(!initialKanji);
  const [relatedWord, setRelatedWords] = useState<RelatedWords[]>([]);
  const [kanjiAttribute, setKanjiAttribute] = useState<KanjiAttribute[]>([]);

  const getKanji = async (_id: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/kanjis/${_id}`
      );
      setKanji(response.data.data);
    } catch (error) {
      throw error;
    }
  };

  const getRelatedWord = async (text: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/kanjis/${_id}`,
        { params: { text: text } }
      );
      setRelatedWords(response.data.data);
    } catch (error) {
      throw error;
    }
  };

  const getData = async (_id: string) => {
    try {
      await getKanji(_id);
      // await getRelatedWord(kanji!.text);
    } catch (error) {
      //Toast error
    }
  };

  useEffect(() => {
    if (!initialKanji && _id) {
      setIsLoading(true);
      getData(_id).then(() => setIsLoading(false));
    }
  }, [_id, initialKanji]);

  useEffect(() => {
    if (kanji) {
      const kanjiAttributes = [
        { label: 'Hán Việt', value: kanji.phonetic?.join(', ') || 'N/A' },
        {
          label: 'Bộ thủ',
          value:
            kanji.composition
              ?.map((item) => `${item.raw_text} ${item.phonetic}`)
              .join(', ') || 'N/A',
        },
        { label: 'Số nét', value: kanji.strokes || 'N/A' },
        { label: 'JLPT', value: 'N' + (kanji.jlpt_level || 'N/A') },
        { label: 'Kunyomi', value: kanji.kunyomi?.join(', ') || 'N/A' },
        { label: 'Onyomi', value: kanji.onyomi?.join(', ') || 'N/A' },
        { label: 'Nghĩa', value: kanji.meaning || 'N/A' },
      ];
      setKanjiAttribute(kanjiAttributes);
    }
  }, [kanji]);

  if (isLoading) {
    return (
      <View className="bg-secondary-background h-full">
        <KanjiLoading />
      </View>
    );
  }

  return (
    <View className="h-auto">
      <View className="justify-center items-center w-full mt-3">
        <KanjiGu_ide
          size={120}
          word={kanji?.text || ''}
          ref={(el: any) => (kanjiRef.current = el)}
        />
      </View>
      <View className="w-full flex-col m-2">
        {kanjiAttribute.map((attribute, index) => (
          <View key={index} className="m-1 flex-row">
            <View className="bg-primary-background rounded-md h-9">
              <Text className="text-text-light ml-1 p-1 min-w-24 text-lg">
                {attribute.label}
              </Text>
            </View>
            <Text className="justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]">
              {attribute.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default KanjiContainer;
