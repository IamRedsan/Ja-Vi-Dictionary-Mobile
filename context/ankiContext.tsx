import {
  Action,
  AnkiCard,
  createCard as createFsrsCard,
  mapCard,
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
} from '@/constants/Query';

export type Deck = {
  id: number;
  name: string;
  newCardQuantity: number;
  createdDate: string;
  updatedDate: string;
  localUpdatedDate: string;
  new?: number;
  learning?: number;
  review?: number;
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
  getWindowingCards: (deckId: string) => Promise<void>;
  rateCard: (card: AnkiCard) => Promise<void>;
  deleteDeck: (deckId: number) => Promise<void>;
  createDeck: (deck: Omit<Deck, 'id'>) => Promise<void>;
  updateDeck: (deck: Deck) => Promise<void>;
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
    const decks: any = await db.getAllAsync(getAllDecksInfo);
    setState({ ...state, decks });
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
      deck.createdDate,
      deck.updatedDate,
      deck.newCardQuantity,
      0,
      deck.localUpdatedDate,
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
      deck.createdDate,
      deck.updatedDate,
      deck.newCardQuantity,
      0,
      deck.localUpdatedDate,
      deck.id!,
    ];
    await db.runAsync(updateDeckQuery, updatedDecksArray);

    setState((prevState) => ({
      ...prevState,
      decks: prevState.decks.map((item) =>
        item.id === deck.id ? { ...item, ...deck } : item
      ),
    }));
  };

  const rateCard = async (card: AnkiCard) => {
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

      return { ...rest, windowingCards: updatedCards };
    });
  };

  const getWindowingCards = async (deckId: string) => {
    const windowingCards: AnkiCard[] = [];

    setState({ ...state, windowingCards });
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

  useEffect(() => {
    if (user) {
      getDecks();
    }
  }, [user]);

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
