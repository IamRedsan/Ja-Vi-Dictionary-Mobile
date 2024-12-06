import { useAnkiContext } from '@/context/ankiContext';
import { useAppContext } from '@/context/appContext';
import { AnkiCard, getSchedulingCards } from '@/utils/ankiUtils';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Rating } from 'ts-fsrs';
const ReviewCards = () => {
  const { deckId } = useLocalSearchParams();
  const [loadingGetCards, setLoadingGetCards] = useState(true);
  const { user } = useAppContext();
  const { windowingCards, getWindowingCards, rateCard } = useAnkiContext();
  const [schedulingCards, setSchedulingCards] = useState<
    | {
        [K in Exclude<keyof typeof Rating, 'Manual'>]: {
          timeFromNow: string;
          card: AnkiCard;
        };
      }
    | null
  >(null);

  const currentCard = windowingCards.at(0);

  const handleShowAnswer = () => {
    if (!currentCard) {
      return;
    }

    const schedulingCards = getSchedulingCards(currentCard);
    setSchedulingCards(schedulingCards);
  };

  const handleRateCard = (rating: Exclude<keyof typeof Rating, 'Manual'>) => {
    if (!schedulingCards) {
      return;
    }

    setSchedulingCards(null);
    rateCard(schedulingCards[rating].card);
  };

  useEffect(() => {
    if (typeof deckId !== 'string' || !user) {
      return;
    }

    const getWCs = async () => {
      setLoadingGetCards(true);
      await getWindowingCards(deckId);
      setLoadingGetCards(false);
    };

    getWCs();
  }, [deckId, user]);

  if (loadingGetCards) {
    return (
      <View>
        <Text>loadingGetCards</Text>
        <Text>{windowingCards.length}</Text>
      </View>
    );
  }

  if (!currentCard) {
    return (
      <View>
        <Text>!currentCard</Text>
        <Text>{windowingCards.length}</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Text>Header</Text>
        <Text>{windowingCards.length}</Text>
      </View>
      <ScrollView>
        <View>
          <Text>{currentCard.word}</Text>
        </View>
        {schedulingCards && (
          <View>
            <Text>{currentCard.sentence}</Text>
            <Text>{currentCard.reading}</Text>
            <Text>{currentCard.meaning}</Text>
          </View>
        )}
      </ScrollView>
      {schedulingCards ? (
        <View className='flex flex-row flex-grow'>
          <TouchableOpacity
            onPress={() => {
              handleRateCard('Again');
            }}>
            <View>
              <Text>{schedulingCards.Again.timeFromNow}</Text>
              <Text>Lại</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleRateCard('Hard');
            }}>
            <View>
              <Text>{schedulingCards.Hard.timeFromNow}</Text>
              <Text>Khó</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleRateCard('Good');
            }}>
            <View>
              <Text>{schedulingCards.Good.timeFromNow}</Text>
              <Text>Tốt</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleRateCard('Easy');
            }}>
            <View>
              <Text>{schedulingCards.Easy.timeFromNow}</Text>
              <Text>Dễ</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={handleShowAnswer}>
            <View>
              <Text>Hiển thị kết quả</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default ReviewCards;
