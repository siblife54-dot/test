import { useState } from 'react';

type Props = {
  onStart: (names: string[]) => void;
};

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

export const SetupScreen = ({ onStart }: Props) => {
  const [names, setNames] = useState<string[]>(['', '']);

  const updateName = (index: number, value: string) => {
    const next = [...names];
    next[index] = value;
    setNames(next);
  };

  const addPlayer = () => {
    if (names.length < MAX_PLAYERS) {
      setNames([...names, '']);
    }
  };

  const removePlayer = (index: number) => {
    if (names.length > MIN_PLAYERS) {
      setNames(names.filter((_, idx) => idx !== index));
    }
  };

  const canStart = names.length >= MIN_PLAYERS && names.every((name) => name.trim());

  return (
    <div className="container">
      <div className="card">
        <h1 className="section-title">Munchkin-like MVP</h1>
        <p>Добавьте 2–4 игрока и начните тестовую партию.</p>
        <div className="list">
          {names.map((name, index) => (
            <div key={`player-${index}`} className="inline">
              <input
                value={name}
                placeholder={`Игрок ${index + 1}`}
                onChange={(event) => updateName(index, event.target.value)}
              />
              <button
                className="secondary"
                type="button"
                onClick={() => removePlayer(index)}
                disabled={names.length <= MIN_PLAYERS}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
        <div className="toolbar" style={{ marginTop: 16 }}>
          <button type="button" className="secondary" onClick={addPlayer}>
            Добавить игрока
          </button>
          <button type="button" onClick={() => onStart(names.map((name) => name.trim()))} disabled={!canStart}>
            Начать
          </button>
        </div>
      </div>
    </div>
  );
};
