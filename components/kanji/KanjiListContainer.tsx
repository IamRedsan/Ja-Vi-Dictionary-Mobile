import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from '../ui/CheckBox';
import PickerSelect from '../ui/PickerSelect';
import { jlptLevelEnum } from '../../constants/jlptLevelEnum';
import CircleLoading from '../loading/CircleLoading';
import KanjiListItem from './KanjiListItem';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useColorScheme } from 'nativewind';
import { KANJI_LIST_PAGESIZE } from '@/constants/PageSize';
import axios from 'axios';
import KanjiListLoading from '../loading/KanjiListLoading';

interface Kanji {
  _id: string;
  text: string;
  phonetic: string[];
}

interface KanjiList {
  '5': Kanji[];
  '4': Kanji[];
  '3': Kanji[];
  '2': Kanji[];
  '1': Kanji[];
}

interface CurPage {
  '5': number;
  '4': number;
  '3': number;
  '2': number;
  '1': number;
}
interface TotalPage {
  '5': number;
  '4': number;
  '3': number;
  '2': number;
  '1': number;
}

const KanjiListContainer: React.FC = () => {
  const [showText, setShowText] = useState<boolean>(true);
  const [showPhonetic, setShowPhonetic] = useState<boolean>(true);
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(true);
  const [jlptLevel, setJlptLevel] = useState<string>('5');
  const [listKanji, setListKanji] = useState<KanjiList>({
    '5': [],
    '4': [],
    '3': [],
    '2': [],
    '1': [],
  });
  const [curPage, setCurPage] = useState<CurPage>({
    '5': 1,
    '4': 1,
    '3': 1,
    '2': 1,
    '1': 1,
  });
  const [totalPage, setTotalPage] = useState<TotalPage>({
    '5': 1,
    '4': 1,
    '3': 1,
    '2': 1,
    '1': 1,
  });

  const getKanjiList = (level: string): Kanji[] =>
    listKanji[level as keyof KanjiList];
  const getCurPage = (level: string): number => curPage[level as keyof CurPage];
  const getToTalPage = (level: string): number =>
    totalPage[level as keyof TotalPage];

  const { colorScheme } = useColorScheme();

  useEffect(() => {
    const loadData = async () => {
      if (!getKanjiList(jlptLevel).length) {
        setIsLoadingTable(true);
        await appendData();
        setIsLoadingTable(false);
      }
    };
    loadData();
  }, [jlptLevel]);

  useEffect(() => {
    const loadMoreData = async () => {
      if (getCurPage(jlptLevel) >= 2) {
        await appendData();
      }
    };
    loadMoreData();
  }, [curPage]);

  const appendData = async () => {
    if (getCurPage(jlptLevel) > getToTalPage(jlptLevel)) return;

    const pageSize = KANJI_LIST_PAGESIZE;
    const currentPage = getCurPage(jlptLevel);

    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/kanjis/jlpt`,
        {
          params: {
            page: currentPage,
            limit: pageSize,
            level: jlptLevel,
          },
        }
      );
      setTotalPage((prevState) => ({
        ...prevState,
        [jlptLevel]: response.data.totalPages,
      }));

      setListKanji((prevState) => ({
        ...prevState,
        [jlptLevel]: [
          ...prevState[jlptLevel as keyof KanjiList],
          ...(response.data.data || null),
        ],
      }));
    } catch (error) {
      //toast ERROR
      setIsLoadingTable(false);
      console.log(error);
    }
  };

  const renderFooter: React.FC = () => {
    return getCurPage(jlptLevel) >= getToTalPage(jlptLevel) ? null : (
      <View className='bg-secondary-background'>
        <CircleLoading></CircleLoading>
      </View>
    );
  };

  const shuffleArray = (array: Kanji[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleShuffleKanji = () => {
    const kanjiListCopy = [...getKanjiList(jlptLevel)];
    const shuffledList = shuffleArray(kanjiListCopy);
    setListKanji((prevState) => ({
      ...prevState,
      [jlptLevel]: shuffledList,
    }));
  };

  return (
    <View className='bg-primary-background h-full flex-col'>
      <View className='flex-row h-auto gap-2 py-5 '>
        <View className='pl-2'>
          <PickerSelect
            className='bg-secondary-background rounded-xl w-24 flex-row justify-between items-center min-h-10 px-1 border-[0.2px]'
            value={jlptLevel}
            items={jlptLevelEnum}
            setValue={(value) => setJlptLevel(value)}
          />
        </View>
        <TouchableOpacity
          className='flex-row bg-secondary-background rounded-xl justify-center items-center gap-2 px-2 border-[0.2px]'
          onPress={() => {
            setShowText(!showText);
          }}>
          <CheckBox
            isCheck={showText}
            onClick={() => {
              setShowText(!showText);
            }}
          />
          <Text className='text-text'>Hán Tự</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='flex-row bg-secondary-background rounded-xl justify-center items-center gap-2 px-2 border-[0.2px]'
          onPress={() => {
            setShowPhonetic(!showPhonetic);
          }}>
          <CheckBox
            isCheck={showPhonetic}
            onClick={() => {
              setShowPhonetic(!showPhonetic);
            }}
          />
          <Text className='text-text'>Hán Việt</Text>
        </TouchableOpacity>
        <View className='flex-grow' />
        <TouchableOpacity
          className='justify-center pr-2'
          onPress={handleShuffleKanji}>
          <FontAwesome6
            name='shuffle'
            size={20}
            color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
          />
        </TouchableOpacity>
      </View>
      {isLoadingTable ? (
        <KanjiListLoading />
      ) : (
        <FlatList
          className='bg-secondary-background mx-4 rounded-xl'
          data={getKanjiList(jlptLevel)}
          renderItem={({ item }) => (
            <View className='w-1/4'>
              <KanjiListItem
                {...item}
                isShowPhonetic={showPhonetic}
                isShowText={showText}
              />
            </View>
          )}
          keyExtractor={(item) => item._id}
          numColumns={4}
          onEndReached={() => {
            if (getCurPage(jlptLevel) < getToTalPage(jlptLevel)) {
              setCurPage((prevState) => ({
                ...prevState,
                [jlptLevel]: prevState[jlptLevel as keyof CurPage] + 1,
              }));
            }
          }}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ paddingBottom: 25 }}
        />
      )}
    </View>
  );
};
export default KanjiListContainer;
