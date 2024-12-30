import { authClient } from '@/client/axiosClient';
import {
  Action,
  ActionLog,
  createActionLogQuery,
  deleteActionLogFromCreatedDateQuery,
  deleteActionLogsQuery,
  deleteCardQuery,
  deleteCardsByDeckIdQuery,
  deleteDeckQuery,
  deleteReviewLogQuery,
  deleteReviewLogsByCardIdQuery,
  deleteReviewLogsByDeckIdQuery,
  getActionLogsQuery,
  getCardQuery,
  getCardsByDeckIdQuery,
  getDeckQuery,
  getReviewLogQuery,
  getReviewLogsByCardIdQuery,
  getReviewLogsByDeckIdQuery,
  pureCreateCardQuery,
  pureCreateDeckQuery,
  pureCreateReviewLogQuery,
  Table,
  updateCardQuery,
  updateDeckQuery,
} from '@/constants/Query';
import { useSQLiteContext } from 'expo-sqlite';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAnkiContext } from './ankiContext';
import { useAppContext } from './appContext';

export type AnkiSyncContextType = {
  isSync: boolean;
  syncAction: 'up' | 'down' | null;
  localActionLogs: ActionLog[];
  serverActionLogs: ActionLog[];
  matchingIndex: number;
  prepareSync: () => Promise<void>;
  sync: (syncAction: 'up' | 'down') => Promise<void>;
  loading: boolean;
};

export const AnkiSyncContext = createContext<AnkiSyncContextType | null>(null);

const AnkiSyncProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSync, setIsSync] = useState<boolean>(false);
  const [syncAction, setSyncAction] = useState<'up' | 'down' | null>(null);
  const [localActionLogs, setLocalActionLogs] = useState<ActionLog[]>([]);
  const [serverActionLogs, setServerActionLogs] = useState<ActionLog[]>([]);
  const [matchingIndex, setMatchingIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const db = useSQLiteContext();
  const { getDecks } = useAnkiContext();
  const { user } = useAppContext();

  const prepareSync = async () => {
    setLoading(true);

    const localActionLogs: ActionLog[] = await db.getAllAsync(
      getActionLogsQuery
    );

    const serverActionLogs: ActionLog[] = (
      await authClient.get('anki/action-logs')
    ).data.data;

    let matchingIndex = -1;
    for (let i = 0; i !== localActionLogs.length; ++i) {
      if (i == serverActionLogs.length) {
        break;
      }

      if (localActionLogs[i].id !== serverActionLogs[i].id) {
        break;
      }

      matchingIndex = i;
    }

    if (
      matchingIndex + 1 === localActionLogs.length &&
      matchingIndex + 1 === serverActionLogs.length
    ) {
      setIsSync(true);
      setLoading(false);
      return;
    }

    if (matchingIndex + 1 === localActionLogs.length) {
      setSyncAction('down');
    } else if (matchingIndex + 1 === serverActionLogs.length) {
      setSyncAction('up');
    } else {
      setSyncAction(null);
    }

    setIsSync(false);
    setLocalActionLogs(localActionLogs);
    setServerActionLogs(serverActionLogs);
    setMatchingIndex(matchingIndex);

    setLoading(false);
  };

  const sync = async (syncAction: 'up' | 'down') => {
    if (isSync) return;

    setLoading(true);

    if (syncAction === 'up') {
      const susumuLogs = getFukkatsu(
        localActionLogs.slice(matchingIndex + 1),
        'susumu'
      );
      const modoruLogs = getFukkatsu(
        serverActionLogs.slice(matchingIndex + 1),
        'modoru'
      );

      const filledSusumuLogs = await fillFukkatsu(susumuLogs, 'susumu');
      const filledModoruLogs = await fillFukkatsu(modoruLogs, 'modoru');

      await authClient.post('/anki/push', {
        logs: [...filledModoruLogs, ...filledSusumuLogs],
        modoruLogsLength: filledModoruLogs.length,
        actionLogs: localActionLogs.slice(matchingIndex + 1),
        isCompletelyDifferent: matchingIndex === -1,
      });
    } else if (syncAction === 'down') {
      const susumuLogs = getFukkatsu(
        serverActionLogs.slice(matchingIndex + 1),
        'susumu'
      ).map((log) => {
        const [tableId, targetId] = log.key
          .split('-')
          .map((str) => Number.parseInt(str));
        return {
          tableId,
          targetId,
          action: log.action,
        };
      });
      const modoruLogs = getFukkatsu(
        localActionLogs.slice(matchingIndex + 1),
        'modoru'
      ).map((log) => {
        const [tableId, targetId] = log.key
          .split('-')
          .map((str) => Number.parseInt(str));
        return {
          tableId,
          targetId,
          action: log.action,
        };
      });

      const filledLogs = (
        await authClient.post('/anki/pull', {
          logs: [...modoruLogs, ...susumuLogs],
          modoruLogsLength: modoruLogs.length,
        })
      ).data.data;

      await mergeFromServer(
        filledLogs,
        modoruLogs.length,
        serverActionLogs.slice(matchingIndex + 1),
        matchingIndex === -1
      );

      await getDecks();
    }

    setIsSync(true);
    setLoading(false);
  };

  const getFukkatsu = (actionLogs: ActionLog[], type: 'susumu' | 'modoru') => {
    const groupedLogs = actionLogs.reduce((acc, log) => {
      const key = `${log.targetTable}-${log.targetId}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(log.action);
      return acc;
    }, {} as Record<string, Action[]>);

    const result = Object.entries(groupedLogs)
      .map(([key, actions]) => {
        const hasCreate = actions.includes(Action.CREATE);
        const hasDelete = actions.includes(Action.DELETE);

        if (hasCreate && hasDelete) {
          return { key, action: null };
        } else if (hasDelete && !hasCreate) {
          return {
            key,
            action: type === 'susumu' ? Action.DELETE : Action.CREATE,
          };
        } else if (hasCreate && !hasDelete) {
          return {
            key,
            action: type === 'susumu' ? Action.CREATE : Action.DELETE,
          };
        } else {
          return { key, action: Action.UPDATE };
        }
      })
      .filter((log) => log.action !== null)
      .sort((a, b) => {
        return type === 'susumu' ? a.action - b.action : b.action - a.action;
      });

    return result;
  };

  const fillFukkatsu = async (
    logs: {
      key: string;
      action: Action;
    }[],
    type: 'susumu' | 'modoru'
  ) => {
    const filledLogs: {
      tableId: number;
      targetId: number;
      action: Action;
      data: any;
    }[] = [];

    for (let i = 0; i != logs.length; ++i) {
      const log = logs[i];
      const [tableId, targetId] = log.key
        .split('-')
        .map((str) => Number.parseInt(str));

      let data: any = null;
      switch (tableId) {
        case Table.DECK:
          switch (log.action) {
            case Action.CREATE:
              if (type === 'modoru') {
                data = {
                  deck: await db.getFirstAsync(getDeckQuery, [targetId]),
                  cards: await db.getAllAsync(getCardsByDeckIdQuery, [
                    targetId,
                  ]),
                  reviewLogs: await db.getAllAsync(getReviewLogsByDeckIdQuery, [
                    targetId,
                  ]),
                };
              } else {
                data = await db.getFirstAsync(getDeckQuery, [targetId]);
              }
              break;
            case Action.UPDATE:
              data = await db.getFirstAsync(getDeckQuery, [targetId]);
              break;
            case Action.DELETE:
              break;
          }
          break;
        case Table.CARD:
          switch (log.action) {
            case Action.CREATE:
              if (type === 'modoru') {
                data = {
                  card: await db.getFirstAsync(getCardQuery, [targetId]),
                  reviewLogs: await db.getAllAsync(getReviewLogsByCardIdQuery, [
                    targetId,
                  ]),
                };
              } else {
                data = await db.getFirstAsync(getCardQuery, [targetId]);
              }
              break;
            case Action.UPDATE:
              data = await db.getFirstAsync(getCardQuery, [targetId]);
              break;
            case Action.DELETE:
              break;
          }
          break;
        case Table.REVIEW_LOG:
          switch (log.action) {
            case Action.CREATE:
              data = await db.getFirstAsync(getReviewLogQuery, [targetId]);
              break;
            case Action.UPDATE:
              break;
            case Action.DELETE:
              break;
          }
          break;
      }

      filledLogs.push({
        tableId,
        targetId,
        action: log.action,
        data,
      });
    }

    return filledLogs;
  };

  const mergeFromServer = async (
    logs: {
      tableId: number;
      targetId: number;
      action: Action;
      data: any;
    }[],
    modoruLogsLength: number,
    actionLogs: any,
    isCompletelyDifferent: boolean
  ) => {
    if (isCompletelyDifferent) {
      await db.runAsync(deleteActionLogsQuery);
    } else {
      await db.runAsync(deleteActionLogFromCreatedDateQuery, [
        actionLogs[0]?.createdDate ?? new Date().toISOString(),
      ]);
    }

    for (const actionLog of actionLogs) {
      await db.runAsync(createActionLogQuery, [
        actionLog.id,
        actionLog.action,
        actionLog.targetTable,
        actionLog.targetId,
        actionLog.createdDate,
      ]);
    }

    for (let i = 0; i !== logs.length; ++i) {
      const log = logs[i];

      switch (log.tableId) {
        case Table.DECK:
          switch (log.action) {
            case Action.CREATE:
              if (log.data !== null) {
                if (i < modoruLogsLength) {
                  await createDeck(log.data.deck);
                  for (const card of log.data.cards) {
                    await createCard(card);
                  }
                  for (const reviewLog of log.data.reviewLogs) {
                    await createReviewLog(reviewLog);
                  }
                } else {
                  await createDeck(log.data);
                }
              }
              break;
            case Action.UPDATE:
              if (log.data !== null) {
                await updateDeck(log.data);
              }
              break;
            case Action.DELETE:
              await deleteDeck(log.targetId);
              break;
          }
          break;
        case Table.CARD:
          switch (log.action) {
            case Action.CREATE:
              if (log.data !== null) {
                if (i < modoruLogsLength) {
                  await createCard(log.data.card);
                  for (const reviewLog of log.data.reviewLogs) {
                    await createReviewLog(reviewLog);
                  }
                } else {
                  await createCard(log.data);
                }
              }
              break;
            case Action.UPDATE:
              if (log.data !== null) {
                await updateCard(log.data);
              }
              break;
            case Action.DELETE:
              await deleteCard(log.targetId);
              break;
          }
          break;
        case Table.REVIEW_LOG:
          switch (log.action) {
            case Action.CREATE:
              if (log.data !== null) {
                await createReviewLog(log.data);
              }
              break;
            case Action.UPDATE:
              break;
            case Action.DELETE:
              await deleteReviewLog(log.targetId);
              break;
          }
          break;
      }
    }
  };

  const createDeck = async (deck: any) => {
    await db.runAsync(pureCreateDeckQuery, [
      deck.id,
      deck.name,
      deck.newCardQuantity,
      deck.createdDate,
      deck.updatedDate,
    ]);
  };

  const updateDeck = async (deck: any) => {
    await db.runAsync(updateDeckQuery, [
      deck.name,
      deck.newCardQuantity,
      deck.updatedDate,
      deck.id,
    ]);
  };

  const deleteDeck = async (deckId: number) => {
    await db.runAsync(deleteDeckQuery, [deckId]);
    await db.runAsync(deleteCardsByDeckIdQuery, [deckId]);
    await db.runAsync(deleteReviewLogsByDeckIdQuery, [deckId]);
  };

  const createCard = async (card: any) => {
    await db.runAsync(pureCreateCardQuery, [
      card.id,
      card.word,
      card.sentence,
      card.reading,
      card.meaning,
      card.difficulty,
      card.due,
      card.elapsed_days,
      card.lapses,
      card.last_review,
      card.reps,
      card.scheduled_days,
      card.stability,
      card.state,
      card.deckId,
      card.createdDate,
      card.updatedDate,
    ]);
  };

  const updateCard = async (card: any) => {
    await db.runAsync(updateCardQuery, [
      card.word,
      card.sentence,
      card.reading,
      card.meaning,
      card.difficulty,
      card.due,
      card.elapsed_days,
      card.lapses,
      card.last_review,
      card.reps,
      card.scheduled_days,
      card.stability,
      card.state,
      card.deckId,
      card.updatedDate,
      card.id,
    ]);
  };

  const deleteCard = async (cardId: number) => {
    await db.runAsync(deleteCardQuery, [cardId]);
    await db.runAsync(deleteReviewLogsByCardIdQuery, [cardId]);
  };

  const createReviewLog = async (reivewLog: any) => {
    await db.runAsync(pureCreateReviewLogQuery, [
      reivewLog.id,
      reivewLog.difficulty,
      reivewLog.due,
      reivewLog.elapsed_days,
      reivewLog.last_elapsed_days,
      reivewLog.rating,
      reivewLog.review,
      reivewLog.scheduled_days,
      reivewLog.stability,
      reivewLog.state,
      reivewLog.deckId,
      reivewLog.cardId,
      reivewLog.createdDate,
    ]);
  };

  const deleteReviewLog = async (reviewLogId: number) => {
    await db.runAsync(deleteReviewLogQuery, [reviewLogId]);
  };

  useEffect(() => {
    if (user) prepareSync();
  }, [user]);

  return (
    <AnkiSyncContext.Provider
      value={{
        isSync,
        syncAction,
        localActionLogs,
        serverActionLogs,
        matchingIndex,
        prepareSync,
        sync,
        loading,
      }}>
      {children}
    </AnkiSyncContext.Provider>
  );
};

export const useAnkiSyncContext = () => {
  return useContext(AnkiSyncContext) as AnkiSyncContextType;
};

export default AnkiSyncProvider;
