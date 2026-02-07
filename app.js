const STORAGE_KEY = "munchkinLikeSave";

const baseDoors = [
  {
    id: "m1",
    type: "Monster",
    name: "Гоблин-сапожник",
    power: 3,
    rewardLevels: 1,
    rewardTreasures: 1,
    badStuff: "Потеряй 1 уровень."
  },
  {
    id: "m2",
    type: "Monster",
    name: "Туманный волк",
    power: 5,
    rewardLevels: 1,
    rewardTreasures: 2,
    badStuff: "Сбрось случайный экипированный предмет."
  },
  {
    id: "m3",
    type: "Monster",
    name: "Книга-убийца",
    power: 4,
    rewardLevels: 1,
    rewardTreasures: 1,
    badStuff: "Потеряй 1 уровень."
  },
  {
    id: "m4",
    type: "Monster",
    name: "Зеркальный фантом",
    power: 6,
    rewardLevels: 1,
    rewardTreasures: 2,
    badStuff: "Сбрось 1 карту из руки."
  },
  {
    id: "m5",
    type: "Monster",
    name: "Каменный жук",
    power: 2,
    rewardLevels: 1,
    rewardTreasures: 1,
    badStuff: "Потеряй 1 уровень."
  },
  {
    id: "m6",
    type: "Monster",
    name: "Снежный дуэлянт",
    power: 7,
    rewardLevels: 1,
    rewardTreasures: 2,
    badStuff: "Сбрось 2 карты из руки."
  },
  {
    id: "m7",
    type: "Monster",
    name: "Канализационный бард",
    power: 1,
    rewardLevels: 1,
    rewardTreasures: 1,
    badStuff: "Потеряй 1 уровень."
  },
  {
    id: "m8",
    type: "Monster",
    name: "Сборщик тумана",
    power: 8,
    rewardLevels: 2,
    rewardTreasures: 2,
    badStuff: "Сбрось случайный предмет из экипировки."
  },
  {
    id: "m9",
    type: "Monster",
    name: "Рыжий огр",
    power: 9,
    rewardLevels: 2,
    rewardTreasures: 2,
    badStuff: "Потеряй 2 уровня."
  },
  {
    id: "m10",
    type: "Monster",
    name: "Ходячий компас",
    power: 3,
    rewardLevels: 1,
    rewardTreasures: 1,
    badStuff: "Сбрось 1 карту из руки."
  },
  {
    id: "m11",
    type: "Monster",
    name: "Искристый слизень",
    power: 4,
    rewardLevels: 1,
    rewardTreasures: 1,
    badStuff: "Потеряй 1 уровень."
  },
  {
    id: "m12",
    type: "Monster",
    name: "Песчаный хранитель",
    power: 6,
    rewardLevels: 1,
    rewardTreasures: 2,
    badStuff: "Сбрось случайный предмет из экипировки."
  },
  {
    id: "c1",
    type: "Curse",
    name: "Липкие перчатки",
    effect: "Проклятие: сбрось случайный экипированный предмет.",
    curseType: "loseItem"
  },
  {
    id: "c2",
    type: "Curse",
    name: "Смутное сомнение",
    effect: "Проклятие: -1 уровень.",
    curseType: "levelDown"
  },
  {
    id: "c3",
    type: "Curse",
    name: "Забытый пароль",
    effect: "Проклятие: сбрось 1 карту из руки.",
    curseType: "discardHand"
  },
  {
    id: "c4",
    type: "Curse",
    name: "Тяжёлые сапоги",
    effect: "Проклятие: -1 уровень.",
    curseType: "levelDown"
  },
  {
    id: "c5",
    type: "Curse",
    name: "Скрипучий пояс",
    effect: "Проклятие: сбрось случайный экипированный предмет.",
    curseType: "loseItem"
  },
  {
    id: "c6",
    type: "Curse",
    name: "Пыльный вихрь",
    effect: "Проклятие: сбрось 1 карту из руки.",
    curseType: "discardHand"
  }
];

