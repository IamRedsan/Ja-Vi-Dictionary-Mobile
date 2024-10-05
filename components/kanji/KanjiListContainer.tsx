import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from '../ui/CheckBox';
import PickerSelect from '../ui/PickerSelect';
import { jlptLevelEnum } from '../../constants/jlptLevelEnum';
import CircleLoading from '../loading/CircleLoading';
import KanjiListItem from './KanjiListItem';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useColorScheme } from 'nativewind';
import KanjiListLoading from '../loading/KanjiLIstLoading';
import { kanjiListN5 } from '@/constants/jlptN5';
import { kanjiListN4 } from '@/constants/jlptN4';

interface Kanji {
  _id: {
    $oid: string;
  };
  text: string;
  phonetic: string;
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

interface IsListEnd {
  '5': boolean;
  '4': boolean;
  '3': boolean;
  '2': boolean;
  '1': boolean;
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
  const [isListEnd, setIsListEnd] = useState<IsListEnd>({
    '5': false,
    '4': false,
    '3': false,
    '2': false,
    '1': false,
  });

  const getKanjiList = (level: string): Kanji[] =>
    listKanji[level as keyof KanjiList];
  const getCurPage = (level: string): number => curPage[level as keyof CurPage];
  const getIsListEnd = (level: string): boolean =>
    isListEnd[level as keyof IsListEnd];

  const { colorScheme } = useColorScheme();

  useEffect(() => {
    const loadData = async () => {
      const waitForTwoSeconds = () => {
        return new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      };
      if (!getKanjiList(jlptLevel).length) {
        setIsLoadingTable(true);
      }
      await waitForTwoSeconds();
      await appendData();
      setIsLoadingTable(false);
    };
    loadData();
  }, [curPage]);

  const appendData = async () => {
    if (getIsListEnd(jlptLevel)) return;

    let newKanjiList: Kanji[] = [];
    const pageSize = 40;
    const currentPage = getCurPage(jlptLevel);

    if (jlptLevel === '5') {
      newKanjiList = kanjiListN5.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    } else if (jlptLevel === '4') {
      newKanjiList = kanjiListN4.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    }

    if (newKanjiList.length === 0) {
      //cái này tạm sau có totalpage sửa sau nha :3
      setIsListEnd((prevState) => ({
        ...prevState,
        [jlptLevel]: true,
      }));

      setCurPage((prevState) => ({
        ...prevState,
        [jlptLevel]: prevState[jlptLevel as keyof CurPage] - 1,
      }));
    } else {
      setListKanji((prevState) => ({
        ...prevState,
        [jlptLevel]: [
          ...prevState[jlptLevel as keyof KanjiList],
          ...newKanjiList,
        ],
      }));
    }
  };

  const renderFooter: React.FC = () => {
    return getIsListEnd(jlptLevel) ? null : (
      <View className="bg-secondary-background">
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
    <View className="bg-primary-background h-full flex-col">
      <View className="flex-row h-auto gap-2 py-5 ">
        <View className="pl-2">
          <PickerSelect
            className="bg-secondary-background rounded-xl w-24 flex-row justify-between items-center min-h-10 px-1 border-[0.2px]"
            value={jlptLevel}
            items={jlptLevelEnum}
            setValue={(value) => setJlptLevel(value)}
          />
        </View>
        <TouchableOpacity
          className="flex-row bg-secondary-background rounded-xl justify-center items-center gap-2 px-2 border-[0.2px]"
          onPress={() => {
            setShowText(!showText);
          }}
        >
          <CheckBox
            isCheck={showText}
            onClick={() => {
              setShowText(!showText);
            }}
          />
          <Text className="text-text">Hán Tự</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row bg-secondary-background rounded-xl justify-center items-center gap-2 px-2 border-[0.2px]"
          onPress={() => {
            setShowPhonetic(!showPhonetic);
          }}
        >
          <CheckBox
            isCheck={showPhonetic}
            onClick={() => {
              setShowPhonetic(!showPhonetic);
            }}
          />
          <Text className="text-text">Hán Việt</Text>
        </TouchableOpacity>
        <View className="flex-grow" />
        <TouchableOpacity
          className="justify-center pr-2"
          onPress={handleShuffleKanji}
        >
          <FontAwesome6
            name="shuffle"
            size={20}
            color={colorScheme === 'light' ? '#343a40' : '#ffbade'}
          />
        </TouchableOpacity>
      </View>
      {isLoadingTable ? (
        <KanjiListLoading></KanjiListLoading>
      ) : (
        <FlatList
          className="bg-secondary-background mx-4 rounded-xl"
          data={getKanjiList(jlptLevel)}
          renderItem={({ item }) => (
            <View className="w-1/4">
              <KanjiListItem
                {...item}
                isShowPhonetic={showPhonetic}
                isShowText={showText}
              />
            </View>
          )}
          keyExtractor={(item) => item._id.$oid}
          numColumns={4}
          onEndReached={() => {
            if (!getIsListEnd(jlptLevel)) {
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
