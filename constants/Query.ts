import { State } from 'ts-fsrs';
import * as Crypto from 'expo-crypto';

export const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS decks (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    newCardQuantity INTEGER NOT NULL,
    createdDate TEXT NOT NULL,
    updatedDate TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY,
    word TEXT NOT NULL,
    sentence TEXT NOT NULL,
    reading TEXT NOT NULL,
    meaning TEXT NOT NULL,
    difficulty REAL NOT NULL,
    due TEXT NOT NULL,
    elapsed_days INTEGER NOT NULL,
    lapses INTEGER NOT NULL,
    last_review TEXT,
    reps INTEGER NOT NULL,
    scheduled_days INTEGER NOT NULL,
    stability REAL NOT NULL,
    state INTEGER NOT NULL,
    deckId INTEGER NOT NULL,
    createdDate TEXT NOT NULL,
    updatedDate TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reviewLogs (
    id INTEGER PRIMARY KEY,
    difficulty REAL NOT NULL,
    due TEXT NOT NULL,
    elapsed_days INTEGER NOT NULL,
    last_elapsed_days INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT NOT NULL,
    scheduled_days INTEGER NOT NULL,
    stability REAL NOT NULL,
    state INTEGER NOT NULL,
    deckId INTEGER NOT NULL,
    cardId INTEGER NOT NULL,
    createdDate TEXT NOT NULL
    );

  CREATE TABLE IF NOT EXISTS actionLogs (
    id TEXT PRIMARY KEY,
    action INTEGER NOT NULL,
    targetTable INTEGER NOT NULL,
    targetId INTEGER NOT NULL,
    createdDate TEXT NOT NULL
  );
  
  CREATE INDEX IF NOT EXISTS idx_actionLogs_createdDate ON actionLogs (createdDate DESC);
`;

export const enum Action {
  CREATE = 0,
  UPDATE = 1,
  DELETE = 2,
}

export interface ActionLog {
  id: string;
  action: number;
  targetTable: Table;
  targetId: number;
  createdDate: Date;
}

export const enum Table {
  DECK = 0,
  CARD = 1,
  REVIEW_LOG = 2,
}

export const generateActionLogId = () => {
  return Crypto.getRandomBytes(8).toString();
};

export const getDeckQuery = `
  SELECT * FROM decks
  WHERE id = ?;
`;

export const getDecksQuery = `
  SELECT * FROM decks
  ORDER BY id ASC;
`;

export const createDeckQuery = `
  INSERT INTO decks (name, newCardQuantity, createdDate, updatedDate)
  VALUES (?, ?, ?, ?);
`;

export const updateDeckQuery = `
  UPDATE decks
  SET
    name = ?, 
    newCardQuantity = ?, 
    updatedDate = ?
  WHERE id = ?;
`;

export const deleteDeckQuery = `
  DELETE FROM decks
  WHERE id = ?;
`;

export const getTodayCardCountsQuery = `
  SELECT
    deckId AS id,
    SUM(CASE WHEN state = ${State.New} THEN 1 ELSE 0 END) AS new,
    SUM(CASE WHEN state = ${State.Learning} OR state = ${State.Relearning} THEN 1 ELSE 0 END) AS learning,
    SUM(CASE WHEN state = ${State.Review} THEN 1 ELSE 0 END) AS review
  FROM cards
  WHERE due < ?
  GROUP BY deckId
  ORDER BY deckId ASC;
`;

export const getNewCardLearnedTodayCountsQuery = `
  SELECT deckId AS id, COUNT(*) AS new
  FROM reviewLogs
  WHERE ? <= review AND review < ? AND state = ${State.New}
  GROUP BY deckId
  ORDER BY deckId ASC;
`;

export const getCardsQuery = `
  SELECT *
  FROM cards
  WHERE deckId = ?
    AND (
      word LIKE '%' || ? || '%' OR
      sentence LIKE '%' || ? || '%' OR
      reading LIKE '%' || ? || '%' OR
      meaning LIKE '%' || ? || '%'
    );
`;

export const getCardQuery = `
  SELECT * 
  FROM cards
  WHERE id = ?;
`;

export const getWindowingCardsQuery = `
  SELECT * 
  FROM (
    SELECT *
    FROM cards
    WHERE deckId = ? AND state != ${State.New}
      AND due < ?

    UNION ALL

    SELECT *
    FROM (
      SELECT *
      FROM cards
      WHERE deckId = ? AND state = ${State.New}
        AND due < ?
      LIMIT ?
    )
  )
  ORDER BY due ASC;
`;

export const createCardQuery = `
  INSERT INTO cards (
    word,
    sentence,
    reading,
    meaning,
    difficulty,
    due,
    elapsed_days,
    lapses,
    last_review,
    reps,
    scheduled_days,
    stability,
    state,
    deckId,
    createdDate,
    updatedDate
  ) 
  VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  );
`;

export const pureCreateCardQuery = `
  INSERT INTO cards (
    id,
    word,
    sentence,
    reading,
    meaning,
    difficulty,
    due,
    elapsed_days,
    lapses,
    last_review,
    reps,
    scheduled_days,
    stability,
    state,
    deckId,
    createdDate,
    updatedDate
  ) 
  VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  );
`;

export const updateCardQuery = `
  UPDATE cards
  SET 
    word = ?, 
    sentence = ?, 
    reading = ?, 
    meaning = ?, 
    difficulty = ?, 
    due = ?, 
    elapsed_days = ?, 
    lapses = ?, 
    last_review = ?, 
    reps = ?, 
    scheduled_days = ?, 
    stability = ?, 
    state = ?, 
    deckId = ?, 
    updatedDate = ?
  WHERE id = ?;
`;

export const deleteCardQuery = `
  DELETE FROM cards
  WHERE id = ?;
`;

export const deleteCardsByDeckIdQuery = `
  DELETE FROM cards
  WHERE deckId = ?;
`;

export const createReviewLogQuery = `
  INSERT INTO reviewLogs (
  difficulty,
  due,
  elapsed_days,
  last_elapsed_days,
  rating,
  review,
  scheduled_days,
  stability,
  state,
  deckId,
  cardId,
  createdDate
  )
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const pureCreateReviewLogQuery = `
  INSERT INTO reviewLogs (
  id,
  difficulty,
  due,
  elapsed_days,
  last_elapsed_days,
  rating,
  review,
  scheduled_days,
  stability,
  state,
  deckId,
  cardId,
  createdDate
  )
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const getReviewLogsByCardIdQuery = `
  SELECT * FROM reviewLogs
  WHERE cardId = ?;
`;

export const deleteReviewLogQuery = `
  DELETE FROM reviewLogs
  WHERE id = ?;
`;

export const deleteReviewLogsByCardIdQuery = `
  DELETE FROM reviewLogs
  WHERE cardId = ?;
`;

export const deleteReviewLogsByDeckIdQuery = `
  DELETE FROM reviewLogs
  WHERE deckId = ?;
`;

export const createActionLogQuery = `
  INSERT INTO actionLogs (id, action, targetTable, targetId, createdDate)
  VALUES (?, ?, ?, ?, ?);
`;

export const getLatestActionLogQuery = `
  SELECT * FROM actionLogs
  ORDER BY createdDate DESC
  LIMIT 1;
`;

export const deleteActionLogQuery = `
  DELETE FROM actionLogs
  WHERE id = ?;
`;
