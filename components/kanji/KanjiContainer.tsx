import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import KanjiGu_ide from './KanjiGuide';
import KanjiLoading from '../loading/KanjiLoading';
import axios from 'axios';
import { HistoryEnum } from '@/constants/HistoryEnum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordLinkItem from '../word/WordLinkItem';

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
  relatedWord: RelatedWords[];
}

interface KanjiAttribute {
  label: string;
  value: string | number;
}

interface RelatedWords {
  _id: string;
  text: string;
  hiragana: string;
  meaning: string;
}

interface HistoryItem {
  ordinal?: number;
  _id: string;
  text: string;
  timeStamp: Date;
  type: HistoryEnum;
}

const KanjiContainer: React.FC<KanjiContainerProps> = ({
  _id,
  kanji: initialKanji,
}) => {
  const kanjiRef = useRef<any>(null);
  const [kanji, setKanji] = useState<Kanji | undefined>(initialKanji);
  const [isLoading, setIsLoading] = useState<boolean>(!initialKanji);
  const [kanjiAttribute, setKanjiAttribute] = useState<KanjiAttribute[]>([]);

  const saveHistoryItem = async (newHistory: HistoryItem) => {
    try {
      const storedHistory = await AsyncStorage.getItem('history');
      let historyList: HistoryItem[] = storedHistory
        ? JSON.parse(storedHistory)
        : [];

      if (historyList.length > 0) {
        const firstItem = historyList[0];
        if (
          firstItem._id === newHistory._id &&
          firstItem.type === newHistory.type
        ) {
          firstItem.timeStamp = newHistory.timeStamp;
          await AsyncStorage.setItem('history', JSON.stringify(historyList));
          return;
        }
      }

      const highestOrdinal =
        historyList.length > 0 ? historyList[0].ordinal || 0 : 0;
      newHistory.ordinal = highestOrdinal + 1;
      historyList.unshift(newHistory);
      await AsyncStorage.setItem('history', JSON.stringify(historyList));
    } catch (error) {
      console.error('Error saving history item:', error);
    }
  };

  const getKanji = async (_id: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/kanjis/${_id}`
      );
      setKanji(response.data.data);
      let newHistory: HistoryItem = {
        _id: response.data.data._id,
        text: response.data.data.text,
        timeStamp: new Date(),
        type: HistoryEnum.Kanji,
      };
      saveHistoryItem(newHistory);
    } catch (error) {
      throw error;
    }
  };

  const getData = async (_id: string) => {
    try {
      await getKanji(_id);
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
      <View className='bg-secondary-background h-full'>
        <KanjiLoading />
      </View>
    );
  }

  return (
    <View className='h-auto'>
      <View className='justify-center items-center w-full mt-3'>
        <KanjiGu_ide
          size={120}
          word={kanji?.text || ''}
          ref={(el: any) => (kanjiRef.current = el)}
        />
      </View>
      <View className='w-full flex-col m-2'>
        {kanjiAttribute.map((attribute, index) => (
          <View key={index} className='m-1 flex-row'>
            <View className='bg-primary-background rounded-md h-9'>
              <Text className='text-text-light ml-1 p-1 min-w-24 text-lg'>
                {attribute.label}
              </Text>
            </View>
            <Text className='justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]'>
              {attribute.value}
            </Text>
          </View>
        ))}
      </View>
      <View className='mx-3 flex-row gap-2'>
        <View className='h-full bg-primary w-1'></View>
        <Text className='text-text'>Từ liên quan</Text>
      </View>
      {kanji?.relatedWord &&
        kanji.relatedWord.length > 0 &&
        kanji.relatedWord.map((relatedChild) => (
          <View className='mx-3 my-2 p-2 bg-primary-background rounded-md'>
            <WordLinkItem {...relatedChild} />
          </View>
        ))}
    </View>
  );
};

export default KanjiContainer;
