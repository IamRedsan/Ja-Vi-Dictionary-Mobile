import { AnkiCard, createCard } from '@/utils/ankiUtils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './appContext';
import { useSQLiteContext } from 'expo-sqlite';
import {
  deleteDeckById,
  getAllDecksInfo,
  createDeck as createDeckQuery,
  updateDeck as updateDeckQuery,
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
};

export type AnkiContextType = AnkiStateType & {
  getWindowingCards: (deckId: string) => Promise<void>;
  rateCard: (card: AnkiCard) => Promise<void>;
  deleteDeck: (deckId: number) => Promise<void>;
  createDeck: (deck: Omit<Deck, 'id'>) => Promise<void>;
  updateDeck: (deck: Deck) => Promise<void>;
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
    const windowingCards: AnkiCard[] = [];

    setState({ ...state, windowingCards });
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
      }}>
      {children}
    </AnkiContext.Provider>
  );
};

export const useAnkiContext = () => {
  return useContext(AnkiContext) as AnkiContextType;
};

export default AnkiProvider;
