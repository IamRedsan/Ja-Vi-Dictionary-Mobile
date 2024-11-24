import { client } from '@/client/axiosClient';
import ListCommentContainer from '@/components/comment/ListCommentContainer';
import { WordLoading, ItemLoading } from '@/components/loading/WordLoading';
import { FuriText } from '@/components/word/FuriText';
import KanjiLinkItem from '@/components/word/KanjiLinkItem';
import WordContainer from '@/components/word/WordContainer';
import { HistoryEnum } from '@/constants/HistoryEnum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

interface Word {
  _id: string;
  text: string;
  romanji: string[];
  hiragana: string[];
  meaning: {
    _id: string;
    type: string;
    content: string;
  }[];
  examples: {
    _id: string;
    text: string;
    hiragana: string;
    meaning: string;
  }[];
  kanji: Kanji[];
  comments: Comment[];
}

interface HistoryItem {
  ordinal?: number;
  _id: string;
  text: string;
  timeStamp: Date;
  type: HistoryEnum;
}
const Dictionary: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [word, setWord] = useState<Word>({
    _id: '',
    text: '',
    romanji: [],
    hiragana: [],
    meaning: [],
    examples: [],
    kanji: [],
    comments: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isShowKanji, setIsShowKanji] = useState<boolean>(true);
  const insets = useSafeAreaInsets();

  const getWord = async (_id: string) => {
    try {
      const response = await client.get(`/words/${_id}`);
      setWord(response.data.data);
      let newHistory: HistoryItem = {
        _id: response.data.data._id,
        text: response.data.data.text,
        timeStamp: new Date(),
        type: HistoryEnum.Word,
      };
      saveHistoryItem(newHistory);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    try {
      getWord(id);
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <ScrollView
        className='bg-primary-background'
        style={{
          paddingTop: insets.top,
        }}>
        <View className='flex-col m-4 bg-secondary-background rounded-xl h-full'>
          <WordLoading />
          <View className='flex-1 flex-row'>
            <View className='w-1/2 my-2'>
              <Text className='text-text text-center mb-0.5'>Hán tự</Text>
              <View className='w-full h-0.5 bg-line'></View>
            </View>
            <View className='w-1/2 my-2'>
              <Text className='text-text text-center mb-0.5'>Ví dụ</Text>
              <View className='w-full h-0.5 bg-line-unactive'></View>
            </View>
          </View>
          <ItemLoading />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className='bg-primary-background'
      style={{
        paddingTop: insets.top,
      }}>
      <View className='flex-col m-4 bg-secondary-background rounded-xl'>
        <View>
          <WordContainer
            _id={word._id}
            hiraganas={word.hiragana}
            meanings={word.meaning}
            romanjis={word.romanji}
            text={word.text}
          />
        </View>
        <View className='mb-4 flex-col'>
          <View className='flex-1 flex-row'>
            <Pressable
              className='w-1/2 my-2'
              onPress={() => setIsShowKanji(true)}>
              <Text className='text-text text-center mb-0.5'>Hán tự</Text>
              <View
                className={`w-full h-0.5 ${
                  isShowKanji ? 'bg-line' : 'bg-line-unactive'
                } `}></View>
            </Pressable>
            <Pressable
              className='w-1/2 my-2'
              onPress={() => setIsShowKanji(false)}>
              <Text className='text-text text-center mb-0.5'>Ví dụ</Text>
              <View
                className={`w-full h-0.5 ${
                  !isShowKanji ? 'bg-line' : 'bg-line-unactive'
                } `}></View>
            </Pressable>
          </View>
          {isShowKanji ? (
            word.kanji?.length > 0 ? (
              word.kanji.map((kanji, index) => (
                <View
                  className='flex-1 bg-primary-background m-2 p-2 rounded-md'
                  key={index}>
                  <KanjiLinkItem {...kanji} />
                </View>
              ))
            ) : (
              <Text className='text-text text-center my-4'>Không có Kanji</Text>
            )
          ) : word.examples.length > 0 ? (
            word.examples.map((example, index) => (
              <View
                key={index}
                className='m-2 p-2 bg-primary-background rounded-md'>
                <FuriText
                  reading={example.hiragana}
                  word={example.text}
                  showFuri={true}
                />
                <Text className='text-text-light'>{example.meaning}</Text>
              </View>
            ))
          ) : (
            <Text className='text-text text-center my-4'>Không có ví dụ</Text>
          )}
        </View>
        <View className='mb-3'>
          <View className='mr-3 flex-row gap-2'>
            <View className='h-full bg-primary w-1'></View>
            <Text className='text-text'>Bình luận</Text>
          </View>
          <ListCommentContainer
            initialComments={word.comments}
            isKanjiComment={false}
            mainItemId={id}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default Dictionary;
