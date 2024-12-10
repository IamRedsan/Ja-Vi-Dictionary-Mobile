import { Card, createEmptyCard, fsrs, Rating } from 'ts-fsrs';

export interface WordType {
  word: string;
  sentence: string;
  reading: string;
  meaning: string;
}

export interface AnkiCard extends Card, WordType {
  id?: number;
  deckId: number;
  createdDate: Date;
  updatedDate: Date;
  localUpdatedDate: Date;
}

export enum Action {
  CREATE = 0,
  UPDATE = 1,
  DELETE = 2,
  NONE = 3,
}

export const f = fsrs();

export const createCard = (deckId: number, wordType: WordType): AnkiCard => {
  const curDate = new Date();

  const card: AnkiCard = createEmptyCard(new Date(), (newCard) => ({
    ...newCard,
    ...wordType,
    deckId,
    createdDate: curDate,
    updatedDate: curDate,
    localUpdatedDate: curDate,
  }));

  return card;
};

export const getSchedulingCards = (
  card: AnkiCard
): {
  [K in Exclude<keyof typeof Rating, 'Manual'>]: {
    timeFromNow: string;
    card: AnkiCard;
  };
} => {
  const schedulingCards = f.repeat(card, new Date());

  const againCard = schedulingCards[Rating.Again].card as AnkiCard;
  const hardCard = schedulingCards[Rating.Hard].card as AnkiCard;
  const goodCard = schedulingCards[Rating.Good].card as AnkiCard;
  const easyCard = schedulingCards[Rating.Easy].card as AnkiCard;

  return {
    Again: {
      card: againCard,
      timeFromNow: timeFromNow(againCard.due),
    },
    Hard: {
      card: hardCard,
      timeFromNow: timeFromNow(hardCard.due),
    },
    Good: {
      card: goodCard,
      timeFromNow: timeFromNow(goodCard.due),
    },
    Easy: {
      card: easyCard,
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

export const getDeckInfo = async () => {};
