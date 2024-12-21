import {
  AnkiCard,
  AnkiReviewLog,
  createCard as createFsrsCard,
  getBeNotGone,
  mapCard,
  mapDeck,
  mapReviewLog,
  WordType,
} from '@/utils/ankiUtils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './appContext';
import { useSQLiteContext } from 'expo-sqlite';
import {
  Action,
  ActionLog,
  createActionLogQuery,
  createCardQuery,
  createDeckQuery,
  createReviewLogQuery,
  deleteActionLogQuery,
  deleteCardQuery,
  deleteCardsByDeckIdQuery,
  deleteDeckQuery,
  deleteReviewLogQuery,
  deleteReviewLogsByCardIdQuery,
  deleteReviewLogsByDeckIdQuery,
  generateActionLogId,
  getCardQuery,
  getCardsQuery,
  getDecksQuery,
  getNewCardLearnedTodayCountsQuery,
  getReviewLogsByCardIdQuery,
  getTodayCardCountsQuery,
  getWindowingCardsQuery,
  pureCreateCardQuery,
  pureCreateReviewLogQuery,
  Table,
  updateCardQuery,
  updateDeckQuery,
} from '@/constants/Query';
import { State } from 'ts-fsrs';

export interface Deck {
  id: number;
  name: string;
  newCardQuantity: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface CardCounts {
  id: number;
  new: number;
  learning: number;
  review: number;
}

export enum AddUndoType {
  NONE = 0,
  NEW = 1,
  CONC = 2,
}

export type AnkiStateType = {
  decks: (Deck & CardCounts)[];
  windowingCards: AnkiCard[];
  reloadWindowingCards: boolean;
  curDeckId?: number;
  browseCards: AnkiCard[];
  browseSearch: string;
  browseLoading: boolean;
  undoActions: (() => Promise<void>)[][];
};

export type AnkiContextType = AnkiStateType & {
  getDecks: () => Promise<void>;
  deleteDeck: (deckId: number) => Promise<ActionLog>;
  createDeck: (name: string, newCardQuantity: number) => Promise<ActionLog>;
  updateDeck: (deck: Deck) => Promise<ActionLog>;
  rateCard: (
    card: AnkiCard,
    reviewLog: AnkiReviewLog
  ) => Promise<{
    updateCardActionLog: ActionLog;
    createReviewLogActionLog: ActionLog;
  }>;
  getWindowingCards: () => Promise<void>;
  setReloadWindowingCards: (value: boolean) => void;
  createCard: (deckId: number, data: WordType) => Promise<ActionLog>;
  updateCard: (card: AnkiCard, addUndoType: AddUndoType) => Promise<ActionLog>;
  deleteCard: (cardId: number, addUndoType: AddUndoType) => Promise<ActionLog>;
  getBrowseCards: () => Promise<void>;
  setBrowseSearch: (search: string) => void;
  setCurDeckId: (deckId: number) => void;
  getCardById: (id: number) => Promise<AnkiCard | null>;
  undo: () => Promise<void>;
  clearAllUndo: () => void;
};

export const AnkiContext = createContext<AnkiContextType | null>(null);

const initialState: AnkiStateType = {
  decks: [],
  windowingCards: [],
  reloadWindowingCards: false,
  browseCards: [],
  browseSearch: '',
  browseLoading: false,
  undoActions: [],
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
    await db.runAsync(deleteDeckQuery, [deckId]);
    await db.runAsync(deleteCardsByDeckIdQuery, [deckId]);
    await db.runAsync(deleteReviewLogsByDeckIdQuery, [deckId]);

    return await createActionLog(Action.DELETE, Table.DECK, deckId);
  };

  const createDeck = async (name: string, newCardQuantity: number) => {
    const curDate = new Date().toISOString();
    const result = await db.runAsync(createDeckQuery, [
      name,
      newCardQuantity,
      curDate,
      curDate,
    ]);

    return await createActionLog(
      Action.CREATE,
      Table.DECK,
      result.lastInsertRowId
    );
  };

  const updateDeck = async (deck: Deck) => {
    const curDate = new Date().toISOString();
    await db.runAsync(updateDeckQuery, [
      deck.name,
      deck.newCardQuantity,
      curDate,
      deck.id,
    ]);

    return await createActionLog(Action.UPDATE, Table.DECK, deck.id);
  };

  const rateCard = async (card: AnkiCard, reviewLog: AnkiReviewLog) => {
    const updateCardActionLog = await updateCard(card, AddUndoType.NEW);
    const createReviewLogActionLog = await createReviewLog(
      reviewLog,
      AddUndoType.CONC
    );

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

    return {
      updateCardActionLog,
      createReviewLogActionLog,
    };
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

    const result = await db.runAsync(createCardQuery, [
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
    ]);

    return await createActionLog(
      Action.CREATE,
      Table.CARD,
      result.lastInsertRowId
    );
  };

  const updateCard = async (
    card: AnkiCard,
    addUndoType: AddUndoType = AddUndoType.NONE
  ) => {
    if (addUndoType !== AddUndoType.NONE) {
      const cardBeforeUpdate = await getCardById(card.id);

      if (cardBeforeUpdate) {
        addUndo(addUndoType, [
          async () => {
            await pureUpdateCard(cardBeforeUpdate);
          },
        ]);
      }
    }

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

    const updateCardActionLog = await createActionLog(
      Action.UPDATE,
      Table.CARD,
      card.id
    );

    if (addUndoType !== AddUndoType.NONE) {
      addUndo(AddUndoType.CONC, [
        async () => {
          await db.runAsync(deleteActionLogQuery, [updateCardActionLog.id]);
        },
      ]);
    }

    return updateCardActionLog;
  };

