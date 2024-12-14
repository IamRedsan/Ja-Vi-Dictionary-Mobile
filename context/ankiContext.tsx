import {
  Action,
  AnkiCard,
  createCard as createFsrsCard,
  getBeNotGone,
  mapCard,
  mapDeck,
  WordType,
} from '@/utils/ankiUtils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './appContext';
import { useSQLiteContext } from 'expo-sqlite';
import {
  createCardQuery,
  createDeckQuery,
  createReviewLogQuery,
  deleteCardQuery,
  deleteCardsByDeckIdQuery,
  deleteDeckQuery,
  deleteReviewLogsByCardIdQuery,
  deleteReviewLogsByDeckIdQuery,
  getCardQuery,
  getCardsQuery,
  getDecksQuery,
  getNewCardLearnedTodayCountsQuery,
  getTodayCardCountsQuery,
  getWindowingCardsQuery,
  updateCardQuery,
  updateDeckQuery,
} from '@/constants/Query';
import { ReviewLog, State } from 'ts-fsrs';

export interface Deck {
  id: number;
  name: string;
  newCardQuantity: number;
  createdDate: Date;
  updatedDate: Date;
  localUpdatedDate: Date;
  action: Action;
}

export interface CardCounts {
  id: number;
  new: number;
  learning: number;
  review: number;
}

export type AnkiStateType = {
  decks: (Deck & CardCounts)[];
  windowingCards: AnkiCard[];
  reloadWindowingCards: boolean;
  curDeckId?: number;
  browseCards: AnkiCard[];
  browseSearch: string;
  browseLoading: boolean;
};

export type AnkiContextType = AnkiStateType & {
  getDecks: () => Promise<void>;
  deleteDeck: (deckId: number) => Promise<void>;
  createDeck: (name: string, newCardQuantity: number) => Promise<void>;
  updateDeck: (deck: Deck) => Promise<void>;
  rateCard: (card: AnkiCard, reviewLog: ReviewLog) => Promise<void>;
  getWindowingCards: () => Promise<void>;
  setReloadWindowingCards: (value: boolean) => void;
  createCard: (deckId: number, data: WordType) => Promise<void>;
  updateCard: (card: AnkiCard) => Promise<void>;
  deleteCard: (cardId: number) => Promise<void>;
  getBrowseCards: () => Promise<void>;
  setBrowseSearch: (search: string) => void;
  setCurDeckId: (deckId: number) => void;
  getCardById: (id: number) => Promise<AnkiCard | null>;
  createReviewLog: (
    reviewLog: ReviewLog,
    deckId: number,
    cardId: number
  ) => Promise<void>;
};

export const AnkiContext = createContext<AnkiContextType | null>(null);

