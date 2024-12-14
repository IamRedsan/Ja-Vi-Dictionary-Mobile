import { Deck } from '@/context/ankiContext';
import { Card, createEmptyCard, fsrs, Rating, ReviewLog } from 'ts-fsrs';

export interface WordType {
  word: string;
  sentence: string;
  reading: string;
  meaning: string;
}

export interface AnkiCard extends Card, WordType {
  id: number;
  deckId: number;
  createdDate: Date;
  updatedDate: Date;
  localUpdatedDate: Date;
  action: Action;
}

export enum Action {
  CREATE = 0,
  UPDATE = 1,
  DELETE = 2,
  NONE = 3,
}

export interface AnkiReviewLog extends ReviewLog {
  deckId: number;
  cardId: number;
  action: Action;
}

export const f = fsrs();

export const createCard = (deckId: number, wordType: WordType): AnkiCard => {
  const curDate = new Date();

  const card: AnkiCard = createEmptyCard(new Date(), (newCard) => ({
    ...newCard,
    ...wordType,
    id: -1,
    deckId,
    createdDate: curDate,
    updatedDate: curDate,
    localUpdatedDate: curDate,
    action: Action.CREATE,
  }));

  return card;
};

export const getSchedulingCards = (
  card: AnkiCard
): {
  [K in Exclude<keyof typeof Rating, 'Manual'>]: {
    timeFromNow: string;
    card: AnkiCard;
    log: ReviewLog;
  };
} => {
  const schedulingCards = f.repeat(card, new Date());

  const againCard = schedulingCards[Rating.Again].card as AnkiCard;
  const againReviewLog = schedulingCards[Rating.Again].log;
  const hardCard = schedulingCards[Rating.Hard].card as AnkiCard;
  const hardReviewLog = schedulingCards[Rating.Hard].log;
  const goodCard = schedulingCards[Rating.Good].card as AnkiCard;
  const goodReviewLog = schedulingCards[Rating.Good].log;
  const easyCard = schedulingCards[Rating.Easy].card as AnkiCard;
  const easyReviewLog = schedulingCards[Rating.Easy].log;

  return {
    Again: {
      card: againCard,
      log: againReviewLog,
      timeFromNow: timeFromNow(againCard.due),
    },
    Hard: {
      card: hardCard,
      log: hardReviewLog,
      timeFromNow: timeFromNow(hardCard.due),
    },
    Good: {
      card: goodCard,
      log: goodReviewLog,
      timeFromNow: timeFromNow(goodCard.due),
    },
    Easy: {
      card: easyCard,
      log: easyReviewLog,
      timeFromNow: timeFromNow(easyCard.due),
    },
  };
};

const timeFromNow = (futureDate: Date): string => {
  const now = new Date();
  const diffMs = futureDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return 'bây giờ';
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} năm`;
  if (months > 0) return `${months} tháng`;
  if (days > 0) return `${days} ngày`;
  if (hours > 0) return `${hours} giờ`;
  if (minutes > 0) return `${minutes} phút`;
  return `${seconds} giây`;
};

export const mapCard: (card: any) => AnkiCard = (card: any) => {
  return {
    ...card,
    createdDate: new Date(card.createdDate),
    updatedDate: new Date(card.updatedDate),
    localUpdatedDate: new Date(card.localUpdatedDate),
    due: new Date(card.due),
    last_review: card.last_review ? new Date(card.last_review) : null,
  };
};

export const mapDeck: (deck: any) => Deck = (deck: any) => {
  return {
    ...deck,
    createdDate: new Date(deck.createdDate),
    updatedDate: new Date(deck.updatedDate),
    localUpdatedDate: new Date(deck.localUpdatedDate),
  };
};

export const mapReviewLog: (reviewLog: any) => ReviewLog = (reviewLog: any) => {
  return {
    ...reviewLog,
    review: new Date(reviewLog.review),
    due: new Date(reviewLog.due),
  };
};

export const getBeNotGone = () => {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  return nextMidnight.toISOString();
};
