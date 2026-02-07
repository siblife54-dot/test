import { describe, expect, it } from 'vitest';
import { calculateItemBonus, calculatePlayerPower, determineCombatOutcome } from '../logic/combat';
import { CombatState, MonsterCard, Player, TreasureCard } from '../types';

const mockItem = (bonus: number): TreasureCard => ({
  id: `item-${bonus}`,
  name: `Item ${bonus}`,
  type: 'item',
  bonus,
  goldValue: 100
});

const mockPlayer = (level: number, bonuses: number[] = []): Player => ({
  id: 'player-1',
  name: 'Тестер',
  level,
  hand: [],
  items: bonuses.map((bonus) => mockItem(bonus))
});

describe('combat helpers', () => {
  it('calculates item bonus correctly', () => {
    expect(calculateItemBonus([mockItem(1), mockItem(2)])).toBe(3);
  });

  it('calculates player power with combat bonuses', () => {
    const player = mockPlayer(2, [1]);
    const combat: CombatState = {
      monster: {
        id: 'monster-1',
        name: 'Тестовый монстр',
        type: 'monster',
        power: 5,
        rewardLevels: 1,
        rewardTreasures: 1,
        badStuff: 'Плохо'
      },
      helperBonus: 2,
      oneShotBonus: 3,
      resolved: false
    };
    expect(calculatePlayerPower(player, combat)).toBe(8);
  });

  it('determines win or lose', () => {
    const monster: MonsterCard = {
      id: 'monster-2',
      name: 'Слабый монстр',
      type: 'monster',
      power: 4,
      rewardLevels: 1,
      rewardTreasures: 1,
      badStuff: 'Плохо'
    };
    expect(determineCombatOutcome(6, monster.power)).toBe('win');
    expect(determineCombatOutcome(4, monster.power)).toBe('lose');
  });
});
