import { DoorCard, TreasureCard } from '../types';

type Props = {
  cards: Array<DoorCard | TreasureCard>;
  combatActive: boolean;
  onEquip: (cardId: string) => void;
  onPlayOneShot: (cardId: string) => void;
  onDiscard: (cardId: string) => void;
};

export const HandView = ({ cards, combatActive, onEquip, onPlayOneShot, onDiscard }: Props) => {
  return (
    <div className="card panel">
      <h3 className="section-title">Рука</h3>
      {cards.length === 0 ? (
        <p>Рука пуста.</p>
      ) : (
        <div className="list">
          {cards.map((card) => (
            <div key={card.id} className="card-row">
              <div>
                <h4>{card.name}</h4>
                <div className="card-meta">
                  Тип: {card.type} {card.type === 'item' || card.type === 'one-shot' ? `· +${card.bonus}` : ''}
                </div>
              </div>
              <div className="inline">
                {card.type === 'item' && (
                  <button type="button" onClick={() => onEquip(card.id)}>
                    Экипировать
                  </button>
                )}
                {card.type === 'one-shot' && (
                  <button type="button" disabled={!combatActive} onClick={() => onPlayOneShot(card.id)}>
                    Использовать
                  </button>
                )}
                <button type="button" className="secondary" onClick={() => onDiscard(card.id)}>
                  Сбросить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