const baseTreasures = [
  {
    id: "t1",
    type: "Item",
    name: "Шляпа проверяющего",
    bonus: 1,
    goldValue: 200
  },
  {
    id: "t2",
    type: "Item",
    name: "Плащ-накидка",
    bonus: 2,
    goldValue: 300
  },
  {
    id: "t3",
    type: "Item",
    name: "Сапоги стремительности",
    bonus: 1,
    goldValue: 150
  },
  {
    id: "t4",
    type: "Item",
    name: "Щит из крышки",
    bonus: 2,
    goldValue: 350
  },
  {
    id: "t5",
    type: "Item",
    name: "Перчатки ловкача",
    bonus: 1,
    goldValue: 120
  },
  {
    id: "t6",
    type: "Item",
    name: "Короткий меч",
    bonus: 2,
    goldValue: 250
  },
  {
    id: "t7",
    type: "Item",
    name: "Шлем путника",
    bonus: 1,
    goldValue: 140
  },
  {
    id: "t8",
    type: "Item",
    name: "Кольчуга из фольги",
    bonus: 3,
    goldValue: 400
  },
  {
    id: "t9",
    type: "OneShot",
    name: "Сверкание порошка",
    bonus: 3,
    goldValue: 100
  },
  {
    id: "t10",
    type: "OneShot",
    name: "Бутылка храбрости",
    bonus: 2,
    goldValue: 80
  },
  {
    id: "t11",
    type: "OneShot",
    name: "Крик поддержки",
    bonus: 1,
    goldValue: 50
  },
  {
    id: "t12",
    type: "OneShot",
    name: "Талисман удачи",
    bonus: 2,
    goldValue: 90
  }
];

const state = {
  players: [],
  currentPlayer: 0,
  doorDeck: [],
  treasureDeck: [],
  currentEvent: null,
  combat: null,
  log: []
};

const els = {
  startScreen: document.getElementById("startScreen"),
  gameScreen: document.getElementById("gameScreen"),
  startInputs: document.querySelectorAll("#startScreen input"),
  startGameBtn: document.getElementById("startGameBtn"),
  newGameBtn: document.getElementById("newGameBtn"),
  resetSaveBtn: document.getElementById("resetSaveBtn"),
  openDoorBtn: document.getElementById("openDoorBtn"),
  endTurnBtn: document.getElementById("endTurnBtn"),
  playersList: document.getElementById("playersList"),
  eventCard: document.getElementById("eventCard"),
  modalOverlay: document.getElementById("modalOverlay"),
  combatModal: document.getElementById("combatModal"),
  combatBody: document.getElementById("combatBody"),
  handModal: document.getElementById("handModal"),
  handBody: document.getElementById("handBody"),
  equipModal: document.getElementById("equipModal"),
  equipBody: document.getElementById("equipBody"),
  logModal: document.getElementById("logModal"),
  logBody: document.getElementById("logBody"),
  handBtn: document.getElementById("handBtn"),
  equipBtn: document.getElementById("equipBtn"),
  logBtn: document.getElementById("logBtn")
};

const modals = [
  els.combatModal,
  els.handModal,
  els.equipModal,
  els.logModal
];

const logEvent = (message) => {
  const timestamp = new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });
  state.log.unshift(`[${timestamp}] ${message}`);
  if (state.log.length > 50) {
    state.log.pop();
  }
  saveState();
};

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const rebuildDecks = () => {
  if (state.doorDeck.length === 0) {
    state.doorDeck = shuffle(baseDoors);
  }
  if (state.treasureDeck.length === 0) {
    state.treasureDeck = shuffle(baseTreasures);
  }
};

const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const loadState = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const data = JSON.parse(raw);
  Object.assign(state, data);
  return true;
};

const resetState = () => {
  state.players = [];
  state.currentPlayer = 0;
  state.doorDeck = [];
  state.treasureDeck = [];
  state.currentEvent = null;
  state.combat = null;
  state.log = [];
};

const currentPlayer = () => state.players[state.currentPlayer];

const renderPlayers = () => {
  els.playersList.innerHTML = "";
  state.players.forEach((player, index) => {
    const li = document.createElement("li");
    li.className = index === state.currentPlayer ? "active" : "";
    li.innerHTML = `
      <span>${player.name}</span>
      <span>Ур. ${player.level} + Бонус ${player.gearBonus}</span>
    `;
    els.playersList.appendChild(li);
  });
};

const renderEvent = (contentHtml) => {
  els.eventCard.innerHTML = contentHtml;
};

const showModal = (modal) => {
  modals.forEach((item) => item.classList.add("hidden"));
  els.modalOverlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modals.forEach((item) => item.classList.add("hidden"));
  els.modalOverlay.classList.add("hidden");
};

const drawDoor = () => {
  rebuildDecks();
  return state.doorDeck.pop();
};

const drawTreasure = () => {
  rebuildDecks();
  return state.treasureDeck.pop();
};

