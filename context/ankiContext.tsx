import {
  Action,
  AnkiCard,
  createCard as createFsrsCard,
  mapCard,
  mapDeck,
  WordType,
} from '@/utils/ankiUtils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './appContext';
import { useSQLiteContext } from 'expo-sqlite';
import {
  deleteDeckById,
  getAllDecksInfo,
  createDeck as createDeckQuery,
  updateDeck as updateDeckQuery,
  createCardQuery,
  getAllCardsByDeckIdAndSearchQuery,
  getCardByIdQuery,
  updateCardQuery,
  getCardsLearningByDeckIdQuery,
  getQuantityCardLearningByDeckIdToday,
  createReviewLogQuery,
} from '@/constants/Query';
import { ReviewLog, State } from 'ts-fsrs';

export type Deck = {
  id: number;
  name: string;
  newCardQuantity: number;
  createdDate: Date;
  updatedDate: Date;
  localUpdatedDate: Date;
  new: number;
  learning: number;
  review: number;
};

export type AnkiStateType = {
  decks: Deck[];
  windowingCards: AnkiCard[];
  curDeckId?: number;
  browseCards: AnkiCard[];
  browseSearch: string;
  browseLoading: boolean;
};

export type AnkiContextType = AnkiStateType & {
  getWindowingCards: (
    deckId: string,
    deckNewLearnQuantity: number
  ) => Promise<void>;
  rateCard: (card: AnkiCard, reviewLog: ReviewLog) => Promise<void>;
  deleteDeck: (deckId: number) => Promise<void>;
  createDeck: (deck: Omit<Deck, 'id'>) => Promise<void>;
  updateDeck: (deck: any) => Promise<void>;
  createCard: (deckId: number, data: WordType) => Promise<AnkiCard>;
  updateCard: (card: AnkiCard) => Promise<void>;
  getBrowseCards: (deckId: number, search: string) => Promise<void>;
  getCardById: (id: number) => Promise<AnkiCard | null>;
  setCurDeckId: (deckId: number) => void;
  setBrowseSearch: (search: string) => void;
};

export const AnkiContext = createContext<AnkiContextType | null>(null);

const initialState: AnkiStateType = {
  decks: [],
  windowingCards: [],
  browseCards: [],
  browseSearch: '',
  browseLoading: false,
};

const AnkiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAppContext();
  const [state, setState] = useState<AnkiStateType>(initialState);
  const db = useSQLiteContext();

  const getDecks = async () => {
    try {
      const decks: any[] = await db.getAllAsync(getAllDecksInfo);

      // Chờ tất cả các Promise hoàn tất trước khi cập nhật state
      const updatedDecks = await Promise.all(
        decks.map(async (deck) => {
          const learnedCards = await getNewCardLearnedToday(deck.id);
          return { ...deck, new: deck.new - learnedCards };
        })
      );
      setState({
        ...state,
        decks: updatedDecks.map(mapDeck),
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách các bộ bài:', error);
    }
  };

  const deleteDeck = async (deckId: number) => {
    await db.runAsync(deleteDeckById, deckId);
    setState((prevState) => ({
      ...prevState,
      decks: prevState.decks.filter((deck) => deck.id !== deckId),
    }));
  };

  const createDeck = async (deck: Omit<Deck, 'id'>) => {
    const newDecksArray = [
      deck.name,
      deck.createdDate.toISOString(),
      deck.updatedDate.toISOString(),
      deck.newCardQuantity,
      Action.CREATE,
      deck.localUpdatedDate.toISOString(),
    ];
    const result = await db.runAsync(createDeckQuery, newDecksArray);
    const newDeck = { ...deck, id: result.lastInsertRowId };
    setState((prevState) => ({
      ...prevState,
      decks: [...prevState.decks, newDeck],
    }));
  };

  const updateDeck = async (deck: Deck) => {
    const updatedDecksArray = [
      deck.name,
      deck.updatedDate.toISOString(),
      deck.newCardQuantity,
      Action.UPDATE,
      deck.localUpdatedDate.toISOString(),
      deck.id!,
    ];
    await db.runAsync(updateDeckQuery, updatedDecksArray);
    getDecks();
  };

  const rateCard = async (card: AnkiCard, reviewLog: ReviewLog) => {
    setState(({ windowingCards, ...rest }) => {
      const now = new Date();
      now.setHours(23, 59, 59, 999);

      const updatedCards: AnkiCard[] = [];
      let inserted = false;

      for (const existingCard of windowingCards) {
        if (existingCard.id === card.id) {
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
      let counts: {
        new: number;
        learning: number;
        review: number;
      } | null;
      if (inserted) {
        const decks = state.decks.find(({ id }) => id === state.curDeckId);

        counts = {
          new: decks?.new ?? 0,
          learning: decks?.learning ?? 0,
          review: decks?.review ?? 0,
        };
        switch (reviewLog.state) {
          case State.New:
            counts.new--;
          case State.Review:
            counts.review--;
          default:
            counts.learning--;
        }
        switch (card.state) {
          case State.New:
            counts.new++;
          case State.Review:
            counts.review++;
          default:
            counts.learning++;
        }
      }
      updateCard(card);
      createReviewLog(reviewLog, card.deckId, card.id!);
      setState({
        ...state,
        decks: state.decks.map((deck) => {
          // if (deck.id === state.curDeckId && counts) {
          //   return { ...deck, ...counts };
          // } else {
          //   return deck;
          // }
          return { ...deck, new: 0 };
        }),
      });
      return {
        ...rest,
        windowingCards: updatedCards,
      };
    });
  };

  const getWindowingCards = async (
    deckId: string,
    deckNewLearnQuantity: number
  ) => {
    const todayLearningCard = await getNewCardLearnedToday(
      parseInt(deckId, 10)
    );
    let todayLearningCardLeft: number;
    if (todayLearningCard) {
      todayLearningCardLeft = deckNewLearnQuantity - todayLearningCard;
    } else {
      todayLearningCardLeft = deckNewLearnQuantity;
    }
    const windowingCards: AnkiCard[] = await db.getAllAsync(
      getCardsLearningByDeckIdQuery,
      [parseInt(deckId, 10), todayLearningCardLeft, parseInt(deckId, 10)]
    );

    setState({ ...state, windowingCards: windowingCards.map(mapCard) });
  };

  const createCard = async (deckId: number, data: WordType) => {
    const card = createFsrsCard(deckId, data);

    const curDate = new Date().toISOString();
    const result = await db.runAsync(createCardQuery, [
      curDate,
      curDate,
      card.word,
      card.sentence,
      card.reading,
      card.meaning,
      card.difficulty,
      card.due.toISOString(),
      card.elapsed_days,
      card.lapses,
      null,
      card.reps,
      card.scheduled_days,
      card.stability,
      card.state,
      card.deckId,
      curDate,
      Action.CREATE,
    ]);

    card.id = result.lastInsertRowId;

    await getDecks();

    return card;
  };

  const updateCard = async (card: AnkiCard) => {
    if (!card.id) throw Error();

    const curDate = new Date().toISOString();
    const lastReview = card.last_review ? card.last_review.toISOString() : null;
    await db.runAsync(updateCardQuery, [
      card.word,
      card.sentence,
      card.reading,
      card.meaning,
      card.difficulty,
      card.due.toISOString(),
      card.elapsed_days,
      card.lapses,
      lastReview,
      card.reps,
      card.scheduled_days,
      card.stability,
      card.state,
      card.deckId,
      curDate,
      Action.UPDATE,
      card.id,
    ]);
  };

  const getBrowseCards = async (deckId: number, search: string) => {
    setState((prev) => ({ ...prev, browseLoading: true }));

    const cards: any[] = await db.getAllAsync(
      getAllCardsByDeckIdAndSearchQuery,
      [deckId, search, search, search, search]
    );

    setState((prev) => ({
      ...prev,
      browseCards: cards.map(mapCard),
      browseLoading: false,
    }));
  };

  const setBrowseSearch = (search: string) => {
    setState((prev) => ({ ...prev, browseSearch: search }));
  };

  const setCurDeckId = (deckId: number) => {
    setState((prev) => ({ ...prev, curDeckId: deckId }));
  };

  const getCardById = async (id: number) => {
    const card: any = await db.getFirstAsync(getCardByIdQuery, [id]);

    if (!card) return null;

    return mapCard(card);
  };

  const getNewCardLearnedToday = async (deckId: number) => {
    const todayLearnedCard: { learned_cards: number } | null =
      await db.getFirstAsync(getQuantityCardLearningByDeckIdToday, [deckId]);
    return todayLearnedCard?.learned_cards ?? 0;
  };

  const createReviewLog = async (
    reviewLog: ReviewLog,
    deckId: number,
    cardId: number
  ) => {
    await db.runAsync(createReviewLogQuery, [
      reviewLog.difficulty,
      reviewLog.due.toISOString(),
      reviewLog.elapsed_days,
      reviewLog.last_elapsed_days,
      reviewLog.rating,
      reviewLog.review.toISOString(),
      reviewLog.scheduled_days,
      reviewLog.stability,
      reviewLog.state,
      Action.CREATE,
      deckId,
      cardId,
    ]);
  };

  useEffect(() => {
    if (user) {
      getDecks();
    }
  }, [user, state.decks]);

  return (
    <AnkiContext.Provider
      value={{
        ...state,
        deleteDeck,
        createDeck,
        updateDeck,
        getWindowingCards,
        rateCard,
        createCard,
        getBrowseCards,
        updateCard,
        getCardById,
        setCurDeckId,
        setBrowseSearch,
      }}>
      {children}
    </AnkiContext.Provider>
  );
};

export const useAnkiContext = () => {
  return useContext(AnkiContext) as AnkiContextType;
};

export default AnkiProvider;
