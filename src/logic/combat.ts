import { CombatState, MonsterCard, Player, TreasureCard } from '../types';

export const calculateItemBonus = (items: TreasureCard[]): number =>
  items.reduce((sum, item) => sum + item.bonus, 0);

export const calculatePlayerPower = (player: Player, combat?: CombatState): number => {
  const base = player.level + calculateItemBonus(player.items);
  if (!combat) return base;
  return base + combat.oneShotBonus + combat.helperBonus;
};

export const calculateMonsterPower = (monster: MonsterCard): number => monster.power;

export const determineCombatOutcome = (
  playerPower: number,
  monsterPower: number
): 'win' | 'lose' => {
  return playerPower > monsterPower ? 'win' : 'lose';
};