const applyCurse = (card) => {
  const player = currentPlayer();
  if (card.curseType === "levelDown") {
    player.level = Math.max(1, player.level - 1);
    logEvent(`${player.name} теряет 1 уровень из-за проклятия.`);
  }
  if (card.curseType === "loseItem") {
    if (player.equipped.length > 0) {
      const idx = Math.floor(Math.random() * player.equipped.length);
      const [lost] = player.equipped.splice(idx, 1);
      player.gearBonus -= lost.bonus;
      logEvent(`${player.name} теряет предмет: ${lost.name}.`);
    } else {
      logEvent(`${player.name} избегает потерь: нет экипировки.`);
    }
  }
  if (card.curseType === "discardHand") {
    if (player.hand.length > 0) {
      const idx = Math.floor(Math.random() * player.hand.length);
      const [discarded] = player.hand.splice(idx, 1);
      logEvent(`${player.name} сбрасывает карту: ${discarded.name}.`);
    } else {
      logEvent(`${player.name} избегает потерь: рука пуста.`);
    }
  }
  saveState();
  renderAll();
};

const startCombat = (monster) => {
  state.combat = {
    monster,
    tempBonus: 0,
    helper: null,
    usedOneShots: []
  };
  renderCombat();
  showModal(els.combatModal);
};

const playerStrength = () => {
  const player = currentPlayer();
  const helperBonus = state.combat?.helper !== null ? 2 : 0;
  return player.level + player.gearBonus + state.combat.tempBonus + helperBonus;
};

const renderCombat = () => {
  const player = currentPlayer();
  const combat = state.combat;
  if (!combat) return;

  const helperName = combat.helper !== null ? state.players[combat.helper].name : "нет";
  const strength = playerStrength();

  const oneShots = player.hand.filter((card) => card.type === "OneShot");
  const options = oneShots
    .map((card, index) => `<option value="${index}">${card.name} (+${card.bonus})</option>`)
    .join("");

  els.combatBody.innerHTML = `
    <div class="list-card">
      <h3>${combat.monster.name}</h3>
      <p>Сила монстра: <strong>${combat.monster.power}</strong></p>
      <p>Награда: +${combat.monster.rewardLevels} уровень, ${combat.monster.rewardTreasures} сокровищ(а)</p>
      <p>Плохой эффект: ${combat.monster.badStuff}</p>
    </div>
    <p>Сила игрока: <strong>${strength}</strong></p>
    <p>Помощник: ${helperName}</p>
    <div class="list-actions">
      <select id="oneShotSelect" ${oneShots.length === 0 ? "disabled" : ""}>
        <option value="">One-shot из руки</option>
        ${options}
      </select>
      <button id="addOneShotBtn" class="secondary">Добавить one-shot</button>
      <button id="helpBtn" class="secondary">Попросить помощь</button>
      <button id="runBtn" class="secondary">Сбежать</button>
      <button id="winBtn" class="primary" ${strength >= combat.monster.power ? "" : "disabled"}>Победить/Завершить бой</button>
    </div>
  `;

  const addOneShotBtn = document.getElementById("addOneShotBtn");
  const oneShotSelect = document.getElementById("oneShotSelect");
  addOneShotBtn.addEventListener("click", () => {
    if (!oneShotSelect.value) return;
    const index = Number(oneShotSelect.value);
    const card = oneShots[index];
    const cardIndex = player.hand.findIndex((item) => item.id === card.id);
    if (cardIndex === -1) return;
    player.hand.splice(cardIndex, 1);
    combat.tempBonus += card.bonus;
    combat.usedOneShots.push(card);
    logEvent(`${player.name} использует one-shot: ${card.name} (+${card.bonus}).`);
    saveState();
    renderCombat();
  });

  document.getElementById("helpBtn").addEventListener("click", () => {
    const helpers = state.players
      .map((p, idx) => ({ name: p.name, idx }))
      .filter((p) => p.idx !== state.currentPlayer);

    const pick = prompt(
      `Выберите помощника: ${helpers.map((h) => `${h.idx + 1} - ${h.name}`).join(", ")}`
    );
    const pickIndex = Number(pick) - 1;
    const helper = helpers.find((h) => h.idx === pickIndex);
    if (!helper) return;
    combat.helper = helper.idx;
    logEvent(`${player.name} получает помощь от ${helper.name} (+2).`);
    saveState();
    renderCombat();
  });

  document.getElementById("runBtn").addEventListener("click", () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll >= 5) {
      logEvent(`${player.name} сбегает (бросок ${roll}).`);
      state.combat = null;
      closeModal();
      renderEvent(`<h2>Событие</h2><p>${player.name} успешно сбежал.</p>`);
    } else {
      logEvent(`${player.name} не смог сбежать (бросок ${roll}).`);
      applyBadStuff(player, combat.monster);
      state.combat = null;
      closeModal();
    }
    saveState();
    renderAll();
  });

  document.getElementById("winBtn").addEventListener("click", () => {
    if (playerStrength() < combat.monster.power) return;
    player.level += combat.monster.rewardLevels;
    const treasures = [];
    for (let i = 0; i < combat.monster.rewardTreasures; i += 1) {
      treasures.push(drawTreasure());
    }
    player.hand.push(...treasures);
    logEvent(`${player.name} побеждает ${combat.monster.name} и получает +${combat.monster.rewardLevels} уровень.`);
    if (treasures.length > 0) {
      logEvent(`${player.name} получает сокровища: ${treasures.map((t) => t.name).join(", ")}.`);
    }
    state.combat = null;
    closeModal();
    renderEvent(`<h2>Событие</h2><p>${player.name} победил ${combat.monster.name}!</p>`);
    saveState();
    renderAll();
  });
};

