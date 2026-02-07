export type DoorCardType = 'monster' | 'curse' | 'class' | 'race';
export type TreasureCardType = 'item' | 'one-shot' | 'gold';

export type CardBase = {
  id: string;
  name: string;
  type: DoorCardType | TreasureCardType;
  description?: string;
};

export type MonsterCard = CardBase & {
  type: 'monster';
  power: number;
  rewardLevels: number;
  rewardTreasures: number;
  badStuff: string;
  badStuffEffect?: BadStuffEffect;
};

export type CurseCard = CardBase & {
  type: 'curse';
  curseEffect: CurseEffect;
};

export type DoorCard = MonsterCard | CurseCard;

export type TreasureCard = CardBase & {
  type: 'item' | 'one-shot';
  bonus: number;
  goldValue: number;
};

export type BadStuffEffect =
  | { type: 'loseLevel'; amount: number }
  | { type: 'loseItem'; amount: number };

export type CurseEffect =
  | { type: 'loseLevel'; amount: number }
  | { type: 'loseItem'; amount: number };

export type Player = {
  id: string;
  name: string;
  level: number;
  hand: Array<DoorCard | TreasureCard>;
  items: TreasureCard[];
};

export type CombatState = {
  monster: MonsterCard;
  helperId?: string;
  helperBonus: number;
  oneShotBonus: number;
  resolved: boolean;
  outcome?: 'win' | 'lose' | 'escape';
};

export type GameState = {
  started: boolean;
  players: Player[];
  currentPlayerIndex: number;
  doorDeck: DoorCard[];
  treasureDeck: TreasureCard[];
  discardDoor: DoorCard[];
  discardTreasure: TreasureCard[];
  combat?: CombatState;
  eventLog: string[];
};
