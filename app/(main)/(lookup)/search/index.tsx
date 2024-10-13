import HistoryItem from '@/components/history/HistoryItem';
import KanjiLinkItem from '@/components/word/KanjiLinkItem';
import WordLinkItem from '@/components/word/WordLinkItem';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import debounce from 'debounce';
import ListHistory from '@/components/history/ListHistory';

interface WordResult {
  _id: string;
  text: string;
  hiragana: string;
  meaning: string;
}

interface KanjiResult {
  _id: string;
  text: string;
  phonetic: string[];
  onyomi: string[];
  kunyomi: string[];
}

const Search: React.FC = () => {
  const inputRef = useRef<any>();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearchWord, setIsSearchWord] = useState<boolean>(true);
  const [wordResult, setWordResult] = useState<WordResult[]>([]);
  const [kanjiResult, setKanjiResult] = useState<KanjiResult[]>([]);
  const [history, setHistory] = useState<any>([]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getResult = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/${
          isSearchWord ? 'words' : 'kanjis'
        }/search`,
        {
          params: {
            text: searchValue,
          },
        }
      );
      isSearchWord
        ? setWordResult(response.data.data)
        : setKanjiResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchValue.length === 0 || !searchValue) {
      isSearchWord ? setWordResult([]) : setKanjiResult([]);
    } else {
      debounceGetResult();
    }

    return () => {
      debounceGetResult.clear();
    };
  }, [searchValue]);

  const debounceGetResult = useCallback(debounce(getResult, 500), [
    searchValue,
  ]);

  return (
    <View className='bg-primary-background flex-1 flex-col'>
      <View
        className='bg-primary-foreground pb-2'
        style={{
          paddingTop: insets.top,
        }}>
        <View className='flex-row items-center justify-start gap-2'>
          <TouchableOpacity
            className='pl-1 pr-1.5'
            onPress={() => navigation.goBack()}>
            <Ionicons
              name='chevron-back'
              size={28}
              color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
            />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            value={searchValue}
            onChangeText={setSearchValue}
            className='bg-primary-search w-[75%] rounded-3xl pt-1 pb-3 pl-4 text-text text-lg'
            placeholder='Tra từ vựng, hán tự,...'
            placeholderTextColor={
              colorScheme === 'light' ? '#525356' : '#fefefe'
            }
          />
          <TouchableOpacity className='ml-2'>
            <FontAwesome5
              name='search'
              size={24}
              color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className='w-full flex-row bg-secondary-background py-2 rounded-b-3xl'>
        <TouchableOpacity
          className='w-1/2 h-auto'
          onPress={() => setIsSearchWord(true)}>
          <Text className='text-xl text-text text-center'>Từ vựng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='w-1/2 h-auto'
          onPress={() => setIsSearchWord(false)}>
          <Text className='text-xl text-text text-center'>Hán tự</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row px-6'>
        <View className='w-1/2 flex items-center pr-6'>
          <View
            className={`w-full h-0.5 ${isSearchWord ? 'bg-line' : ''}`}></View>
        </View>
        <View className='w-1/2 flex items-center pl-6'>
          <View
            className={`w-full h-0.5 ${!isSearchWord ? 'bg-line' : ''}`}></View>
        </View>
      </View>
      {searchValue.length === 0 ? (
        <ListHistory />
      ) : (
        <FlatList
          data={(isSearchWord ? wordResult : kanjiResult) as any}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            if (isSearchWord) {
              return <WordLinkItem {...item} />;
            } else {
              return <KanjiLinkItem {...item} />;
            }
          }}
          ListEmptyComponent={<Text>No results found.</Text>}
        />
      )}
    </View>
  );
};
export default Search;
