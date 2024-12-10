import CardHeader from '@/components/anki/CardHeader';
import CardInput from '@/components/anki/CardInput';
import Button from '@/components/ui/Button';
import DropdownWithLabel from '@/components/ui/DropdownWithLabel';
import { useAnkiContext } from '@/context/ankiContext';
import { AnkiCard, WordType } from '@/utils/ankiUtils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';

const Card = () => {
  const {
    decks,
    getCardById,
    createCard,
    updateCard,
    curDeckId,
    setCurDeckId,
    getBrowseCards,
    browseSearch,
  } = useAnkiContext();
  const mappedDecks = useMemo(() => {
    return decks.map(({ id, name }) => ({ value: String(id), label: name }));
  }, [decks]);
  const { id }: { id: string } = useLocalSearchParams();
  const [card, setCard] = useState<AnkiCard | null>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [values, setValues] = useState<WordType>({
    meaning: '',
    reading: '',
    sentence: '',
    word: '',
  });

  const handleChangeText = (key: keyof WordType, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!curDeckId) return;

    if (id && card) {
      card.word = values.word;
      card.sentence = values.sentence;
      card.reading = values.reading;
      card.meaning = values.meaning;

      setLoading(true);
      await updateCard(card);
      setLoading(false);

      if (router.canGoBack()) {
        getBrowseCards(curDeckId, browseSearch);
        router.back();
      }
    } else {
      setLoading(true);
      await createCard(curDeckId, values);
      getBrowseCards(curDeckId, browseSearch);
      setValues({ meaning: '', reading: '', sentence: '', word: '' });
      setLoading(false);
    }
  };

  const handleChangeDeck = (deckId: string) => {
    setCurDeckId(Number.parseInt(deckId));
  };

  useEffect(() => {
    if (id) {
      const getCard = async () => {
        setLoading(true);

        const card = await getCardById(Number.parseInt(id));
        if (!card) {
          setLoading(false);
          return;
        }

        setCard(card);
        setValues({
          meaning: card.meaning,
          reading: card.reading,
          sentence: card.sentence,
          word: card.word,
        });

        setLoading(false);
      };
      getCard();
    }
  }, [id]);

  return (
    <View className='relative flex-1 bg-primary-background'>
      <CardHeader />
      <ScrollView>
        <DropdownWithLabel
          iconName='book'
          label='Bộ thẻ'
          placeholder='Chọn bộ thẻ'
          data={mappedDecks}
          value={String(curDeckId)}
          onChange={handleChangeDeck}
          disabled={loading}
        />
        <CardInput
          label='Từ vựng'
          value={values.word}
          onChange={(value) => handleChangeText('word', value)}
          disabled={loading}
        />
        <CardInput
          label='Câu ví dụ'
          value={values.sentence}
          onChange={(value) => handleChangeText('sentence', value)}
          disabled={loading}
        />
        <CardInput
          label='Cách đọc'
          value={values.reading}
          onChange={(value) => handleChangeText('reading', value)}
          disabled={loading}
        />
        <CardInput
          label='Ý nghĩa'
          value={values.meaning}
          onChange={(value) => handleChangeText('meaning', value)}
          disabled={loading}
        />
      </ScrollView>
      <Button
        className='absolute bottom-4 left-[50%] w-[300px] translate-x-[-150px]'
        onPress={handleSubmit}
        disabled={loading}>
        {id ? 'Cập nhật thẻ' : 'Tạo thẻ'}
      </Button>
    </View>
  );
};
export default Card;
