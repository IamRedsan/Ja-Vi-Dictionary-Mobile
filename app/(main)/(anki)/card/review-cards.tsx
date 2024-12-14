import { FuriText } from '@/components/word/FuriText';
import { CardCounts, Deck, useAnkiContext } from '@/context/ankiContext';
import { AnkiCard, getSchedulingCards } from '@/utils/ankiUtils';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import { cssInterop, useColorScheme } from 'nativewind';
import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import { Rating, ReviewLog } from 'ts-fsrs';
import CircleSpin from '@/components/loading/CircleSpin';
cssInterop(Entypo, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});
cssInterop(FontAwesome5, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});
cssInterop(FontAwesome5, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});
const ReviewCards = () => {
  const { deckId }: { deckId: string } = useLocalSearchParams();
  const [loadingGetCards, setLoadingGetCards] = useState(true);
  const {
    windowingCards,
    getWindowingCards,
    rateCard,
    decks,
    reloadWindowingCards,
    setReloadWindowingCards,
  } = useAnkiContext();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const [schedulingCards, setSchedulingCards] = useState<
    | {
        [K in Exclude<keyof typeof Rating, 'Manual'>]: {
          timeFromNow: string;
          card: AnkiCard;
          log: ReviewLog;
        };
      }
    | null
  >(null);

  const deck = useMemo(
    () => decks.find(({ id }) => id === Number.parseInt(deckId)),
    [decks, deckId]
  );

  const currentCard = windowingCards.at(0);

  const handleShowAnswer = () => {
    if (!currentCard) {
      return;
    }

    const schedulingCards = getSchedulingCards(currentCard);
    setSchedulingCards(schedulingCards);
  };

  const handleRateCard = async (
    rating: Exclude<keyof typeof Rating, 'Manual'>
  ) => {
    if (!schedulingCards) {
      return;
    }

    await rateCard(schedulingCards[rating].card, schedulingCards[rating].log);
    setSchedulingCards(null);
  };

  const handleBackCard = () => {};

  useEffect(() => {
    if (!reloadWindowingCards) return;

    const getWCs = async () => {
      setLoadingGetCards(true);
      await getWindowingCards();
      setLoadingGetCards(false);
      setReloadWindowingCards(false);
    };

    getWCs();
  }, [deck, reloadWindowingCards]);

  useEffect(() => {
    setReloadWindowingCards(true);
  }, []);

  if (loadingGetCards) {
    return <CircleSpin />;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsOptionsVisible(false);
      }}>
      <View className='bg-primary-background flex-1'>
        <View className='bg-primary-foreground p-3'>
          <View className='flex-row items-center justify-between px-3'>
            <Text className='text-2xl text-center text-text'>Thẻ ghi nhớ</Text>
            <View className='flex-row gap-4'>
              <TouchableOpacity onPress={handleBackCard}>
                <AntDesign name='back' className='text-2xl text-icon' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsOptionsVisible(!isOptionsVisible);
                }}>
                <Entypo
                  name='dots-three-vertical'
                  className='text-2xl text-icon'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {!currentCard ? (
          <View className='bg-primary-background flex-1 p-6 gap-6'>
            <Text className='text-primary font-bold text-3xl text-center mt-4'>
              Xin chúc mừng! Hiện giờ bạn đã học xong bộ thẻ này.
            </Text>
            <Text className='text-text text-lg mt-4'>
              Đã đến giới hạn trong ngày hôm nay, nhưng vẫn còn nhiều thẻ đang
              chờ ôn tập. Để giúp trí nhớ hoạt động hiệu quả hơn, bạn có thể xem
              xét tăng giới hạn hàng ngày trong phần tùy chọn.
            </Text>
            <Text className='text-text text-lg mt-4'>
              Vẫn còn nhiều thẻ nữa, nhưng đã đến giới hạn hàng ngày. Bạn có thể
              tăng thêm giới hạn trong phần tùy chọn, nhưng cần nhớ rằng bạn
              càng đưa ra nhiều thẻ mới thì gánh nặng ôn tập trong thời gian
              ngắn đối với bạn ngày càng cao hơn.
            </Text>
            <Text className='text-text text-lg mt-4'>
              Nếu bạn muốn học thêm thẻ mới, bạn có thể chỉnh sửa giới hạn của
              bộ thẻ này{' '}
              <Text
                onPress={() => {
                  router.push({
                    pathname: '/(main)/(anki)/update-deck',
                    params: { deckId: deckId, fromPath: 'review-cards' },
                  });
                }}
                className='text-primary text-lg font-semibold underline'>
                Chỉnh sửa
              </Text>
            </Text>
          </View>
        ) : (
          <View className='bg-primary-background h-full flex-1'>
            <ScrollView>
              <View className='flex-1 items-center mt-8'>
                <Text className='text-text text-[40px] font-bold mb-4'>
                  {currentCard.word}
                </Text>
              </View>
              {schedulingCards && (
                <View className='flex-1 flex-col items-center justify-center gap-4'>
                  <View className='w-[90%] bg-primary h-[1.5px]' />
                  <View className='gap-2'>
                    <View className='flex-row gap-2 items-stretch'>
                      <View className=' bg-primary p-2 justify-center rounded-md'>
                        <Text className='text-text-button'>例</Text>
                      </View>
                      <FuriText
                        reading={currentCard.reading}
                        word={currentCard.sentence}
                        showFuri={true}
                        size='big'
                      />
                    </View>
                    <View className='flex-row gap-2 items-stretch'>
                      <View className='bg-primary p-2 items-center justify-center rounded-md'>
                        <Text className='text-text-button'>意</Text>
                      </View>
                      <Text className='text-text text-lg text-center'>
                        {currentCard.meaning}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
            <View className='flex-row items-center justify-center gap-3'>
              <Text
                className={`text-lg text-[#93C5FD] text-right ${
                  currentCard.state === 0 ? 'underline' : ''
                }`}>
                {deck?.new ?? 0}
              </Text>
              <Text
                className={`text-lg text-[#F87171] text-right ${
                  currentCard.state === 1 || currentCard.state === 3
                    ? 'underline'
                    : ''
                }`}>
                {deck?.learning ?? 0}
              </Text>
              <Text
                className={`text-lg text-[#22C55E] text-right ${
                  currentCard.state === 2 ? 'underline' : ''
                }`}>
                {deck?.review ?? 0}
              </Text>
            </View>
            {schedulingCards ? (
              <View className='flex flex-row items-center justify-center gap-4 m-3 border-[0.2px] border-gray-950 self-center'>
                <TouchableOpacity
                  className='py-2 pl-4'
                  onPress={() => {
                    handleRateCard('Again');
                  }}>
                  <View>
                    <Text className='text-[#F87171] text-center'>
                      {schedulingCards.Again.timeFromNow}
                    </Text>
                    <Text className='text-[#F87171] text-center'>Lại</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className='border-l-[0.2px] py-2 pl-4'
                  onPress={() => {
                    handleRateCard('Hard');
                  }}>
                  <View>
                    <Text className='text-text text-center'>
                      {schedulingCards.Hard.timeFromNow}
                    </Text>
                    <Text className='text-text text-center'>Khó</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className='border-l-[0.2px] py-2 pl-4'
                  onPress={() => {
                    handleRateCard('Good');
                  }}>
                  <View>
                    <Text className='text-[#22C55E] text-center'>
                      {schedulingCards.Good.timeFromNow}
                    </Text>
                    <Text className='text-[#22C55E] text-center'>Tốt</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className='border-l-[0.2px] py-2 px-4'
                  onPress={() => {
                    handleRateCard('Easy');
                  }}>
                  <View>
                    <Text className='text-[#93C5FD] text-center'>
                      {schedulingCards.Easy.timeFromNow}
                    </Text>
                    <Text className='text-[#93C5FD] text-center'>Dễ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  className='items-center bg-secondary-background p-3 m-2 rounded-full self-center border-gray-950 border-[0.2px]'
                  onPress={handleShowAnswer}>
                  <Text className='text-text'>Hiện đáp án</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {isOptionsVisible && (
          <View
            className={`absolute bg-tertiary-background rounded-lg right-8 top-16 border-[0.2px] ${
              colorScheme === 'light' ? ' border-gray-300 ' : 'border-gray-950'
            }`}>
            <TouchableHighlight
              className='rounded-t-lg'
              underlayColor={colorScheme === 'light' ? '#e1e1e1' : '#323232'}
              activeOpacity={0.6}
              onPress={() => {
                router.push({
                  pathname: '/(main)/(anki)/card',
                  params: {
                    id: currentCard?.id,
                    fromPath: 'review-cards',
                  },
                });
              }}>
              <View className='py-3 px-4 flex-row gap-4 items-center'>
                <FontAwesome5 name='pen' className='text-text text-lg' />
                <Text className='text-text'>Chỉnh sửa thẻ</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              className='rounded-b-lg'
              underlayColor={colorScheme === 'light' ? '#e1e1e1' : '#323232'}
              activeOpacity={0.6}
              onPress={() => {
                router.push({
                  pathname: '/(main)/(anki)/card/delete-card',
                  params: {
                    cardId: currentCard?.id,
                    fromPath: 'review-cards',
                  },
                });
              }}>
              <View className='py-3 px-4 flex-row gap-4 items-center'>
                <FontAwesome5 name='trash' className='text-text text-lg' />
                <Text className='text-text'>Xóa thẻ</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ReviewCards;
