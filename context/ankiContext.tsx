import { AnkiCard, createCard } from '@/utils/ankiUtils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './appContext';
import { useSQLiteContext } from 'expo-sqlite';
import { getAllDecksInfo } from '@/constants/Query';

export type Deck = {
  _id: string;
  name: string;
  new: number;
  learning: number;
  review: number;
};

export type AnkiStateType = {
  decks: Deck[];
  windowingCards: AnkiCard[];
};

export type AnkiContextType = AnkiStateType & {
  getWindowingCards: (deckId: string) => Promise<void>;
  rateCard: (card: AnkiCard) => Promise<void>;
};

export const AnkiContext = createContext<AnkiContextType | null>(null);

const initialState: AnkiStateType = {
  decks: [],
  windowingCards: [],
};

const AnkiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAppContext();
  const [state, setState] = useState<AnkiStateType>(initialState);
  const db = useSQLiteContext();

  const getDecks = async () => {
    const decks: any = await db.getAllAsync(getAllDecksInfo);
    setState({ ...state, decks });
  };

  const rateCard = async (card: AnkiCard) => {
    setState(({ windowingCards, ...rest }) => {
      const now = new Date();
      now.setHours(23, 59, 59, 999);

      const updatedCards: AnkiCard[] = [];
      let inserted = false;

      for (const existingCard of windowingCards) {
        if (existingCard._id === card._id) {
          continue;
        }

        if (!inserted && card.due < now && card.due < existingCard.due) {
          updatedCards.push(card);
          inserted = true;
        }

        updatedCards.push(existingCard);
      }

      if (!inserted && card.due < now) {
        updatedCards.push(card);
      }

      return { ...rest, windowingCards: updatedCards };
    });
  };

  const getWindowingCards = async (deckId: string) => {
    const windowingCards = [];

    windowingCards.push({
      ...createCard(deckId, {
        word: 'ありがとう',
        sentence: 'ありがとう、あなたのおかげで元気です。',
        reading: 'ありがとう、あなたのおかげでげんきです。',
        meaning: 'Cảm ơn, nhờ có bạn tôi mới khỏe mạnh.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: 'こんにちは',
        sentence: 'こんにちは、今日はいい天気ですね。',
        reading: 'こんにちは、きょうはいいてんきですね。',
        meaning: 'Xin chào, hôm nay trời đẹp nhỉ.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '食べる',
        sentence: '私は毎朝パンを食べます。',
        reading: 'わたしはまいあさぱんをたべます。',
        meaning: 'Tôi ăn bánh mì mỗi sáng.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '行く',
        sentence: '明日、友達と公園に行きます。',
        reading: 'あした、ともだちとこうえんにいきます。',
        meaning: 'Ngày mai tôi sẽ đi công viên với bạn bè.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '見る',
        sentence: '映画を見に行きます。',
        reading: 'えいがをみにいきます。',
        meaning: 'Tôi sẽ đi xem phim.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '寝る',
        sentence: '今日は早く寝ます。',
        reading: 'きょうははやくねます。',
        meaning: 'Hôm nay tôi sẽ đi ngủ sớm.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '大きい',
        sentence: 'その犬はとても大きいです。',
        reading: 'そのいぬはとてもおおきいです。',
        meaning: 'Con chó đó rất to.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '新しい',
        sentence: '新しい本を買いました。',
        reading: 'あたらしいほんをかいました。',
        meaning: 'Tôi đã mua một cuốn sách mới.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '楽しい',
        sentence: '今日はとても楽しい一日でした。',
        reading: 'きょうはとてもたのしいいちにちでした。',
        meaning: 'Hôm nay là một ngày rất vui.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    windowingCards.push({
      ...createCard(deckId, {
        word: '難しい',
        sentence: 'その問題はとても難しいです。',
        reading: 'そのもんだいはとてもむずかしいです。',
        meaning: 'Bài toán đó rất khó.',
      }),
      _id: `${Math.floor(Math.random() * 1000000)}`,
    });

    setState({ ...state, windowingCards });
  };

  useEffect(() => {
    if (user) {
      getDecks();
    }
  }, [user]);

  return (
    <AnkiContext.Provider value={{ ...state, getWindowingCards, rateCard }}>
      {children}
    </AnkiContext.Provider>
  );
};

export const useAnkiContext = () => {
  return useContext(AnkiContext) as AnkiContextType;
};

export default AnkiProvider;
