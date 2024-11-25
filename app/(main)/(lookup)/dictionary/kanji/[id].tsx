import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import KanjiGu_ide from '@/components/kanji/KanjiGuide';
import KanjiLoading from '@/components/loading/KanjiLoading';
import WordLinkItem from '@/components/word/WordLinkItem';
import ListCommentContainer from '@/components/comment/ListCommentContainer';
import { client } from '@/client/axiosClient';
import { HistoryEnum } from '@/constants/HistoryEnum';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Comment {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    avatar: string;
  };
  content: string;
  liked_by: string[];
  created_at: string;
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
  comments: Comment[];
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

const Kanji: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  // const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [kanji, setKanji] = useState<Kanji | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [kanjiAttributes, setKanjiAttributes] = useState<KanjiAttribute[]>([]);

  // Save History
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
      const response = await client.get(`/kanjis/${_id}`);
      const kanjiData = response.data.data;
      setKanji(kanjiData);

      const newHistory: HistoryItem = {
        _id: kanjiData._id,
        text: kanjiData.text,
        timeStamp: new Date(),
        type: HistoryEnum.Kanji,
      };
      saveHistoryItem(newHistory);
    } catch (error) {
      console.error('Error fetching kanji:', error);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getKanji(id).then(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (kanji) {
      const attributes = [
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
      setKanjiAttributes(attributes);
    }
  }, [kanji]);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       scrollViewRef.current?.scrollToEnd({ animated: true });
  //     }
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  if (isLoading) {
    return (
      <View
        className='bg-secondary-background h-full'
        style={{
          paddingTop: insets.top,
        }}>
        <KanjiLoading />
      </View>
    );
  }

  return (
    <ScrollView
      className='bg-secondary-background'
      style={{
        paddingTop: insets.top,
      }}>
      {kanji && (
        <View>
          <View className='justify-center items-center w-full mt-1'>
            <KanjiGu_ide size={120} word={kanji.text} />
          </View>
          <View className='w-full flex-col m-2'>
            {kanjiAttributes.map((attr, index) => (
              <View key={index} className='m-1 flex-row'>
                <View className='bg-primary-background rounded-md h-9'>
                  <Text className='text-text-light ml-1 p-1 min-w-24 text-lg'>
                    {attr.label}
                  </Text>
                </View>
                <Text className='justify-center ml-2 flex-row text-lg text-text py-1 w-[70%]'>
                  {attr.value}
                </Text>
              </View>
            ))}
          </View>
          <View className='mx-3 flex-row gap-2'>
            <View className='h-full bg-primary w-1'></View>
            <Text className='text-text'>Từ liên quan</Text>
          </View>
          {kanji.relatedWord && kanji.relatedWord.length > 0 ? (
            kanji.relatedWord.map((word, index) => (
              <View
                key={index}
                className='mx-3 my-2 p-2 bg-primary-background rounded-md'>
                <WordLinkItem {...word} />
              </View>
            ))
          ) : (
            <Text className='text-text text-center my-4'>
              Không có từ liên quan
            </Text>
          )}
        </View>
      )}
      <View className='mx-3 flex-row gap-2'>
        <View className='h-full bg-primary w-1'></View>
        <Text className='text-text'>Bình luận</Text>
      </View>
      <View className='my-2'>
        <ListCommentContainer
          initialComments={kanji?.comments || []}
          isKanjiComment={true}
          mainItemId={id}
        />
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Kanji;