const applyBadStuff = (player, monster) => {
  if (monster.badStuff.includes("2 уровня")) {
    player.level = Math.max(1, player.level - 2);
    logEvent(`${player.name} теряет 2 уровня.`);
    return;
  }
  if (monster.badStuff.includes("1 уровень")) {
    player.level = Math.max(1, player.level - 1);
    logEvent(`${player.name} теряет 1 уровень.`);
    return;
  }
  if (monster.badStuff.includes("2 карты") && player.hand.length > 0) {
    player.hand.splice(0, Math.min(2, player.hand.length));
    logEvent(`${player.name} сбрасывает 2 карты.`);
    return;
  }
  if (monster.badStuff.includes("1 карту") && player.hand.length > 0) {
    player.hand.splice(0, 1);
    logEvent(`${player.name} сбрасывает 1 карту.`);
    return;
  }
  if (monster.badStuff.includes("предмет")) {
    if (player.equipped.length > 0) {
      const idx = Math.floor(Math.random() * player.equipped.length);
      const [lost] = player.equipped.splice(idx, 1);
      player.gearBonus -= lost.bonus;
      logEvent(`${player.name} теряет предмет: ${lost.name}.`);
    } else {
      logEvent(`${player.name} избегает потерь: нет экипировки.`);
    }
  }
};

const renderHand = () => {
  const player = currentPlayer();
  if (!player) return;
  if (player.hand.length === 0) {
    els.handBody.innerHTML = "<p>Рука пуста.</p>";
    return;
  }
  els.handBody.innerHTML = player.hand
    .map((card) => {
      const isItem = card.type === "Item";
      const isOneShot = card.type === "OneShot";
      const canEquip = isItem;
      const canPlay = isOneShot && state.combat;
      return `
        <div class="list-card">
          <h3>${card.name} <span class="badge">${card.type}</span></h3>
          <p>${isItem ? `Бонус: +${card.bonus}` : `Временный бонус: +${card.bonus}`}</p>
          <div class="list-actions">
            ${canEquip ? `<button class="secondary" data-action="equip" data-id="${card.id}">Экипировать</button>` : ""}
            ${canPlay ? `<button class="secondary" data-action="play" data-id="${card.id}">Сыграть one-shot</button>` : ""}
            <button class="secondary" data-action="discard" data-id="${card.id}">Сбросить</button>
          </div>
        </div>
      `;
    })
    .join("");
};

const renderEquip = () => {
  const player = currentPlayer();
  if (!player) return;
  if (player.equipped.length === 0) {
    els.equipBody.innerHTML = "<p>Экипировка пуста.</p>";
    return;
  }
  els.equipBody.innerHTML = player.equipped
    .map((card) => {
      return `
        <div class="list-card">
          <h3>${card.name}</h3>
          <p>Бонус: +${card.bonus}</p>
          <div class="list-actions">
            <button class="secondary" data-action="unequip" data-id="${card.id}">Снять</button>
          </div>
        </div>
      `;
    })
    .join("");
};

const renderLog = () => {
  if (state.log.length === 0) {
    els.logBody.innerHTML = "<p>Лог пуст.</p>";
    return;
  }
  els.logBody.innerHTML = `
    <ul>
      ${state.log.map((entry) => `<li>${entry}</li>`).join("")}
    </ul>
  `;
};

const renderAll = () => {
  if (state.players.length === 0) {
    els.startScreen.classList.remove("hidden");
    els.gameScreen.classList.add("hidden");
    return;
  }
  els.startScreen.classList.add("hidden");
  els.gameScreen.classList.remove("hidden");
  renderPlayers();
  renderHand();
  renderEquip();
  renderLog();
};

