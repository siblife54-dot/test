import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createDoorDeck, createTreasureDeck, drawFromDeck } from '../data/decks';
import {
  CombatState,
  CurseCard,
  DoorCard,
  GameState,
  MonsterCard,
  Player,
  TreasureCard
} from '../types';
import { calculateItemBonus, calculatePlayerPower, determineCombatOutcome } from '../logic/combat';

const createPlayer = (name: string, index: number): Player => ({
  id: `player-${index + 1}`,
  name,
  level: 1,
  hand: [],
  items: []
});

const initialState: GameState = {
  started: false,
  players: [],
  currentPlayerIndex: 0,
  doorDeck: [],
  treasureDeck: [],
  discardDoor: [],
  discardTreasure: [],
  combat: undefined,
  eventLog: []
};

type GameActions = {
  startGame: (names: string[]) => void;
  resetGame: () => void;
  openDoor: () => void;
  drawTreasure: () => void;
  endTurn: () => void;
  equipItem: (cardId: string) => void;
  unequipItem: (cardId: string) => void;
  discardFromHand: (cardId: string) => void;
  playOneShot: (cardId: string) => void;
  requestHelp: (helperId: string) => void;
  resolveCombat: () => void;
  escapeCombat: () => void;
};

const addEvent = (state: GameState, message: string): GameState => ({
  ...state,
  eventLog: [message, ...state.eventLog].slice(0, 50)
});

const applyLoseLevel = (player: Player, amount: number): Player => ({
  ...player,
  level: Math.max(1, player.level - amount)
});

const applyLoseItem = (player: Player, amount: number): Player => {
  if (player.items.length === 0) return player;
  const items = [...player.items];
  items.splice(Math.floor(Math.random() * items.length), amount);
  return {
    ...player,
    items
  };
};

const applyCurse = (player: Player, card: CurseCard): Player => {
  if (card.curseEffect.type === 'loseLevel') {
    return applyLoseLevel(player, card.curseEffect.amount);
  }
  return applyLoseItem(player, card.curseEffect.amount);
};

const applyBadStuff = (player: Player, monster: MonsterCard): Player => {
  const effect = monster.badStuffEffect;
  if (!effect) return player;
  if (effect.type === 'loseLevel') {
    return applyLoseLevel(player, effect.amount);
  }
  return applyLoseItem(player, effect.amount);
};

