import { useMemo } from 'react';

type Props = {
  entries: string[];
};

export const EventLog = ({ entries }: Props) => {
  const list = useMemo(() => entries.slice(0, 50), [entries]);

  return (
    <div className="card panel">
      <h3 className="section-title">Лог событий</h3>
      {list.length === 0 ? (
        <p>Событий пока нет.</p>
      ) : (
        <ol className="log">
          {list.map((entry, index) => (
            <li key={`${entry}-${index}`} style={{ marginBottom: 8 }}>
              {entry}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
