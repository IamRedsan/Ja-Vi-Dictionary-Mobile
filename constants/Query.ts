import { Action } from '@/utils/ankiUtils';
import { State } from 'ts-fsrs';

export const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS decks (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    newCardQuantity INTEGER NOT NULL,
    createdDate TEXT NOT NULL,
    updatedDate TEXT NOT NULL,
    localUpdatedDate TEXT NOT NULL,
    action INTEGER NOT NULL
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
    updatedDate TEXT NOT NULL,
    localUpdatedDate TEXT NOT NULL,
    action INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reviewLogs (
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
    createdDate TEXT NOT NULL,
    updatedDate TEXT NOT NULL,
    localUpdatedDate TEXT NOT NULL,
    action INTEGER NOT NULL
  );
`;

export const getDeckQuery = `
  SELECT * FROM decks
  WHERE id = ? AND action != ${Action.DELETE};
`;

export const getDecksQuery = `
  SELECT * FROM decks
  WHERE action != ${Action.DELETE}
  ORDER BY id ASC;
`;

export const createDeckQuery = `
  INSERT INTO decks (name, newCardQuantity, createdDate, updatedDate, localUpdatedDate, action)
  VALUES (?, ?, ?, ?, ?, ${Action.CREATE});
`;

export const updateDeckQuery = `
  UPDATE decks
  SET
    name = ?, 
    newCardQuantity = ?, 
    localUpdatedDate = ?,
    action = ${Action.UPDATE}
  WHERE id = ?;
`;

export const deleteDeckQuery = `
  UPDATE decks
  SET
    action = ${Action.DELETE},
    localUpdatedDate = ?
  WHERE id = ?;
`;

export const getTodayCardCountsQuery = `
  SELECT
    deckId AS id,
    SUM(CASE WHEN state = ${State.New} THEN 1 ELSE 0 END) AS new,
    SUM(CASE WHEN state = ${State.Learning} OR state = ${State.Relearning} THEN 1 ELSE 0 END) AS learning,
    SUM(CASE WHEN state = ${State.Review} THEN 1 ELSE 0 END) AS review
  FROM cards
  WHERE due < ? AND action != ${Action.DELETE}
  GROUP BY deckId
  ORDER BY deckId ASC;
`;

export const getNewCardLearnedTodayCountsQuery = `
  SELECT deckId AS id, COUNT(*) AS new
  FROM reviewLogs
  WHERE ? <= review AND review < ? AND action != ${Action.DELETE} AND state = ${State.New}
  GROUP BY deckId
  ORDER BY deckId ASC;
`;

export const getCardsQuery = `
  SELECT *
  FROM cards
  WHERE deckId = ? AND action != ${Action.DELETE}
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
  WHERE id = ? AND action != ${Action.DELETE};
`;

export const getWindowingCardsQuery = `
  SELECT * 
  FROM (
    SELECT *
    FROM cards
    WHERE deckId = ? AND state != ${State.New}
      AND action != ${Action.DELETE}
      AND due < ?

    UNION ALL

    SELECT *
    FROM (
      SELECT *
      FROM cards
      WHERE deckId = ? AND state = ${State.New}
        AND action != ${Action.DELETE}
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
    updatedDate,
    localUpdatedDate,
    action
  ) 
  VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${Action.CREATE}
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
    localUpdatedDate = ?, 
    action = ${Action.UPDATE}
  WHERE id = ?;
`;

export const deleteCardQuery = `
  UPDATE cards
  SET
    action = ${Action.DELETE},
    localUpdatedDate = ?
  WHERE id = ?;
`;

export const deleteCardsByDeckIdQuery = `
  UPDATE cards
  SET
    action = ${Action.DELETE},
    localUpdatedDate = ?
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
  createdDate,
  updatedDate,
  localUpdatedDate,
  action
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${Action.CREATE});
`;

export const deleteReviewLogsByCardIdQuery = `
  UPDATE reviewLogs
  SET
    action = ${Action.DELETE},
    localUpdatedDate = ?
  WHERE cardId = ?;
`;

export const deleteReviewLogsByDeckIdQuery = `
  UPDATE reviewLogs
  SET
    action = ${Action.DELETE},
    localUpdatedDate = ?
  WHERE deckId = ?;
`;
