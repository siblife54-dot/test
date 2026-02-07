import doors from './doors.json';
import treasures from './treasures.json';
import { DoorCard, TreasureCard } from '../types';

const shuffle = <T,>(cards: T[]): T[] => {
  const array = [...cards];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createDoorDeck = (): DoorCard[] => {
  return shuffle(doors as DoorCard[]);
};

export const createTreasureDeck = (): TreasureCard[] => {
  return shuffle(treasures as TreasureCard[]);
};

export const drawFromDeck = <T,>(deck: T[], discard: T[]): [T | undefined, T[], T[]] => {
  if (deck.length === 0) {
    const reshuffled = shuffle(discard);
    return [reshuffled[0], reshuffled.slice(1), []];
  }
  const [card, ...rest] = deck;
  return [card, rest, discard];
};
