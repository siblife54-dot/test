import { Player } from '../types';

export type ActivePanel = 'hand' | 'inventory' | 'log' | 'none';

type Props = {
  players: Player[];
  currentPlayerId: string;
  currentPlayerIndex: number;
  onOpenDoor: () => void;
  onDrawTreasure: () => void;
  onEndTurn: () => void;
  onPanelChange: (panel: ActivePanel) => void;
};

export const MainTable = ({
  players,
  currentPlayerId,
  currentPlayerIndex,
  onOpenDoor,
  onDrawTreasure,
  onEndTurn,
  onPanelChange
}: Props) => {
  return (
    <div className="grid two">
      <div className="card">
        <h2 className="section-title">Игроки</h2>
        <div className="list">
          {players.map((player, index) => {
            const isCurrent = player.id === currentPlayerId;
            const totalBonus = player.items.reduce((sum, item) => sum + item.bonus, 0);
            return (
              <div key={player.id} className="card-row">
                <div>
                  <strong>{player.name}</strong>
                  <div className="card-meta">
                    Уровень {player.level} · Бонус {totalBonus}
                  </div>
                  {isCurrent && <div className="badge">Ход {index + 1}</div>}
                </div>
                <div className="card-meta">Рука: {player.hand.length}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card">
        <h2 className="section-title">Ход игрока</h2>
        <div className="badge">Текущий: {players[currentPlayerIndex].name}</div>
        <div className="toolbar" style={{ marginTop: 16 }}>
          <button type="button" onClick={onOpenDoor}>
            Открыть дверь
          </button>
          <button type="button" className="secondary" onClick={onDrawTreasure}>
            Добор
          </button>
          <button type="button" className="secondary" onClick={() => onPanelChange('hand')}>
            Рука
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => onPanelChange('inventory')}
          >
            Шмотки
          </button>
          <button type="button" className="secondary" onClick={() => onPanelChange('log')}>
            Лог событий
          </button>
          <button type="button" onClick={onEndTurn}>
            Конец хода
          </button>
          <button type="button" className="secondary" onClick={() => onPanelChange('none')}>
            Закрыть панели
          </button>
        </div>
      </div>
    </div>
  );
};
