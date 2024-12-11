export const fakeData = `
INSERT INTO decks (_id, name, createdDate, updatedDate, localUpdatedDate, action, newCardQuantity)
VALUES
('deck1', 'Basic Japanese Vocabulary', '2024-01-01', '2024-01-10', '2024-01-10', 1, 10),
('deck2', 'Advanced Kanji', '2024-02-01', '2024-02-15', '2024-02-15', 1, 20),
('deck3', 'JLPT N5 Grammar', '2024-03-01', '2024-03-20', '2024-03-20', 1, 15);
INSERT INTO cards (
  _id, createdDate, updatedDate, word, sentence, reading, meaning, difficulty, due, elapsed_days, lapses, 
  last_review, reps, scheduled_days, stability, state, deckId, localUpdatedDate, action
)
VALUES
('card1', '2024-01-01', '2024-01-10', '猫', '猫はかわいいです。', 'ねこ', 'Cat', 1, '2024-01-15', 5, 0, '2024-01-10', 10, 3, 0.85, 0, 'deck1', '2024-01-10', 1),
('card2', '2024-01-02', '2024-01-11', '犬', '犬が走っています。', 'いぬ', 'Dog', 2, '2024-01-16', 6, 1, '2024-01-11', 12, 4, 0.80, 0, 'deck1', '2024-01-11', 1),
('card3', '2024-02-01', '2024-02-15', '人間', '人間は考える動物です。', 'にんげん', 'Human', 3, '2024-02-20', 10, 0, '2024-02-15', 15, 5, 0.90, 1, 'deck2', '2024-02-15', 1),
('card4', '2024-02-05', '2024-02-16', '電車', '電車に乗ります。', 'でんしゃ', 'Train', 2, '2024-02-21', 7, 2, '2024-02-16', 18, 6, 0.75, 1, 'deck2', '2024-02-16', 1),
('card5', '2024-03-01', '2024-03-20', '食べる', 'りんごを食べます。', 'たべる', 'To eat', 1, '2024-03-25', 4, 0, '2024-03-20', 8, 2, 0.70, 0, 'deck3', '2024-03-20', 1),
('card6', '2024-03-02', '2024-03-21', '飲む', '水を飲みます。', 'のむ', 'To drink', 1, '2024-03-26', 5, 1, '2024-03-21', 9, 3, 0.65, 0, 'deck3', '2024-03-21', 1);
`;

//Label
export const getAllDecksInfo = `
SELECT 
    *,
    CASE
        WHEN d.newCardQuantity < (SELECT COUNT(*) FROM cards WHERE state = 0 AND deckId = d.id) THEN d.newCardQuantity
        ELSE (SELECT COUNT(*) FROM cards WHERE state = 0 AND deckId = d.id)
    END AS new,
    (SELECT COUNT(*) FROM cards WHERE state IN (1, 3) AND DATE(due) <= DATE('now')  AND deckId = d.id) AS learning,
    (SELECT COUNT(*) FROM cards WHERE state = 2 AND DATE(due) <= DATE('now')  AND deckId = d.id) AS review
FROM 
    decks d;

`;

export const createTable = `
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS reviewLogs;
CREATE TABLE IF NOT EXISTS decks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  createdDate TEXT NOT NULL,
  updatedDate TEXT NOT NULL,
  localUpdatedDate TEXT NOT NULL,
  action INTERGER NOT NULL,
  newCardQuantity INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY,
  createdDate TEXT NOT NULL,
  updatedDate TEXT NOT NULL,
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
  localUpdatedDate TEXT NOT NULL,
  action INTERGER NOT NULL
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
  action INTEGER NOT NULL,
  deckId INTEGER NOT NULL,
  cardId INTEGER NOT NULL
);
`;

export const createDeck = `
  INSERT INTO decks (name, createdDate, updatedDate, newCardQuantity, action, localUpdatedDate) 
  VALUES (?, ?, ?, ?, ?, ?);
`;

export const getDeckById = `
  SELECT * FROM decks
  WHERE id = ?
`;

export const deleteDeckById = `
  DELETE FROM decks WHERE id = ?
`;

export const updateDeck = `
  UPDATE decks
  SET 
    name = ?, 
    updatedDate = ?, 
    newCardQuantity = ?, 
    action = ?, 
    localUpdatedDate = ?
  WHERE id = ?;
`;

export const getCardsLearningByDeckIdQuery = `
SELECT 
    *
FROM (
    -- Phần 1: Lấy các thẻ đang học (state = 0)
    SELECT *
    FROM (
        SELECT *
        FROM cards
        WHERE state = 0
          AND deckId = ?
        LIMIT ?
    )
    UNION ALL
    SELECT *
    FROM (
        SELECT *
        FROM cards
        WHERE state IN (1, 2, 3)
          AND DATE(due) <= DATE('now')
          AND deckId = ?
        ORDER BY due ASC
    )
) combined;
`;

export const getQuantityCardLearningByDeckIdToday = `
  SELECT COUNT(*) AS learned_cards
  FROM reviewLogs
  WHERE DATE(review) = DATE('now') AND state = 0 AND deckId = ?;
`;

export const createCardQuery = `
INSERT INTO cards (
  createdDate,
  updatedDate,
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
  localUpdatedDate,
  action
) 
VALUES (
  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
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
  action = ?
WHERE id = ?;
`;

export const getAllCardsByDeckIdAndSearchQuery = `
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

export const getCardByIdQuery = `
SELECT * 
FROM cards
WHERE id = ?;
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
  action, 
  deckId, 
  cardId
) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

`;
