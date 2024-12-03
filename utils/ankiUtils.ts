import { Card, createEmptyCard, fsrs, Rating } from 'ts-fsrs';

export interface WordType {
  word: string;
  sentence: string;
  reading: string;
  meaning: string;
}

export interface AnkiCard extends Card, WordType {
  _id?: string;
  deckId: string;
}

export const f = fsrs();

export const createCard = (deckId: string, wordType: WordType): AnkiCard => {
  const card: AnkiCard = createEmptyCard(new Date(), (newCard) => ({
    ...newCard,
    ...wordType,
    deckId,
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

export const getDeckInfo = async () => {};