const drawTreasures = (
  treasureDeck: TreasureCard[],
  discardTreasure: TreasureCard[],
  count: number
): { cards: TreasureCard[]; deck: TreasureCard[]; discard: TreasureCard[] } => {
  let deck = treasureDeck;
  let discard = discardTreasure;
  const cards: TreasureCard[] = [];
  for (let i = 0; i < count; i += 1) {
    const [card, newDeck, newDiscard] = drawFromDeck(deck, discard);
    deck = newDeck;
    discard = newDiscard;
    if (card) cards.push(card);
  }
  return { cards, deck, discard };
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      startGame: (names) => {
        const players = names.map((name, index) => createPlayer(name, index));
        set(
          addEvent(
            {
              ...initialState,
              started: true,
              players,
              doorDeck: createDoorDeck(),
              treasureDeck: createTreasureDeck()
            },
            'Новая партия началась.'
          )
        );
      },
      resetGame: () => set({ ...initialState }),
      openDoor: () => {
        const state = get();
        if (!state.started || state.combat) return;
        const [card, doorDeck, discardDoor] = drawFromDeck(
          state.doorDeck,
          state.discardDoor
        );
        if (!card) return;
        let nextState: GameState = { ...state, doorDeck, discardDoor };
        if (card.type === 'monster') {
          const combat: CombatState = {
            monster: card,
            helperBonus: 0,
            oneShotBonus: 0,
            resolved: false
          };
          nextState = { ...nextState, combat };
          nextState = addEvent(nextState, `Монстр: ${card.name} (сила ${card.power}).`);
        } else if (card.type === 'curse') {
          const player = state.players[state.currentPlayerIndex];
          const updatedPlayer = applyCurse(player, card);
          const players = [...state.players];
          players[state.currentPlayerIndex] = updatedPlayer;
          nextState = addEvent(
            { ...nextState, players, discardDoor: [card, ...discardDoor] },
            `Проклятие: ${card.name}.`
          );
        } else {
          const players = [...state.players];
          players[state.currentPlayerIndex] = {
            ...players[state.currentPlayerIndex],
            hand: [card, ...players[state.currentPlayerIndex].hand]
          };
          nextState = addEvent({ ...nextState, players }, `Карта в руку: ${card.name}.`);
        }
        set(nextState);
      },
      drawTreasure: () => {
        const state = get();
        if (!state.started || state.combat) return;
        const [card, treasureDeck, discardTreasure] = drawFromDeck(
          state.treasureDeck,
          state.discardTreasure
        );
        if (!card) return;
        const players = [...state.players];
        players[state.currentPlayerIndex] = {
          ...players[state.currentPlayerIndex],
          hand: [card, ...players[state.currentPlayerIndex].hand]
        };
        set(
          addEvent(
            { ...state, treasureDeck, discardTreasure, players },
            `Сокровище в руку: ${card.name}.`
          )
        );
      },
      endTurn: () => {
        const state = get();
        if (state.combat) return;
        const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
        set(addEvent({ ...state, currentPlayerIndex: nextIndex }, 'Ход передан.'));
      },
      equipItem: (cardId) => {
        const state = get();
        const player = state.players[state.currentPlayerIndex];
        const card = player.hand.find((item) => item.id === cardId);
        if (!card || card.type !== 'item') return;
        const updatedPlayer: Player = {
          ...player,
          hand: player.hand.filter((item) => item.id !== cardId),
          items: [card, ...player.items]
        };
        const players = [...state.players];
        players[state.currentPlayerIndex] = updatedPlayer;
        set(addEvent({ ...state, players }, `Экипирован предмет: ${card.name}.`));
      },
      unequipItem: (cardId) => {
        const state = get();
        const player = state.players[state.currentPlayerIndex];
        const card = player.items.find((item) => item.id === cardId);
        if (!card) return;
        const updatedPlayer: Player = {
          ...player,
          items: player.items.filter((item) => item.id !== cardId),
          hand: [card, ...player.hand]
        };
        const players = [...state.players];
        players[state.currentPlayerIndex] = updatedPlayer;
        set(addEvent({ ...state, players }, `Снял предмет: ${card.name}.`));
      },
      discardFromHand: (cardId) => {
        const state = get();
        const player = state.players[state.currentPlayerIndex];
        const card = player.hand.find((item) => item.id === cardId);
        if (!card) return;
        const updatedPlayer: Player = {
          ...player,
          hand: player.hand.filter((item) => item.id !== cardId)
        };
        const players = [...state.players];
        players[state.currentPlayerIndex] = updatedPlayer;
        if (card.type === 'monster' || card.type === 'curse') {
          set(
            addEvent(
              { ...state, players, discardDoor: [card as DoorCard, ...state.discardDoor] },
              `Сброшена карта дверей: ${card.name}.`
            )
          );
        } else {
          set(
            addEvent(
              {
                ...state,
                players,
                discardTreasure: [card as TreasureCard, ...state.discardTreasure]
              },
              `Сброшено сокровище: ${card.name}.`
            )
          );
        }
      },
      playOneShot: (cardId) => {
        const state = get();
        if (!state.combat) return;
        const player = state.players[state.currentPlayerIndex];
        const card = player.hand.find((item) => item.id === cardId);
        if (!card || card.type !== 'one-shot') return;
        const updatedPlayer: Player = {
          ...player,
          hand: player.hand.filter((item) => item.id !== cardId)
        };
        const players = [...state.players];
        players[state.currentPlayerIndex] = updatedPlayer;
        const combat = {
          ...state.combat,
          oneShotBonus: state.combat.oneShotBonus + card.bonus
        };
        set(
          addEvent(
            {
              ...state,
              players,
              combat,
              discardTreasure: [card, ...state.discardTreasure]
            },
            `Сыграна одноразовая карта: ${card.name} (+${card.bonus}).`
          )
        );
      },
      requestHelp: (helperId) => {
        const state = get();
        if (!state.combat) return;
        const helper = state.players.find((player) => player.id === helperId);
        if (!helper || helper.id === state.players[state.currentPlayerIndex].id) return;
        const helperBonus = helper.level + calculateItemBonus(helper.items);
        const combat = { ...state.combat, helperId, helperBonus };
        set(addEvent({ ...state, combat }, `Помощь от ${helper.name} (+${helperBonus}).`));
      },
      resolveCombat: () => {
        const state = get();
        if (!state.combat) return;
        const player = state.players[state.currentPlayerIndex];
        const playerPower = calculatePlayerPower(player, state.combat);
        const monsterPower = state.combat.monster.power;
        const outcome = determineCombatOutcome(playerPower, monsterPower);
        let players = [...state.players];
        let nextState: GameState = { ...state, combat: undefined };
        if (outcome === 'win') {
          const updatedPlayer = {
            ...player,
            level: Math.min(10, player.level + state.combat.monster.rewardLevels)
          };
          const treasurePull = drawTreasures(
            state.treasureDeck,
            state.discardTreasure,
            state.combat.monster.rewardTreasures
          );
          updatedPlayer.hand = [...treasurePull.cards, ...updatedPlayer.hand];
          players[state.currentPlayerIndex] = updatedPlayer;
          nextState = addEvent(
            {
              ...nextState,
              players,
              treasureDeck: treasurePull.deck,
              discardTreasure: treasurePull.discard,
              discardDoor: [state.combat.monster, ...state.discardDoor]
            },
            `Победа! +${state.combat.monster.rewardLevels} уровень(я) и ${state.combat.monster.rewardTreasures} сокровищ.`
          );
        } else {
          const updatedPlayer = applyBadStuff(player, state.combat.monster);
          players[state.currentPlayerIndex] = updatedPlayer;
          nextState = addEvent(
            {
              ...nextState,
              players,
              discardDoor: [state.combat.monster, ...state.discardDoor]
            },
            `Поражение. ${state.combat.monster.badStuff}`
          );
        }
        set(nextState);
      },
      escapeCombat: () => {
        const state = get();
        if (!state.combat) return;
        const roll = Math.floor(Math.random() * 6) + 1;
        const player = state.players[state.currentPlayerIndex];
        if (roll >= 5) {
          set(
            addEvent(
              {
                ...state,
                combat: undefined,
                discardDoor: [state.combat.monster, ...state.discardDoor]
              },
              `Сбежал! Бросок ${roll}.`
            )
          );
        } else {
          const updatedPlayer = applyBadStuff(player, state.combat.monster);
          const players = [...state.players];
          players[state.currentPlayerIndex] = updatedPlayer;
          set(
            addEvent(
              {
                ...state,
                players,
                combat: undefined,
                discardDoor: [state.combat.monster, ...state.discardDoor]
              },
              `Не удалось сбежать (бросок ${roll}). ${state.combat.monster.badStuff}`
            )
          );
        }
      }
    }),
    {
      name: 'munchkin-mvp'
    }
  )
);
