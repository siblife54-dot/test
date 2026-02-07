import { useMemo, useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { MainTable, ActivePanel } from './components/MainTable';
import { HandView } from './components/HandView';
import { InventoryView } from './components/InventoryView';
import { EventLog } from './components/EventLog';
import { CombatModal } from './components/CombatModal';
import { useGameStore } from './store/gameStore';

const App = () => {
  const {
    started,
    players,
    currentPlayerIndex,
    combat,
    eventLog,
    doorDeck,
    treasureDeck,
    startGame,
    resetGame,
    openDoor,
    drawTreasure,
    endTurn,
    equipItem,
    unequipItem,
    discardFromHand,
    playOneShot,
    requestHelp,
    resolveCombat,
    escapeCombat
  } = useGameStore();

  const [panel, setPanel] = useState<ActivePanel>('none');

  const currentPlayer = players[currentPlayerIndex];
  const helpers = useMemo(
    () => players.filter((player) => player.id !== currentPlayer?.id),
    [players, currentPlayer]
  );

  if (!started) {
    return <SetupScreen onStart={startGame} />;
  }

  return (
    <div className="container">
      <header className="card" style={{ marginBottom: 16 }}>
        <h1 className="section-title">Munchkin-like MVP</h1>
        <div className="inline">
          <span className="badge">Двери: {doorDeck.length}</span>
          <span className="badge">Сокровища: {treasureDeck.length}</span>
          <button type="button" className="secondary" onClick={resetGame}>
            Сбросить
          </button>
        </div>
      </header>

      <MainTable
        players={players}
        currentPlayerId={currentPlayer.id}
        currentPlayerIndex={currentPlayerIndex}
        onOpenDoor={openDoor}
        onDrawTreasure={drawTreasure}
        onEndTurn={endTurn}
        onPanelChange={setPanel}
      />

      {panel === 'hand' && (
        <HandView
          cards={currentPlayer.hand}
          combatActive={Boolean(combat)}
          onEquip={equipItem}
          onPlayOneShot={playOneShot}
          onDiscard={discardFromHand}
        />
      )}

      {panel === 'inventory' && (
        <InventoryView items={currentPlayer.items} onUnequip={unequipItem} />
      )}

      {panel === 'log' && <EventLog entries={eventLog} />}

      {combat && currentPlayer && (
        <CombatModal
          combat={combat}
          player={currentPlayer}
          helpers={helpers}
          onResolve={resolveCombat}
          onEscape={escapeCombat}
          onSelectHelper={(helperId) => requestHelp(helperId)}
        />
      )}
    </div>
  );
};

export default App;
