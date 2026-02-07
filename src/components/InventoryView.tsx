import { TreasureCard } from '../types';

type Props = {
  items: TreasureCard[];
  onUnequip: (cardId: string) => void;
};

export const InventoryView = ({ items, onUnequip }: Props) => {
  const bonus = items.reduce((sum, item) => sum + item.bonus, 0);
  return (
    <div className="card panel">
      <h3 className="section-title">Шмотки</h3>
      <div className="badge">Суммарный бонус: +{bonus}</div>
      {items.length === 0 ? (
        <p>Нет экипировки.</p>
      ) : (
        <div className="list" style={{ marginTop: 12 }}>
          {items.map((item) => (
            <div key={item.id} className="card-row">
              <div>
                <h4>{item.name}</h4>
                <div className="card-meta">+{item.bonus}</div>
              </div>
              <button type="button" className="secondary" onClick={() => onUnequip(item.id)}>
                Снять
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
