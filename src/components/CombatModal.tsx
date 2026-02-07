import { CombatState, Player } from '../types';
import { calculatePlayerPower, calculateMonsterPower } from '../logic/combat';

type Props = {
  combat: CombatState;
  player: Player;
  helpers: Player[];
  onResolve: () => void;
  onEscape: () => void;
  onSelectHelper: (helperId: string) => void;
};

export const CombatModal = ({
  combat,
  player,
  helpers,
  onResolve,
  onEscape,
  onSelectHelper
}: Props) => {
  const playerPower = calculatePlayerPower(player, combat);
  const monsterPower = calculateMonsterPower(combat.monster);

  return (
    <div className="modal">
      <div className="card modal-content">
        <h2 className="section-title">Бой</h2>
        <p>
          Монстр: <strong>{combat.monster.name}</strong> (сила {combat.monster.power})
        </p>
        <p>Твоя сила: {playerPower}</p>
        <p>Сила монстра: {monsterPower}</p>
        <div className="inline" style={{ marginTop: 12 }}>
          <select
            value={combat.helperId ?? ''}
            onChange={(event) => onSelectHelper(event.target.value)}
          >
            <option value="">Без помощника</option>
            {helpers.map((helper) => (
              <option key={helper.id} value={helper.id}>
                {helper.name} (+{helper.level + helper.items.reduce((sum, item) => sum + item.bonus, 0)})
              </option>
            ))}
          </select>
        </div>
        <p className="card-meta" style={{ marginTop: 8 }}>
          Помощь добавляет силу помощника. Одноразовые карты играются из руки.
        </p>
        <div className="toolbar" style={{ marginTop: 16 }}>
          <button type="button" onClick={onResolve}>
            Завершить бой
          </button>
          <button type="button" className="secondary" onClick={onEscape}>
            Сбежать (d6)
          </button>
        </div>
      </div>
    </div>
  );
};
