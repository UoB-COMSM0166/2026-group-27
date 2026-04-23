// ==================== Scene Constants ====================
const SCENE_MAIN_MENU = "main_menu";
const SCENE_LEVEL_SELECT = "level_select";
const SCENE_CHARACTER_SELECT = "character_select";
const SCENE_CODEX = "codex";
const SCENE_GUIDE = "guide";
const SCENE_LEVEL_LAUNCH = "level_launch";

// ==================== Routes ====================
const pageRoutes = {
  level1: "level1.html",
  level2: "level2.html",
  level3: "level3.html"
};

// ==================== Storage Keys ====================
const CHARACTER_KEY = "selectedCharacterId";
const ITEM_CODEX_KEY = "itemCodex";

// ==================== Global Variables ====================
let currentScene = SCENE_MAIN_MENU;
let currentButtons = [];
let hoveredButtonIndex = -1;
let uiTime = 0;
let flashText = "";
let flashTimer = 0;
let flashGood = true;
let selectedLevel = 1;
let selectedCharacterId = "fox";
let audioCtx = null;

// ==================== Image Assets ====================
let bgImg;
let mapUIImg;
let timeUIImg;

let fernandoImg;
let elizaImg;
let foxImg;

let codexImgs = {};

// ==================== Character Data ====================
const characterOptions = [
  {
    id: "fernando",
    name: "Fernando",
    desc: "A brave racer lost inside the underground maze.",
    imgKey: "fernando"
  },
  {
    id: "eliza",
    name: "Eliza",
    desc: "A calm explorer with sharp instincts.",
    imgKey: "eliza"
  },
  {
    id: "fox",
    name: "Fox",
    desc: "A quick little fox with mysterious luck.",
    imgKey: "fox"
  }
];

// ==================== Codex Data ====================
const codexData = [
  { id: "crossbow", name: "Crossbow", img: "assets/crossbow.png", desc: "A ranged weapon found in Level 1." },
  { id: "light", name: "Light", img: "assets/light.png", desc: "Clears fog and enables auto-lock." },
  { id: "ring", name: "Magic Ring", img: "assets/ring.png", desc: "A magical weapon collected in Level 2." },
  { id: "lock", name: "Lock", img: "assets/lock.png", desc: "Part of the sealing tool." },
  { id: "key", name: "Key", img: "assets/key.png", desc: "Completes the boss seal." }
];

// ==================== Level Data ====================
const levelData = [
  {
    level: 1,
    title: "Level 1 - Maze Escape",
    subtitle: "Find the map, crossbow, and escape.",
    goals: [
      "Open the chest to unlock the mini map.",
      "Find the crossbow.",
      "Reach the exit portal before time runs out."
    ]
  },
  {
    level: 2,
    title: "Level 2 - Fog and Ring",
    subtitle: "Search through fog and reach the portal.",
    goals: [
      "Find the map first.",
      "Find the light to clear your vision.",
      "Find the magic ring.",
      "Reach the exit portal."
    ]
  },
  {
    level: 3,
    title: "Level 3 - Seal the Boss",
    subtitle: "Survive portals and seal the boss.",
    goals: [
      "Find the map, light, lock and key.",
      "Use portals carefully.",
      "Weaken the boss.",
      "Switch to Seal and finish the boss."
    ]
  }
];

// ==================== Preload ====================
function preload() {
  mapUIImg = loadImage("assets/map.png");
  timeUIImg = loadImage("assets/time.png");

  fernandoImg = loadImage("assets/characters/Fernando/F-front1.png");
  elizaImg = loadImage("assets/characters/Eliza/E-front1.png");
  foxImg = loadImage("assets/characters/Fox/fox_front.png");

  for (let item of codexData) {
    codexImgs[item.id] = loadImage(item.img);
  }
}

// ==================== p5 Entry ====================
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");

  initStorage();
  loadPersistentState();
}