const openDoor = () => {
  const player = currentPlayer();
  const card = drawDoor();
  state.currentEvent = card;
  if (card.type === "Monster") {
    renderEvent(`
      <h2>${card.name}</h2>
      <p>Монстр! Сила: ${card.power}</p>
      <p>Нажмите «Бой» в появившемся окне.</p>
    `);
    logEvent(`${player.name} открывает дверь и встречает монстра: ${card.name}.`);
    startCombat(card);
  } else {
    renderEvent(`
      <h2>${card.name}</h2>
      <p>${card.effect}</p>
    `);
    logEvent(`${player.name} открывает дверь и получает проклятие: ${card.name}.`);
    applyCurse(card);
  }
  saveState();
  renderAll();
};

const endTurn = () => {
  state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
  state.currentEvent = null;
  state.combat = null;
  renderEvent(`<h2>Событие</h2><p>Ход переходит к ${currentPlayer().name}.</p>`);
  logEvent(`Ход переходит к ${currentPlayer().name}.`);
  saveState();
  renderAll();
};

const startGame = () => {
  const names = Array.from(els.startInputs)
    .map((input) => input.value.trim())
    .filter(Boolean);

  if (names.length < 2 || names.length > 4) {
    alert("Введите имена 2–4 игроков.");
    return;
  }

  resetState();
  state.players = names.map((name) => ({
    name,
    level: 1,
    gearBonus: 0,
    hand: [],
    equipped: []
  }));
  state.doorDeck = shuffle(baseDoors);
  state.treasureDeck = shuffle(baseTreasures);
  logEvent("Новая игра началась.");
  renderEvent(`<h2>Событие</h2><p>Ход начинает ${currentPlayer().name}.</p>`);
  saveState();
  renderAll();
};

els.startGameBtn.addEventListener("click", startGame);

els.newGameBtn.addEventListener("click", () => {
  if (!confirm("Начать новую игру? Текущее сохранение будет перезаписано.")) return;
  resetState();
  els.startInputs.forEach((input) => {
    input.value = "";
  });
  saveState();
  renderAll();
});

els.resetSaveBtn.addEventListener("click", () => {
  if (!confirm("Сбросить сохранение?")) return;
  localStorage.removeItem(STORAGE_KEY);
  resetState();
  els.startInputs.forEach((input) => {
    input.value = "";
  });
  renderEvent(`<h2>Событие</h2><p>Сохранение сброшено.</p>`);
  renderAll();
});

els.openDoorBtn.addEventListener("click", () => {
  if (!currentPlayer()) return;
  if (state.combat) {
    alert("Сначала завершите бой.");
    return;
  }
  openDoor();
});

els.endTurnBtn.addEventListener("click", () => {
  if (state.combat) {
    alert("Нельзя закончить ход во время боя.");
    return;
  }
  endTurn();
});

els.handBtn.addEventListener("click", () => {
  renderHand();
  showModal(els.handModal);
});

els.equipBtn.addEventListener("click", () => {
  renderEquip();
  showModal(els.equipModal);
});

els.logBtn.addEventListener("click", () => {
  renderLog();
  showModal(els.logModal);
});

els.handBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;
  const cardId = button.dataset.id;
  const player = currentPlayer();
  const index = player.hand.findIndex((card) => card.id === cardId);
  if (index === -1) return;
  const card = player.hand[index];

  if (action === "equip" && card.type === "Item") {
    player.hand.splice(index, 1);
    player.equipped.push(card);
    player.gearBonus += card.bonus;
    logEvent(`${player.name} экипирует ${card.name}.`);
  }

  if (action === "play" && card.type === "OneShot" && state.combat) {
    player.hand.splice(index, 1);
    state.combat.tempBonus += card.bonus;
    logEvent(`${player.name} играет one-shot: ${card.name} (+${card.bonus}).`);
    renderCombat();
  }

  if (action === "discard") {
    player.hand.splice(index, 1);
    logEvent(`${player.name} сбрасывает карту: ${card.name}.`);
  }

  saveState();
  renderHand();
  renderPlayers();
});

els.equipBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const cardId = button.dataset.id;
  const player = currentPlayer();
  const index = player.equipped.findIndex((card) => card.id === cardId);
  if (index === -1) return;
  const [card] = player.equipped.splice(index, 1);
  player.gearBonus -= card.bonus;
  player.hand.push(card);
  logEvent(`${player.name} снимает ${card.name} и кладет в руку.`);
  saveState();
  renderEquip();
  renderPlayers();
});

els.modalOverlay.addEventListener("click", closeModal);

document.querySelectorAll("button[data-close]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

if (loadState()) {
  renderAll();
  if (state.players.length > 0) {
    renderEvent(`<h2>Событие</h2><p>Сохранение загружено. Ход игрока: ${currentPlayer().name}.</p>`);
  }
} else {
  renderAll();
}