const initialState: AnkiStateType = {
  decks: [],
  windowingCards: [],
  reloadWindowingCards: false,
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
    const beNotGone = getBeNotGone();
    const oneDayBefore = new Date(
      new Date(beNotGone).getTime() - 24 * 60 * 60 * 1000
    ).toISOString();

    const decks = (await db.getAllAsync(getDecksQuery)).map(mapDeck);
    const todayCardCounts: CardCounts[] = await db.getAllAsync(
      getTodayCardCountsQuery,
      [beNotGone]
    );
    const newCardLearnedTodayCounts: { id: number; new: number }[] =
      await db.getAllAsync(getNewCardLearnedTodayCountsQuery, [
        oneDayBefore,
        beNotGone,
      ]);

    setState((prev) => ({
      ...prev,
      decks: decks.map((deck) => {
        const todayCardCount = todayCardCounts.find(
          ({ id }) => id === deck.id
        ) ?? {
          id: deck.id,
          learning: 0,
          new: 0,
          review: 0,
        };
        const newCardLearnedTodayCount = newCardLearnedTodayCounts.find(
          ({ id }) => id === deck.id
        ) ?? { id: deck.id, new: 0 };

        if (
          todayCardCount.new + newCardLearnedTodayCount.new >=
          deck.newCardQuantity
        ) {
          const residualNewCardCount =
            todayCardCount.new +
            newCardLearnedTodayCount.new -
            deck.newCardQuantity;
          todayCardCount.new -= residualNewCardCount;
        }

        return { ...deck, ...todayCardCount };
      }),
    }));
  };

  const deleteDeck = async (deckId: number) => {
    const curDate = new Date().toISOString();

    await db.runAsync(deleteDeckQuery, [curDate, deckId]);
    await db.runAsync(deleteCardsByDeckIdQuery, [curDate, deckId]);
    await db.runAsync(deleteReviewLogsByDeckIdQuery, [curDate, deckId]);
  };

  const createDeck = async (name: string, newCardQuantity: number) => {
    const curDate = new Date().toISOString();
    await db.runAsync(createDeckQuery, [
      name,
      newCardQuantity,
      curDate,
      curDate,
      curDate,
    ]);
  };

  const updateDeck = async (deck: Deck) => {
    const curDate = new Date().toISOString();
    await db.runAsync(updateDeckQuery, [
      deck.name,
      deck.newCardQuantity,
      curDate,
      deck.id,
    ]);
  };

  const rateCard = async (card: AnkiCard, reviewLog: ReviewLog) => {
    await updateCard(card);
    await createReviewLog(reviewLog, card.deckId, card.id);

    setState(({ windowingCards, decks, ...rest }) => {
      const beNotGone = new Date(getBeNotGone());

      const updatedCards: AnkiCard[] = [];
      let inserted = false;

      for (const existingCard of windowingCards) {
        if (existingCard.id === card.id) {
          continue;
        }

        if (!inserted && card.due <= beNotGone && card.due < existingCard.due) {
          updatedCards.push(card);
          inserted = true;
        }

        updatedCards.push(existingCard);
      }

      if (!inserted && card.due <= beNotGone) {
        updatedCards.push(card);
        inserted = true;
      }

      const deck = decks.find(({ id }) => id === card.deckId);

      const cardCounts: CardCounts = {
        id: deck?.id ?? -1,
        learning: deck?.learning ?? 0,
        new: deck?.new ?? 0,
        review: deck?.review ?? 0,
      };

      switch (reviewLog.state) {
        case State.New:
          --cardCounts.new;
          break;
        case State.Review:
          --cardCounts.review;
          break;
        default:
          --cardCounts.learning;
      }

      if (inserted) {
        switch (card.state) {
          case State.New:
            ++cardCounts.new;
            break;
          case State.Review:
            ++cardCounts.review;
            break;
          default:
            ++cardCounts.learning;
        }
      }

      return {
        ...rest,
        windowingCards: updatedCards,
        decks: decks.map((deck) => {
          if (deck.id === cardCounts.id) {
            return { ...deck, ...cardCounts };
          } else return deck;
        }),
      };
    });
  };

  const getWindowingCards = async () => {
    const deck = state.decks.find(({ id }) => id === state.curDeckId);
    if (!deck) return;

    const beNotGone = getBeNotGone();

    const cards = await db.getAllAsync(getWindowingCardsQuery, [
      deck.id,
      beNotGone,
      deck.id,
      beNotGone,
      deck.new,
    ]);

    setState((prev) => ({ ...prev, windowingCards: cards.map(mapCard) }));
  };

  const createCard = async (deckId: number, data: WordType) => {
    const card = createFsrsCard(deckId, data);

    await db.runAsync(createCardQuery, [
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
      card.createdDate.toISOString(),
      card.updatedDate.toISOString(),
      card.localUpdatedDate.toISOString(),
      card.action,
    ]);
  };

  const updateCard = async (card: AnkiCard) => {
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
      card.id,
    ]);
  };

  const deleteCard = async (cardId: number) => {
    const curDate = new Date().toISOString();
    await db.runAsync(deleteCardQuery, [curDate, cardId]);
    await db.runAsync(deleteReviewLogsByCardIdQuery, [curDate, cardId]);
  };

  const getBrowseCards = async () => {
    if (!state.curDeckId) return;

    setState((prev) => ({ ...prev, browseLoading: true }));

    const cards: any[] = await db.getAllAsync(getCardsQuery, [
      state.curDeckId,
      state.browseSearch,
      state.browseSearch,
      state.browseSearch,
      state.browseSearch,
    ]);

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
    const card: any = await db.getFirstAsync(getCardQuery, [id]);

    if (!card) return null;

    return mapCard(card);
  };

  const createReviewLog = async (
    reviewLog: ReviewLog,
    deckId: number,
    cardId: number
  ) => {
    const curDate = new Date().toISOString();

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
      deckId,
      cardId,
      curDate,
      curDate,
      curDate,
    ]);
  };

  const setReloadWindowingCards = (value: boolean) => {
    setState((prev) => ({
      ...prev,
      reloadWindowingCards: value,
    }));
  };

  useEffect(() => {
    if (user) {
      getDecks();
    }
  }, [user]);

  useEffect(() => {
    const now = new Date();
    const notBeGone = new Date(getBeNotGone());
    const delay = notBeGone.getTime() - now.getTime();

    const timeoutId = setTimeout(async () => {
      await getDecks();
      setReloadWindowingCards(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnkiContext.Provider
      value={{
        ...state,
        getDecks,
        deleteDeck,
        createDeck,
        updateDeck,
        rateCard,
        getWindowingCards,
        setReloadWindowingCards,
        createCard,
        updateCard,
        deleteCard,
        getBrowseCards,
        setBrowseSearch,
        setCurDeckId,
        getCardById,
        createReviewLog,
      }}>
      {children}
    </AnkiContext.Provider>
  );
};

export const useAnkiContext = () => {
  return useContext(AnkiContext) as AnkiContextType;
};

export default AnkiProvider;