function draw() {
  uiTime += 0.03;
  if (flashTimer > 0) flashTimer--;

  drawBackground();

  currentButtons = [];
  hoveredButtonIndex = -1;

  if (currentScene === SCENE_MAIN_MENU) drawMainMenu();
  else if (currentScene === SCENE_LEVEL_SELECT) drawLevelSelect();
  else if (currentScene === SCENE_CHARACTER_SELECT) drawCharacterSelect();
  else if (currentScene === SCENE_CODEX) drawCodexScene();
  else if (currentScene === SCENE_GUIDE) drawGuideScene();
  else if (currentScene === SCENE_LEVEL_LAUNCH) drawLevelLaunchScene();

  drawTopBar();
  drawFlashMessage();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ==================== Storage ====================
function initStorage() {
  if (localStorage.getItem(CHARACTER_KEY) === null) {
    localStorage.setItem(CHARACTER_KEY, "fox");
  }

  if (localStorage.getItem(ITEM_CODEX_KEY) === null) {
    localStorage.setItem(ITEM_CODEX_KEY, JSON.stringify([]));
  }
}

function loadPersistentState() {
  selectedCharacterId = localStorage.getItem(CHARACTER_KEY) || "fox";

  if (!characterOptions.some(c => c.id === selectedCharacterId)) {
    selectedCharacterId = "fox";
    localStorage.setItem(CHARACTER_KEY, selectedCharacterId);
  }
}

function saveCharacter(id) {
  selectedCharacterId = id;
  localStorage.setItem(CHARACTER_KEY, id);
}

function getCodexItems() {
  try {
    const raw = localStorage.getItem(ITEM_CODEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function hasCodexItem(id) {
  return getCodexItems().includes(id);
}

// ==================== Layout Helpers ====================
function getScale() {
  return constrain(min(width / 1360, height / 820), 0.76, 1.15);
}

function px(v) {
  return v * getScale();
}

function pageContentRect() {
  return {
    x: px(22),
    y: px(110),
    w: width - px(44),
    h: height - px(130)
  };
}

// ==================== Background ====================
function drawBackground() {
  background(10, 10, 12);

  let tile = px(54);

  for (let y = 0; y < height + tile; y += tile) {
    for (let x = 0; x < width + tile; x += tile) {
      let seed = abs(floor(x) * 17 + floor(y) * 23) % 40;

      if (seed < 22) fill(30, 32, 38);
      else if (seed < 33) fill(24, 26, 32);
      else fill(38, 38, 44);

      stroke(8, 8, 10);
      strokeWeight(1);
      rect(x, y, tile, tile);

      noStroke();
      fill(255, 255, 255, 8);
      rect(x + 2, y + 2, tile - 4, 4);
    }
  }

  noStroke();
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);

  fill(160, 90, 30, 18);
  circle(width * 0.18, height * 0.2, min(width, height) * 0.35);

  fill(120, 70, 170, 16);
  circle(width * 0.82, height * 0.2, min(width, height) * 0.38);
}

// ==================== Top Bar ====================
function drawTopBar() {
  drawGoldenPanel(px(18), px(14), width - px(36), px(82));

  fill(240, 215, 150);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(px(31));
  text("LOST IN BRISTOL", px(42), px(46));

  textStyle(NORMAL);
  textSize(px(13));
  fill(210, 190, 145);
  text("Underground Explorer Hub", px(44), px(74));

  fill(240, 215, 150);
  textAlign(RIGHT, CENTER);
  textSize(px(15));
  text(`Character: ${getSelectedCharacter().name}`, width - px(40), px(45));

  fill(210, 190, 145);
  textSize(px(12));
  text(`Codex: ${getCodexItems().length}/${codexData.length}`, width - px(40), px(70));
}

// ==================== Main Menu ====================
function drawMainMenu() {
  const area = pageContentRect();
  const gap = px(28);
  const leftW = area.w * 0.42;
  const rightW = area.w - leftW - gap;

  drawGoldenPanel(area.x, area.y, leftW, area.h);
  drawGoldenPanel(area.x + leftW + gap, area.y, rightW, area.h);

  fill(245, 220, 160);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(42));
  text("MAIN MENU", area.x + px(34), area.y + px(36));

  textStyle(NORMAL);
  textSize(px(18));
  fill(220, 200, 160);
  text("Choose your path through the maze.", area.x + px(36), area.y + px(104));

  drawCharacterPortrait(getSelectedCharacter(), area.x + px(62), area.y + px(210), px(130), true);

  fill(245, 220, 160);
  textSize(px(22));
  textStyle(BOLD);
  text(getSelectedCharacter().name, area.x + px(230), area.y + px(255));

  textStyle(NORMAL);
  textSize(px(15));
  fill(220, 205, 170);
  textBox(
    getSelectedCharacter().desc,
    area.x + px(230),
    area.y + px(295),
    leftW - px(270),
    px(80)
  );

  fill(230, 210, 160);
  textSize(px(14));
  text(`Unlocked items: ${getCodexItems().length}/${codexData.length}`, area.x + px(230), area.y + px(400));

  const bx = area.x + leftW + gap + px(42);
  const bw = rightW - px(84);
  const bh = px(60);
  const by = area.y + px(60);
  const rowGap = px(20);

  addMenuButton(bx, by + 0 * (bh + rowGap), bw, bh, "Start Adventure", () => {
    changeScene(SCENE_LEVEL_SELECT);
  });

  addMenuButton(bx, by + 1 * (bh + rowGap), bw, bh, "Choose Character", () => {
    changeScene(SCENE_CHARACTER_SELECT);
  });

  addMenuButton(bx, by + 2 * (bh + rowGap), bw, bh, "Item Codex", () => {
    changeScene(SCENE_CODEX);
  });

  addMenuButton(bx, by + 3 * (bh + rowGap), bw, bh, "Game Guide", () => {
    changeScene(SCENE_GUIDE);
  });

  addMenuButton(bx, by + 4 * (bh + rowGap), bw, bh, "Reload Save", () => {
    loadPersistentState();
    showFlash("Saved data reloaded", true);
  });

  fill(210, 190, 145);
  textAlign(LEFT, TOP);
  textSize(px(14));
  text(
    "Recommended order:\n1. Choose Character\n2. Start Adventure\n3. Check Item Codex after collecting items",
    bx,
    area.y + area.h - px(112)
  );
}

// ==================== Level Select ====================
function drawLevelSelect() {
  const area = pageContentRect();
  drawGoldenPanel(area.x, area.y, area.w, area.h);

  fill(245, 220, 160);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text("LEVEL SELECT", area.x + px(36), area.y + px(34));

  textStyle(NORMAL);
  textSize(px(17));
  fill(220, 200, 160);
  text("Pick a stage to launch.", area.x + px(38), area.y + px(96));

  const cardGap = px(22);
  const innerX = area.x + px(34);
  const innerY = area.y + px(150);
  const innerW = area.w - px(68);
  const cardW = (innerW - cardGap * 2) / 3;
  const cardH = min(px(410), area.h - px(225));

  for (let i = 0; i < levelData.length; i++) {
    const x = innerX + i * (cardW + cardGap);
    drawLevelCard(levelData[i], x, innerY, cardW, cardH);
  }

  addMenuButton(area.x + px(36), area.y + area.h - px(58), px(220), px(42), "Back", () => {
    changeScene(SCENE_MAIN_MENU);
  });
}

function drawLevelCard(levelInfo, x, y, w, h) {
  const hovering = mouseOverRect(x, y, w, h);
  const lift = hovering ? -px(4) : 0;

  push();
  translate(0, lift);

  drawParchmentPanel(x, y, w, h);

  fill(80, 45, 20);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(22));
  textBox(levelInfo.title, x + px(22), y + px(22), w - px(44), px(56));

  textStyle(NORMAL);
  textSize(px(14));
  fill(90, 60, 35);
  textBox(levelInfo.subtitle, x + px(22), y + px(86), w - px(44), px(42));

  drawLevelPreview(levelInfo.level, x + px(22), y + px(138), w - px(44), px(118));

  fill(80, 45, 20);
  textSize(px(15));
  textStyle(BOLD);
  text("Main Goals:", x + px(22), y + px(280));

  fill(80, 55, 35);
  textStyle(NORMAL);
  textSize(px(13));

  let yy = y + px(314);
  for (let goal of levelInfo.goals) {
    textBox("• " + goal, x + px(22), yy, w - px(44), px(24));
    yy += px(25);
  }

  addMenuButton(x + px(22), y + h - px(48), w - px(44), px(34), "Launch Level " + levelInfo.level, () => {
    selectedLevel = levelInfo.level;
    changeScene(SCENE_LEVEL_LAUNCH);
  });

  pop();
}

function drawLevelPreview(levelNumber, x, y, w, h) {
  push();
  noStroke();

  fill(35, 35, 38);
  rect(x, y, w, h, px(10));

  for (let i = 0; i < 12; i++) {
    fill(i % 2 === 0 ? 65 : 45);
    rect(x + px(12 + i * 22), y + px(12), px(14), h - px(24));
  }

  if (levelNumber === 1) {
    fill(230, 200, 80);
    rect(x + px(45), y + px(42), px(18), px(18), px(4));
    fill(120, 220, 255);
    rect(x + px(105), y + px(64), px(20), px(15), px(4));
    fill(255, 210, 80);
    circle(x + w - px(42), y + h - px(32), px(24));
  } else if (levelNumber === 2) {
    fill(255, 230, 120, 90);
    circle(x + w / 2, y + h / 2, px(85));
    fill(120, 220, 255);
    circle(x + px(84), y + px(46), px(16));
    fill(180, 120, 255);
    circle(x + w - px(55), y + px(72), px(18));
  } else {
    fill(150, 80, 255);
    circle(x + px(60), y + px(44), px(20));
    circle(x + w - px(80), y + px(76), px(20));
    fill(120, 0, 120);
    circle(x + w - px(48), y + h - px(38), px(34));
    fill(255, 220, 100);
    rect(x + px(110), y + px(40), px(18), px(18), px(4));
  }

  pop();
}

// ==================== Character Select ====================
function drawCharacterSelect() {
  const area = pageContentRect();
  drawGoldenPanel(area.x, area.y, area.w, area.h);

  fill(245, 220, 160);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text("CHARACTER SELECT", area.x + px(36), area.y + px(34));

  textStyle(NORMAL);
  textSize(px(17));
  fill(220, 200, 160);
  text("Choose your explorer. This choice is saved for all levels.", area.x + px(38), area.y + px(96));

  const cardGap = px(22);
  const innerX = area.x + px(34);
  const innerY = area.y + px(150);
  const innerW = area.w - px(68);
  const cardW = (innerW - cardGap * 2) / 3;
  const cardH = min(px(390), area.h - px(225));

  for (let i = 0; i < characterOptions.length; i++) {
    const x = innerX + i * (cardW + cardGap);
    drawCharacterCard(characterOptions[i], x, innerY, cardW, cardH);
  }

  addMenuButton(area.x + px(36), area.y + area.h - px(58), px(220), px(42), "Back", () => {
    changeScene(SCENE_MAIN_MENU);
  });
}

function drawCharacterCard(charData, x, y, w, h) {
  const selected = selectedCharacterId === charData.id;

  drawParchmentPanel(x, y, w, h);

  if (selected) {
    noFill();
    stroke(170, 100, 35);
    strokeWeight(4);
    rect(x + px(5), y + px(5), w - px(10), h - px(10), px(12));
  }

  drawCharacterPortrait(charData, x + w / 2 - px(58), y + px(30), px(116), false);

  fill(80, 45, 20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(px(24));
  text(charData.name, x + w / 2, y + px(172));

  textStyle(NORMAL);
  textSize(px(14));
  fill(90, 60, 35);
  textBox(charData.desc, x + px(24), y + px(220), w - px(48), px(70));

  addMenuButton(x + px(24), y + h - px(48), w - px(48), px(36), selected ? "Selected" : "Select", () => {
    saveCharacter(charData.id);
    showFlash(`${charData.name} selected`, true);
    playEquipTone();
  }, !selected);
}

// ==================== Codex ====================
function drawCodexScene() {
  const area = pageContentRect();
  drawGoldenPanel(area.x, area.y, area.w, area.h);

  fill(245, 220, 160);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text("ITEM CODEX", area.x + px(36), area.y + px(34));

  textStyle(NORMAL);
  textSize(px(17));
  fill(220, 200, 160);
  text("Collected items are saved here. Locked items stay hidden.", area.x + px(38), area.y + px(96));

  const startX = area.x + px(42);
  const startY = area.y + px(160);
  const cardW = px(210);
  const cardH = px(230);
  const gap = px(24);

  for (let i = 0; i < codexData.length; i++) {
    let item = codexData[i];
    let col = i % 5;
    let row = floor(i / 5);
    let x = startX + col * (cardW + gap);
    let y = startY + row * (cardH + gap);
    drawCodexCard(item, x, y, cardW, cardH);
  }

  addMenuButton(area.x + px(36), area.y + area.h - px(58), px(220), px(42), "Back", () => {
    changeScene(SCENE_MAIN_MENU);
  });
}

function drawCodexCard(item, x, y, w, h) {
  const unlocked = hasCodexItem(item.id);

  drawParchmentPanel(x, y, w, h);

  push();
  imageMode(CENTER);

  let img = codexImgs[item.id];

  if (img) {
    if (!unlocked) tint(50, 50, 50, 190);
    image(img, x + w / 2, y + px(72), px(64), px(64));
    noTint();
  }

  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(px(18));
  fill(80, 45, 20);
  text(unlocked ? item.name : "???", x + w / 2, y + px(122));

  textStyle(NORMAL);
  textSize(px(12));
  fill(90, 60, 35);
  textBox(
    unlocked ? item.desc : "Not discovered yet.",
    x + px(18),
    y + px(158),
    w - px(36),
    px(52)
  );

  pop();
}

// ==================== Guide ====================
function drawGuideScene() {
  const area = pageContentRect();
  drawGoldenPanel(area.x, area.y, area.w, area.h);

  fill(245, 220, 160);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text("GAME GUIDE", area.x + px(36), area.y + px(34));

  textStyle(NORMAL);
  textSize(px(16));
  fill(220, 200, 160);

  let lines = [
    "Level 1: Find the map, collect the crossbow, and escape through the portal.",
    "Level 2: Start with the crossbow, find the light and magic ring, then reach the exit portal.",
    "Level 3: Find the light, lock, and key. Weaken the boss, switch to Seal, and finish it.",
    "Controls: Arrow Keys / WASD to move. M toggles mini map. P pauses. SPACE attacks in combat levels. SHIFT switches weapons."
  ];

  let y = area.y + px(145);
  for (let line of lines) {
    drawParchmentPanel(area.x + px(40), y, area.w - px(80), px(78));
    fill(75, 45, 25);
    textStyle(NORMAL);
    textSize(px(15));
    textBox(line, area.x + px(62), y + px(22), area.w - px(124), px(40));
    y += px(96);
  }

  addMenuButton(area.x + px(36), area.y + area.h - px(58), px(220), px(42), "Back", () => {
    changeScene(SCENE_MAIN_MENU);
  });
}

// ==================== Level Launch ====================
function drawLevelLaunchScene() {
  const area = pageContentRect();
  const lv = levelData[selectedLevel - 1];

  drawGoldenPanel(area.x, area.y, area.w, area.h);

  fill(245, 220, 160);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text(lv.title, area.x + px(42), area.y + px(42));

  textStyle(NORMAL);
  textSize(px(16));
  fill(220, 200, 160);
  text(lv.subtitle, area.x + px(44), area.y + px(100));

  drawParchmentPanel(area.x + px(42), area.y + px(150), area.w * 0.34, area.h - px(235));
  drawParchmentPanel(area.x + area.w * 0.39, area.y + px(150), area.w * 0.55, area.h - px(235));

  const hero = getSelectedCharacter();

  fill(80, 45, 20);
  textStyle(BOLD);
  textSize(px(24));
  text("Loadout", area.x + px(66), area.y + px(176));

  drawCharacterPortrait(hero, area.x + px(82), area.y + px(230), px(110), false);

  fill(90, 60, 35);
  textStyle(NORMAL);
  textSize(px(15));
  text(`Character: ${hero.name}`, area.x + px(220), area.y + px(250));
  text(`Codex: ${getCodexItems().length}/${codexData.length}`, area.x + px(220), area.y + px(286));

  fill(80, 45, 20);
  textStyle(BOLD);
  textSize(px(24));
  text("Mission Goals", area.x + area.w * 0.39 + px(24), area.y + px(176));

  fill(90, 60, 35);
  textStyle(NORMAL);
  textSize(px(15));

  let yy = area.y + px(230);
  for (let goal of lv.goals) {
    textBox("• " + goal, area.x + area.w * 0.39 + px(24), yy, area.w * 0.5, px(34));
    yy += px(42);
  }

  addMenuButton(area.x + px(42), area.y + area.h - px(58), px(200), px(42), "Back", () => {
    changeScene(SCENE_LEVEL_SELECT);
  });

  addMenuButton(area.x + px(270), area.y + area.h - px(58), px(230), px(42), "Start Level " + selectedLevel, () => {
    launchLevel(selectedLevel);
  });
}

function launchLevel(levelNumber) {
  if (levelNumber === 1) window.location.href = pageRoutes.level1;
  if (levelNumber === 2) window.location.href = pageRoutes.level2;
  if (levelNumber === 3) window.location.href = pageRoutes.level3;
}

// ==================== Drawing Helpers ====================
function drawGoldenPanel(x, y, w, h) {
  noStroke();
  fill(22, 18, 14, 235);
  rect(x, y, w, h, px(14));

  stroke(160, 105, 35);
  strokeWeight(px(3));
  noFill();
  rect(x + px(4), y + px(4), w - px(8), h - px(8), px(12));

  stroke(235, 190, 90);
  strokeWeight(px(1));
  rect(x + px(10), y + px(10), w - px(20), h - px(20), px(8));

  noStroke();
  fill(255, 230, 150, 12);
  rect(x + px(12), y + px(12), w - px(24), px(22), px(8));
}

function drawParchmentPanel(x, y, w, h) {
  noStroke();
  fill(230, 210, 160);
  rect(x, y, w, h, px(12));

  stroke(80, 45, 20, 170);
  strokeWeight(px(2));
  noFill();
  rect(x + px(5), y + px(5), w - px(10), h - px(10), px(9));

  noStroke();
  fill(255, 245, 200, 70);
  rect(x + px(8), y + px(8), w - px(16), px(16), px(8));
}

function drawCharacterPortrait(charData, x, y, size, highlight) {
  push();

  let img = null;
  if (charData.id === "fernando") img = fernandoImg;
  if (charData.id === "eliza") img = elizaImg;
  if (charData.id === "fox") img = foxImg;

  noStroke();
  fill(0, 0, 0, 60);
  ellipse(x + size / 2, y + size + px(10), size * 0.55, px(16));

  if (highlight) {
    fill(255, 220, 120, 24 + sin(uiTime * 2) * 8);
    circle(x + size / 2, y + size / 2, size * 1.4);
  }

  imageMode(CENTER);

  if (img) {
    let drawW = size;
    let drawH = size;

    if (charData.id === "fox") {
      drawW = size * 1.15;
      drawH = size * 0.9;
    }

    image(img, x + size / 2, y + size / 2, drawW, drawH);
  } else {
    fill(200, 120, 80);
    ellipse(x + size / 2, y + size / 2, size * 0.6, size * 0.9);
  }

  imageMode(CORNER);
  pop();
}

function addMenuButton(x, y, w, h, label, action, enabled = true) {
  const hovered = mouseOverRect(x, y, w, h);

  currentButtons.push({ x, y, w, h, label, action, enabled });

  drawButton(x, y, w, h, label, enabled, hovered);
}

function drawButton(x, y, w, h, label, enabled, hovered) {
  noStroke();

  if (enabled) {
    if (hovered) fill(170, 95, 35);
    else fill(120, 65, 28);
  } else {
    fill(80, 70, 60);
  }

  rect(x, y, w, h, px(10));

  stroke(240, 200, 110, enabled ? 210 : 80);
  strokeWeight(px(2));
  noFill();
  rect(x + px(3), y + px(3), w - px(6), h - px(6), px(8));

  noStroke();
  fill(245, 220, 160);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(px(15));
  text(label, x + w / 2, y + h / 2);
}

function textBox(str, x, y, w, h) {
  text(str, x, y, w, h);
}

// ==================== Scene / Flash / Input ====================
function changeScene(sceneName) {
  currentScene = sceneName;
  playHoverTone();
}

function showFlash(msg, good) {
  flashText = msg;
  flashGood = good;
  flashTimer = 60;
}

function drawFlashMessage() {
  if (flashTimer <= 0) return;

  let alpha = map(flashTimer, 0, 60, 0, 230);

  noStroke();
  fill(flashGood ? color(65, 120, 60, alpha) : color(160, 60, 50, alpha));
  rect(width / 2 - px(190), px(102), px(380), px(42), px(10));

  fill(255, alpha);
  textAlign(CENTER, CENTER);
  textSize(px(16));
  text(flashText, width / 2, px(123));
}

function mousePressed() {
  ensureAudio();

  for (let i = currentButtons.length - 1; i >= 0; i--) {
    const b = currentButtons[i];
    if (!b.enabled) continue;

    if (mouseOverRect(b.x, b.y, b.w, b.h)) {
      b.action();
      return;
    }
  }
}

function keyPressed() {
  ensureAudio();

  if (keyCode === ESCAPE) {
    if (currentScene !== SCENE_MAIN_MENU) {
      changeScene(SCENE_MAIN_MENU);
      return;
    }
  }

  if (currentScene === SCENE_MAIN_MENU) {
    if (key === '1') changeScene(SCENE_LEVEL_SELECT);
    if (key === '2') changeScene(SCENE_CHARACTER_SELECT);
    if (key === '3') changeScene(SCENE_CODEX);
    if (key === '4') changeScene(SCENE_GUIDE);
  }

  if (currentScene === SCENE_CHARACTER_SELECT) {
    if (key === '1') selectCharacterById("fernando");
    if (key === '2') selectCharacterById("eliza");
    if (key === '3') selectCharacterById("fox");
  }

  if (currentScene === SCENE_LEVEL_SELECT) {
    if (key === '1') {
      selectedLevel = 1;
      changeScene(SCENE_LEVEL_LAUNCH);
    }
    if (key === '2') {
      selectedLevel = 2;
      changeScene(SCENE_LEVEL_LAUNCH);
    }
    if (key === '3') {
      selectedLevel = 3;
      changeScene(SCENE_LEVEL_LAUNCH);
    }
  }
}

function selectCharacterById(id) {
  saveCharacter(id);
  showFlash(`${getSelectedCharacter().name} selected`, true);
  playEquipTone();
}

function mouseOverRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function getSelectedCharacter() {
  for (let c of characterOptions) {
    if (c.id === selectedCharacterId) return c;
  }
  return characterOptions[2];
}

// ==================== Audio ====================
function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTone(freq, duration, type = "sine", volume = 0.03) {
  if (!audioCtx) return;

  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  let now = audioCtx.currentTime;
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.start(now);
  osc.stop(now + duration);
}

function playEquipTone() {
  playTone(480, 0.07, "sine", 0.04);
  setTimeout(() => playTone(620, 0.09, "sine", 0.04), 50);
}

function playHoverTone() {
  playTone(360, 0.04, "square", 0.02);
}