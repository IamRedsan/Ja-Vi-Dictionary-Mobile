import { WordLoading, ItemLoading } from '@/components/loading/WordLoading';
import { FuriText } from '@/components/word/FuriText';
import WordContainer from '@/components/word/WordContainer';
import axios from 'axios';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isShowKanji, setIsShowKanji] = useState<boolean>(true);

  const getWord = async (_id: string) => {
    //api that xoa dong nay
    _id = '66fe9ba4bcfa183ab0c8ca19';

    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/words/${_id}`
      );
      setWord(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      <ScrollView className="bg-primary-background">
        <View className="flex-col m-4 bg-secondary-background rounded-xl">
          <WordLoading />
          <View className="flex-1 flex-row">
            <View className="w-1/2 my-2">
              <Text className="text-text text-center mb-0.5">Hán tự</Text>
              <View className="w-full h-0.5 bg-line"></View>
            </View>
            <View className="w-1/2 my-2">
              <Text className="text-text text-center mb-0.5">Ví dụ</Text>
              <View className="w-full h-0.5 bg-line-unactive"></View>
            </View>
          </View>
          <ItemLoading />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="bg-primary-background">
      <View className="flex-col m-4 bg-secondary-background rounded-xl gap-8">
        <WordContainer
          _id={word._id}
          hiraganas={word.hiragana}
          meanings={word.meaning}
          romanjis={word.romanji}
          text={word.text}
        />
        <View className="mb-4 flex-col">
          <View className="flex-1 flex-row">
            <Pressable
              className="w-1/2 my-2"
              onPress={() => setIsShowKanji(true)}
            >
              <Text className="text-text text-center mb-0.5">Hán tự</Text>
              <View
                className={`w-full h-0.5 ${
                  isShowKanji ? 'bg-line' : 'bg-line-unactive'
                } `}
              ></View>
            </Pressable>
            <Pressable
              className="w-1/2 my-2"
              onPress={() => setIsShowKanji(false)}
            >
              <Text className="text-text text-center mb-0.5">Ví dụ</Text>
              <View
                className={`w-full h-0.5 ${
                  !isShowKanji ? 'bg-line' : 'bg-line-unactive'
                } `}
              ></View>
            </Pressable>
          </View>
          {isShowKanji ? (
            word.kanji?.map((kanji) => (
              <Link href={`/kanji/${kanji._id}`} key={kanji._id} asChild>
                <TouchableOpacity className="flex-row bg-primary-background m-2 p-2 rounded-md">
                  <View className="w-1/8 justify-center">
                    <Text className="text-text text-5xl text-center">
                      {kanji.text}
                    </Text>
                  </View>
                  <View className="w-7/8 flex-col ml-2">
                    <View className="h-fit w-full mb-1">
                      <Text className="text-text-light text-lg">
                        {kanji.phonetic ? kanji.phonetic.join(', ') : 'N/A'}
                      </Text>
                    </View>

                    <View className="h-fit w-full">
                      <Text className="text-text-light text-md">
                        On: {kanji.onyomi ? kanji.onyomi.join(', ') : 'N/A'}
                        Kun: {kanji.kunyomi ? kanji.kunyomi.join(', ') : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <View>
              {word.examples.map((example) => (
                <View
                  key={example._id}
                  className="m-2 p-2 bg-primary-background rounded-md"
                >
                  <FuriText
                    reading={example.hiragana}
                    word={example.text}
                    showFuri={true}
                  />
                  <Text className="text-text-light">{example.meaning}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View>
          <Text>Comment</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default Dictionary;