  const deleteCard = async (
    cardId: number,
    addUndoType: AddUndoType = AddUndoType.NONE
  ) => {
    if (addUndoType !== AddUndoType.NONE) {
      const cardBeforeUpdate = await getCardById(cardId);
      const reviewLogsBeforeUpdate = (
        await db.getAllAsync(getReviewLogsByCardIdQuery, [cardId])
      ).map(mapReviewLog);

      const pureCreateReviewLogFunctions: (() => Promise<void>)[] = [];
      for (const reviewLog of reviewLogsBeforeUpdate) {
        pureCreateReviewLogFunctions.push(async () => {
          await pureCreateReviewLog(reviewLog);
        });
      }

      if (cardBeforeUpdate) {
        addUndo(addUndoType, [
          async () => {
            await pureCreateCard(cardBeforeUpdate);
          },
          ...pureCreateReviewLogFunctions,
        ]);
      }
    }

    await db.runAsync(deleteCardQuery, [cardId]);
    await db.runAsync(deleteReviewLogsByCardIdQuery, [cardId]);

    const deleteCardActionLog = await createActionLog(
      Action.DELETE,
      Table.CARD,
      cardId
    );

    if (addUndoType !== AddUndoType.NONE) {
      addUndo(AddUndoType.CONC, [
        async () => {
          await db.runAsync(deleteActionLogQuery, [deleteCardActionLog.id]);
        },
      ]);
    }

    return deleteCardActionLog;
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
    reviewLog: AnkiReviewLog,
    addUndoType: AddUndoType = AddUndoType.NONE
  ) => {
    const curDate = new Date().toISOString();

    const result = await db.runAsync(createReviewLogQuery, [
      reviewLog.difficulty,
      reviewLog.due.toISOString(),
      reviewLog.elapsed_days,
      reviewLog.last_elapsed_days,
      reviewLog.rating,
      reviewLog.review.toISOString(),
      reviewLog.scheduled_days,
      reviewLog.stability,
      reviewLog.state,
      reviewLog.deckId,
      reviewLog.cardId,
      curDate,
    ]);

    if (addUndoType !== AddUndoType.NONE) {
      addUndo(addUndoType, [
        async () => {
          await db.runAsync(deleteReviewLogQuery, [result.lastInsertRowId]);
        },
      ]);
    }

    const createReviewLogActionLog = await createActionLog(
      Action.CREATE,
      Table.REVIEW_LOG,
      result.lastInsertRowId
    );

    if (addUndoType !== AddUndoType.NONE) {
      addUndo(AddUndoType.CONC, [
        async () => {
          await db.runAsync(deleteActionLogQuery, [
            createReviewLogActionLog.id,
          ]);
        },
      ]);
    }

    return createReviewLogActionLog;
  };

  const setReloadWindowingCards = (value: boolean) => {
    setState((prev) => ({
      ...prev,
      reloadWindowingCards: value,
    }));
  };

  const createActionLog = async (
    action: Action,
    targetTable: Table,
    targetId: number
  ): Promise<ActionLog> => {
    const id = generateActionLogId();
    const curDate = new Date();

    await db.runAsync(createActionLogQuery, [
      id,
      action,
      targetTable,
      targetId,
      curDate.toISOString(),
    ]);
    return { id, action, targetTable, targetId, createdDate: curDate };
  };

  const addUndo = (addUndoType: AddUndoType, fns: (() => Promise<void>)[]) => {
    if (addUndoType === AddUndoType.NEW) {
      setState(({ undoActions, ...rest }) => ({
        ...rest,
        undoActions: [fns, ...undoActions],
      }));
    } else if (addUndoType === AddUndoType.CONC) {
      setState(({ undoActions, ...rest }) => {
        const firstUndoAction = undoActions.at(0) ?? [];
        const leftUndoActions = undoActions.slice(1);

        return {
          ...rest,
          undoActions: [[...firstUndoAction, ...fns], ...leftUndoActions],
        };
      });
    }
  };

  const pureUpdateCard = async (card: AnkiCard) => {
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
      card.updatedDate.toISOString(),
      card.id,
    ]);
  };

  const pureCreateCard = async (card: AnkiCard) => {
    const lastReview = card.last_review ? card.last_review.toISOString() : null;

    await db.runAsync(pureCreateCardQuery, [
      card.id,
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
      card.createdDate.toISOString(),
      card.updatedDate.toISOString(),
    ]);
  };

  const pureCreateReviewLog = async (reviewLog: AnkiReviewLog) => {
    await db.runAsync(pureCreateReviewLogQuery, [
      reviewLog.id,
      reviewLog.difficulty,
      reviewLog.due.toISOString(),
      reviewLog.elapsed_days,
      reviewLog.last_elapsed_days,
      reviewLog.rating,
      reviewLog.review.toISOString(),
      reviewLog.scheduled_days,
      reviewLog.stability,
      reviewLog.state,
      reviewLog.deckId,
      reviewLog.cardId,
      reviewLog.createdDate.toISOString(),
    ]);
  };

  const undo = async () => {
    const actions = state.undoActions.at(0);
    if (actions) {
      for (const action of actions) {
        await action();
      }
      setState({
        ...state,
        undoActions: state.undoActions.slice(1),
        reloadWindowingCards: true,
      });
      await getDecks();
    }
  };

  const clearAllUndo = () => {
    setState({
      ...state,
      undoActions: [],
    });
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
        undo,
        clearAllUndo,
      }}>
      {children}
    </AnkiContext.Provider>
  );
};

export const useAnkiContext = () => {
  return useContext(AnkiContext) as AnkiContextType;
};

export default AnkiProvider;
