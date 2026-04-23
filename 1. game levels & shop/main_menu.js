// ==================== 场景常量 / Scene constants ====================
const SCENE_MAIN_MENU = "main_menu";
const SCENE_LEVEL_SELECT = "level_select";
const SCENE_CHARACTER_SELECT = "character_select";
const SCENE_GUIDE = "guide";
const SCENE_LEVEL_LAUNCH = "level_launch";

// ==================== 路由配置 / Route configuration ====================
// 页面对应的 HTML 文件名
// Put page HTML filenames
const pageRoutes = {
  level1: "level1.html",
  level2: "level2.html",
  level3: "level3.html",
  shop: "shop.html"
};

// ==================== 全局变量 / Global variables ====================
let currentScene = SCENE_MAIN_MENU;
let currentButtons = [];
let hoveredButtonIndex = -1;

let uiTime = 0;
let flashText = "";
let flashTimer = 0;
let flashGood = true;

let selectedLevel = 1;

let coins = 0;
let ownedGunLevel = 1;
let equippedGunLevel = 1;
let selectedCharacterId = 1;

let audioCtx = null;

// ==================== 角色数据 / Character data ====================
// 目前先用颜色区分角色，之后可以替换成画好的角色图片
// Characters are currently color-coded placeholders and can be replaced with real art later
const characterOptions = [
  {
    id: 1,
    name: "Scout Blue",
    body: [70, 150, 255],
    accent: [200, 230, 255],
    desc: "Balanced explorer with a calm style."
  },
  {
    id: 2,
    name: "Blaze Red",
    body: [230, 90, 90],
    accent: [255, 220, 220],
    desc: "Bold adventurer with a strong visual style."
  },
  {
    id: 3,
    name: "Moss Green",
    body: [90, 180, 110],
    accent: [220, 255, 220],
    desc: "Steady traveler with a natural look."
  }
];

// ==================== 武器数据 / Weapon data ====================
// 用于读取当前已装备武器，仅作展示
// Used only to display the currently equipped weapon
const shopItems = [
  {
    level: 1,
    name: "Pistol",
    price: 0,
    damage: 10,
    speed: 340,
    cooldown: 0.22,
    color: [70, 70, 80],
    accent: [180, 180, 190],
    desc: "Balanced starter weapon"
  },
  {
    level: 2,
    name: "Rifle",
    price: 8,
    damage: 14,
    speed: 390,
    cooldown: 0.16,
    color: [40, 90, 150],
    accent: [170, 220, 255],
    desc: "Fast and accurate"
  },
  {
    level: 3,
    name: "Heavy Gun",
    price: 15,
    damage: 20,
    speed: 420,
    cooldown: 0.26,
    color: [140, 90, 35],
    accent: [255, 220, 140],
    desc: "High damage, slower fire"
  }
];

// ==================== 关卡信息 / Level data ====================
const levelData = [
  {
    level: 1,
    title: "Level 1 - Maze Escape",
    subtitle: "Find tools and escape the maze.",
    accent: [70, 130, 220],
    goals: [
      "Open the chest to unlock the mini map.",
      "Find the snorkel and the flipper.",
      "Reach the lake exit before time runs out."
    ]
  },
  {
    level: 2,
    title: "Level 2 - Fog and Creatures",
    subtitle: "Fight through fog and unlock the door.",
    accent: [100, 90, 220],
    goals: [
      "Find the chest to unlock the mini map.",
      "Find the lamp to clear your vision area.",
      "Find the gun and defeat enemies for coins.",
      "Reach the exit door."
    ]
  },
  {
    level: 3,
    title: "Level 3 - Portals and Boss",
    subtitle: "Survive the portal maze and defeat the boss.",
    accent: [160, 80, 220],
    goals: [
      "Find the mini map, lamp and gun.",
      "Use portals carefully to move around the maze.",
      "Recover health by defeating small enemies.",
      "Defeat the boss to open the exit."
    ]
  }
];

// ==================== p5 入口 / p5 entry ====================
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");

  initStorage();
  loadPersistentState();
}

function draw() {
  uiTime += 0.03;
  if (flashTimer > 0) flashTimer--;

  drawBackground();

  currentButtons = [];
  hoveredButtonIndex = -1;

  if (currentScene === SCENE_MAIN_MENU) {
    drawMainMenu();
  } else if (currentScene === SCENE_LEVEL_SELECT) {
    drawLevelSelect();
  } else if (currentScene === SCENE_CHARACTER_SELECT) {
    drawCharacterSelect();
  } else if (currentScene === SCENE_GUIDE) {
    drawGuideScene();
  } else if (currentScene === SCENE_LEVEL_LAUNCH) {
    drawLevelLaunchScene();
  }

  drawTopBar();
  drawFlashMessage();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ==================== 初始化存档 / Initialize storage ====================
function initStorage() {
  if (localStorage.getItem("gameCoins") === null) {
    localStorage.setItem("gameCoins", "0");
  }
  if (localStorage.getItem("ownedGunLevel") === null) {
    localStorage.setItem("ownedGunLevel", "1");
  }
  if (localStorage.getItem("shopGunLevel") === null) {
    localStorage.setItem("shopGunLevel", "1");
  }
  if (localStorage.getItem("selectedCharacterId") === null) {
    localStorage.setItem("selectedCharacterId", "1");
  }
}

function loadPersistentState() {
  coins = Number(localStorage.getItem("gameCoins") || "0");
  ownedGunLevel = Number(localStorage.getItem("ownedGunLevel") || "1");
  equippedGunLevel = Number(localStorage.getItem("shopGunLevel") || "1");
  selectedCharacterId = Number(localStorage.getItem("selectedCharacterId") || "1");

  if (ownedGunLevel < 1) ownedGunLevel = 1;
  if (equippedGunLevel < 1) equippedGunLevel = 1;
  if (equippedGunLevel > ownedGunLevel) equippedGunLevel = ownedGunLevel;
  if (selectedCharacterId < 1 || selectedCharacterId > 3) selectedCharacterId = 1;
}

function savePersistentState() {
  localStorage.setItem("gameCoins", String(coins));
  localStorage.setItem("ownedGunLevel", String(ownedGunLevel));
  localStorage.setItem("shopGunLevel", String(equippedGunLevel));
  localStorage.setItem("selectedCharacterId", String(selectedCharacterId));
}

// ==================== 自适应尺寸工具 / Responsive layout helpers ====================
function getScale() {
  return constrain(min(width / 1360, height / 820), 0.78, 1.15);
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

// ==================== 全局背景 / Global background ====================
function drawBackground() {
  background(14, 18, 28);

  noStroke();
  fill(40, 60, 120, 30);
  circle(width * 0.15, height * 0.18, min(width, height) * 0.34);

  fill(100, 60, 160, 26);
  circle(width * 0.82, height * 0.20, min(width, height) * 0.38);

  fill(30, 120, 90, 22);
  circle(width * 0.75, height * 0.82, min(width, height) * 0.30);

  fill(200, 120, 30, 16);
  circle(width * 0.28, height * 0.78, min(width, height) * 0.24);
}

// ==================== 顶栏 / Top bar ====================
function drawTopBar() {
  const s = getScale();
  drawPanel(px(18), px(14), width - px(36), px(82));

  fill(255);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(px(30));
  text("LOST IN BRISTOL", px(38), px(48));

  textStyle(NORMAL);
  textSize(px(13));
  fill(200);
  text("Main Hub", px(40), px(76));

  fill(255, 220, 120);
  textAlign(RIGHT, CENTER);
  textSize(px(18));
  text(`Coins: £${coins}`, width - px(34), px(42));

  fill(180, 220, 255);
  textSize(px(13));
  text(`Character: ${getSelectedCharacter().name}`, width - px(34), px(68));
}

// ==================== 主菜单 / Main menu ====================
function drawMainMenu() {
  const area = pageContentRect();
  const gap = px(28);
  const leftW = area.w * 0.42;
  const rightW = area.w - leftW - gap;

  drawPanel(area.x, area.y, leftW, area.h);
  drawPanel(area.x + leftW + gap, area.y, rightW, area.h);

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(42));
  text("MAIN MENU", area.x + px(32), area.y + px(36));

  textStyle(NORMAL);
  textSize(px(18));
  fill(210);
  text("Choose where to go next.", area.x + px(34), area.y + px(104));

  drawCharacterPortrait(getSelectedCharacter(), area.x + px(52), area.y + px(250), px(120), true);

  fill(255);
  textSize(px(20));
  textStyle(BOLD);
  text(getSelectedCharacter().name, area.x + px(210), area.y + px(290));

  textStyle(NORMAL);
  textSize(px(15));
  fill(205);
  textBox(
    getSelectedCharacter().desc,
    area.x + px(210),
    area.y + px(324),
    leftW - px(250),
    px(54)
  );

  fill(180, 220, 255);
  text(`Equipped Weapon: ${shopItems[equippedGunLevel - 1].name}`, area.x + px(210), area.y + px(402));

  fill(220);
  text("Tip: Visit the weapon shop before harder levels.", area.x + px(210), area.y + px(442));

  const bx = area.x + leftW + gap + px(42);
  const bw = rightW - px(84);
  const bh = px(58);
  const by = area.y + px(52);
  const rowGap = px(18);

  addMenuButton(bx, by + 0 * (bh + rowGap), bw, bh, "Start Adventure", () => {
    changeScene(SCENE_LEVEL_SELECT);
  }, [60, 110, 220]);

  addMenuButton(bx, by + 1 * (bh + rowGap), bw, bh, "Choose Character", () => {
    changeScene(SCENE_CHARACTER_SELECT);
  }, [50, 150, 100]);

  addMenuButton(bx, by + 2 * (bh + rowGap), bw, bh, "Open Weapon Shop", () => {
    openExternalPage(pageRoutes.shop, "shop page");
  }, [110, 90, 220]);

  addMenuButton(bx, by + 3 * (bh + rowGap), bw, bh, "Game Guide", () => {
    changeScene(SCENE_GUIDE);
  }, [170, 110, 50]);

  addMenuButton(bx, by + 4 * (bh + rowGap), bw, bh, "Refresh Saved Data", () => {
    loadPersistentState();
    showFlash("Saved data reloaded", true);
  }, [80, 90, 110]);

  fill(215);
  textAlign(LEFT, TOP);
  textSize(px(15));
  text(
    "Recommended order:\n1. Choose Character\n2. Open Weapon Shop\n3. Level Select\n4. Play the stages",
    bx,
    area.y + area.h - px(120)
  );
}

// ==================== 关卡选择页 / Level select ====================
function drawLevelSelect() {
  const area = pageContentRect();
  drawPanel(area.x, area.y, area.w, area.h);

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text("LEVEL SELECT", area.x + px(34), area.y + px(34));

  textStyle(NORMAL);
  textSize(px(17));
  fill(210);
  text("Pick a stage to launch.", area.x + px(36), area.y + px(100));

  const cardGap = px(22);
  const innerX = area.x + px(34);
  const innerY = area.y + px(160);
  const innerW = area.w - px(68);
  const cardW = (innerW - cardGap * 2) / 3;
  const cardH = min(px(410), area.h - px(230));

  for (let i = 0; i < levelData.length; i++) {
    const x = innerX + i * (cardW + cardGap);
    drawLevelCard(levelData[i], x, innerY, cardW, cardH);
  }

  addMenuButton(area.x + px(36), area.y + area.h - px(58), px(220), px(42), "Back to Main Menu", () => {
    changeScene(SCENE_MAIN_MENU);
  }, [85, 95, 115]);
}

function drawLevelCard(levelInfo, x, y, w, h) {
  const hovering = mouseOverRect(x, y, w, h);
  const lift = hovering ? -px(4) : 0;

  push();
  translate(0, lift);

  drawCardGlow(x, y, w, h, levelInfo.accent, hovering ? 1 : 0.45);
  drawPanel(x, y, w, h);

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(23));
  textBox(levelInfo.title, x + px(22), y + px(22), w - px(44), px(56));

  textStyle(NORMAL);
  textSize(px(14));
  fill(205);
  textBox(levelInfo.subtitle, x + px(22), y + px(84), w - px(44), px(42));

  drawLevelPreview(levelInfo.level, x + px(22), y + px(138), w - px(44), px(118));

  fill(240);
  textSize(px(15));
  textAlign(LEFT, TOP);
  text("Main Goals:", x + px(22), y + px(280));

  fill(205);
  textSize(px(13));
  const goalsTop = y + px(314);
  const lineGap = px(24);

  for (let i = 0; i < levelInfo.goals.length; i++) {
    textBox("• " + levelInfo.goals[i], x + px(22), goalsTop + i * lineGap, w - px(44), px(24));
  }

  addMenuButton(x + px(22), y + h - px(48), w - px(44), px(34), "Launch " + levelInfo.title, () => {
    selectedLevel = levelInfo.level;
    changeScene(SCENE_LEVEL_LAUNCH);
  }, levelInfo.accent);

  pop();
}

function drawLevelPreview(levelNumber, x, y, w, h) {
  push();
  noStroke();
  fill(20, 24, 36);
  rect(x, y, w, h, px(12));

  if (levelNumber === 1) {
    fill(40, 60, 80);
    rect(x + px(12), y + px(12), w - px(24), h - px(24), px(8));

    fill(200, 180, 120);
    rect(x + px(28), y + px(22), px(32), h - px(44));
    rect(x + px(92), y + px(16), px(38), h - px(32));
    rect(x + px(168), y + px(24), px(28), h - px(50));
    rect(x + px(240), y + px(14), px(36), h - px(28));

    fill(255, 220, 70);
    rect(x + px(48), y + px(46), px(16), px(16), px(3));

    fill(0, 180, 120);
    circle(x + w - px(36), y + h - px(28), px(22));
  } else if (levelNumber === 2) {
    fill(55, 62, 78);
    rect(x + px(12), y + px(12), w - px(24), h - px(24), px(8));

    fill(120, 120, 140);
    rect(x + px(26), y + px(16), px(30), h - px(32));
    rect(x + px(88), y + px(22), px(38), h - px(44));
    rect(x + px(170), y + px(18), px(30), h - px(36));
    rect(x + px(246), y + px(32), px(34), h - px(64));

    fill(15, 18, 25, 170);
    rect(x + px(12), y + px(12), w - px(24), h - px(24), px(8));

    fill(255, 220, 90, 120);
    circle(x + px(118), y + h * 0.55, px(86));

    fill(230, 80, 80);
    circle(x + w - px(70), y + h * 0.62, px(14));

    fill(0, 200, 90);
    rect(x + w - px(48), y + px(26), px(18), px(30), px(3));
  } else {
    fill(50, 55, 70);
    rect(x + px(12), y + px(12), w - px(24), h - px(24), px(8));

    fill(120, 90, 240);
    circle(x + px(52), y + px(40), px(20));
    circle(x + px(174), y + px(84), px(20));
    circle(x + w - px(34), y + px(36), px(20));

    fill(230, 80, 80);
    circle(x + px(134), y + px(44), px(14));
    circle(x + px(214), y + px(66), px(14));

    fill(160, 0, 190);
    circle(x + w - px(92), y + h - px(30), px(36));

    fill(0, 200, 90);
    rect(x + w - px(74), y + px(22), px(18), px(30), px(3));
  }

  pop();
}

// ==================== 角色选择页 / Character select ====================
function drawCharacterSelect() {
  const area = pageContentRect();
  drawPanel(area.x, area.y, area.w, area.h);

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text("CHARACTER SELECT", area.x + px(34), area.y + px(34));

  textStyle(NORMAL);
  textSize(px(17));
  fill(210);
  text("Choose a hero style. Art images can be added later.", area.x + px(36), area.y + px(100));

  const cardGap = px(22);
  const innerX = area.x + px(34);
  const innerY = area.y + px(160);
  const innerW = area.w - px(68);
  const cardW = (innerW - cardGap * 2) / 3;
  const cardH = min(px(390), area.h - px(230));

  for (let i = 0; i < characterOptions.length; i++) {
    const x = innerX + i * (cardW + cardGap);
    drawCharacterCard(characterOptions[i], x, innerY, cardW, cardH);
  }

  addMenuButton(area.x + px(36), area.y + area.h - px(58), px(220), px(42), "Back to Main Menu", () => {
    changeScene(SCENE_MAIN_MENU);
  }, [85, 95, 115]);
}

function drawCharacterCard(charData, x, y, w, h) {
  const selected = selectedCharacterId === charData.id;
  const hovering = mouseOverRect(x, y, w, h);

  drawCardGlow(x, y, w, h, charData.accent, selected ? 1 : (hovering ? 0.7 : 0.35));
  drawPanel(x, y, w, h);

  if (selected) {
    noFill();
    stroke(charData.accent[0], charData.accent[1], charData.accent[2], 220);
    strokeWeight(2);
    rect(x + px(3), y + px(3), w - px(6), h - px(6), px(14));
  }

  drawCharacterPortrait(charData, x + (w - px(110)) / 2, y + px(34), px(110), false);

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(22));
  textBox(charData.name, x + px(24), y + px(180), w - px(48), px(34));

  textStyle(NORMAL);
  textSize(px(14));
  fill(205);
  textBox(charData.desc, x + px(24), y + px(218), w - px(48), px(48));

  fill(190);
  textSize(px(13));
  textBox(
    "Reserved for future art replacement. This version uses simple color coding.",
    x + px(24),
    y + px(276),
    w - px(48),
    px(54)
  );

  const label = selected ? "Selected" : "Select Character";
  const enabled = !selected;

  addMenuButton(x + px(24), y + h - px(44), w - px(48), px(34), label, () => {
    selectedCharacterId = charData.id;
    savePersistentState();
    showFlash(`${charData.name} selected`, true);
    playEquipTone();
  }, [50, 150, 100], enabled);
}

function drawCharacterPortrait(charData, x, y, size, highlight) {
  push();

  const pulse = highlight ? sin(uiTime * 1.6) * px(4) : 0;

  noStroke();
  fill(0, 0, 0, 45);
  ellipse(x + size / 2, y + size + px(18), size * 0.56, px(16));

  fill(charData.accent[0], charData.accent[1], charData.accent[2], 30);
  circle(x + size / 2, y + size / 2, size + px(28) + pulse);

  fill(charData.body[0], charData.body[1], charData.body[2]);
  ellipse(x + size / 2, y + px(72), px(50), px(62));

  fill(255, 220, 177);
  ellipse(x + size / 2, y + px(35), px(38), px(38));

  fill(0);
  ellipse(x + size / 2 - px(7), y + px(33), px(4), px(4));
  ellipse(x + size / 2 + px(7), y + px(33), px(4), px(4));

  fill(charData.accent[0], charData.accent[1], charData.accent[2]);
  rect(x + size / 2 - px(12), y + px(58), px(24), px(8), px(4));

  pop();
}

// ==================== 规则页 / Guide scene ====================
function drawGuideScene() {
  const area = pageContentRect();
  drawPanel(area.x, area.y, area.w, area.h);

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text("GAME GUIDE", area.x + px(34), area.y + px(34));

  textStyle(NORMAL);
  textSize(px(17));
  fill(210);
  text("Read the main mechanics before starting a stage.", area.x + px(36), area.y + px(100));

  const gap = px(26);
  const blockY = area.y + px(156);
  const blockW = (area.w - px(68) - gap) / 2;
  const blockH = area.h - px(250);

  drawGuideBlock(
    area.x + px(34), blockY, blockW, blockH,
    "Core Rules",
    [
      "• Chest: unlocks the mini map and important markers.",
      "• Lamp: clears the fog and expands vision.",
      "• Gun: allows you to attack enemies.",
      "• Timer: every level has a time limit.",
      "• Mini Map: can be shown or hidden with M.",
      "• Pause: press P during gameplay."
    ]
  );

  drawGuideBlock(
    area.x + px(34) + blockW + gap, blockY, blockW, blockH,
    "Advanced Rules",
    [
      "• Level 1: find the needed tools and escape through the lake exit.",
      "• Level 2: defeat enemies for coins and unlock the final door.",
      "• Level 3: survive portals, enemy shots and the boss.",
      "• Small enemies in Level 3 need several hits.",
      "• Defeating a small enemy in Level 3 restores 20 HP.",
      "• The boss must be defeated before the exit opens."
    ]
  );

  addMenuButton(area.x + px(36), area.y + area.h - px(58), px(220), px(42), "Back to Main Menu", () => {
    changeScene(SCENE_MAIN_MENU);
  }, [85, 95, 115]);

  addMenuButton(area.x + area.w - px(256), area.y + area.h - px(58), px(220), px(42), "Open Weapon Shop", () => {
    openExternalPage(pageRoutes.shop, "shop page");
  }, [110, 90, 220]);
}

function drawGuideBlock(x, y, w, h, title, lines) {
  drawPanel(x, y, w, h);

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(24));
  text(title, x + px(20), y + px(20));

  fill(220);
  textStyle(NORMAL);
  textSize(px(14));

  let yy = y + px(70);
  for (let line of lines) {
    textBox(line, x + px(20), yy, w - px(40), px(42));
    yy += px(46);
  }
}

// ==================== 关卡启动页 / Level launch scene ====================
function drawLevelLaunchScene() {
  const area = pageContentRect();
  drawPanel(area.x, area.y, area.w, area.h);

  const lv = levelData[selectedLevel - 1];
  const weapon = shopItems[equippedGunLevel - 1];
  const hero = getSelectedCharacter();

  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(px(38));
  text(lv.title, area.x + px(40), area.y + px(42));

  textStyle(NORMAL);
  textSize(px(16));
  fill(210);
  text(lv.subtitle, area.x + px(42), area.y + px(100));

  const leftX = area.x + px(40);
  const topY = area.y + px(150);
  const gap = px(28);
  const leftW = area.w * 0.33;
  const rightW = area.w - leftW - gap - px(80);
  const boxH = area.h - px(250);

  drawPanel(leftX, topY, leftW, boxH);
  fill(255);
  textStyle(BOLD);
  textSize(px(24));
  text("Loadout", leftX + px(20), topY + px(20));

  drawCharacterPortrait(hero, leftX + px(34), topY + px(82), px(96), false);

  fill(235);
  textStyle(NORMAL);
  textSize(px(15));
  text(`Character: ${hero.name}`, leftX + px(156), topY + px(92));
  text(`Weapon: ${weapon.name}`, leftX + px(156), topY + px(126));
  text(`Damage: ${weapon.damage}`, leftX + px(156), topY + px(160));
  text(`Bullet Speed: ${weapon.speed}`, leftX + px(156), topY + px(194));
  text(`Cooldown: ${weapon.cooldown}s`, leftX + px(156), topY + px(228));
  text(`Coins: £${coins}`, leftX + px(156), topY + px(262));

  drawPanel(leftX + leftW + gap, topY, rightW, boxH);
  fill(255);
  textStyle(BOLD);
  textSize(px(24));
  text("Mission Goals", leftX + leftW + gap + px(20), topY + px(20));

  fill(220);
  textStyle(NORMAL);
  textSize(px(14));

  let yy = topY + px(76);
  for (let goal of lv.goals) {
    textBox("• " + goal, leftX + leftW + gap + px(20), yy, rightW - px(40), px(34));
    yy += px(42);
  }

  addMenuButton(area.x + px(40), area.y + area.h - px(56), px(200), px(40), "Back to Levels", () => {
    changeScene(SCENE_LEVEL_SELECT);
  }, [85, 95, 115]);

  addMenuButton(area.x + px(260), area.y + area.h - px(56), px(240), px(40), `Start ${lv.title}`, () => {
    launchLevel(selectedLevel);
  }, lv.accent);

  addMenuButton(area.x + px(520), area.y + area.h - px(56), px(220), px(40), "Open Weapon Shop", () => {
    openExternalPage(pageRoutes.shop, "shop page");
  }, [110, 90, 220]);
}

function launchLevel(levelNumber) {
  if (levelNumber === 1) {
    openExternalPage(pageRoutes.level1, "Level 1 page");
  } else if (levelNumber === 2) {
    openExternalPage(pageRoutes.level2, "Level 2 page");
  } else if (levelNumber === 3) {
    openExternalPage(pageRoutes.level3, "Level 3 page");
  }
}

function openExternalPage(route, label) {
  if (!route) {
    showFlash(`Missing ${label} route`, false);
    playFailTone();
    return;
  }

  window.location.href = route;
}

// ==================== 通用按钮 / Generic buttons ====================
function addMenuButton(x, y, w, h, label, action, colorArr, enabled = true) {
  const hovered = mouseOverRect(x, y, w, h);

  currentButtons.push({ x, y, w, h, label, action, colorArr, enabled });

  if (hovered) {
    hoveredButtonIndex = currentButtons.length - 1;
  }

  drawButton(x, y, w, h, label, enabled, hovered, colorArr);
}

function drawButton(x, y, w, h, label, enabled, hovered, baseColor) {
  let c = enabled ? baseColor : [90, 95, 110];
  let brighten = hovered && enabled ? 24 : 0;

  noStroke();
  fill(c[0] + brighten, c[1] + brighten, c[2] + brighten);
  rect(x, y, w, h, px(10));

  fill(255, 255, 255, hovered ? 28 : 16);
  rect(x + px(2), y + px(2), w - px(4), px(10), px(8));

  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(px(14));
  text(label, x + w / 2, y + h / 2);
}

function drawPanel(x, y, w, h) {
  noStroke();
  fill(24, 30, 45, 235);
  rect(x, y, w, h, px(14));

  fill(255, 255, 255, 10);
  rect(x + px(2), y + px(2), w - px(4), px(20), px(12));
}

function drawCardGlow(x, y, w, h, accent, strength) {
  if (strength <= 0) return;

  noStroke();
  fill(accent[0], accent[1], accent[2], 18 * strength);
  rect(x - px(6), y - px(6), w + px(12), h + px(12), px(18));
}

// ==================== 文本盒子 / Text box helper ====================
// 使用固定宽高文本框，避免文字挤压和越界
// Use fixed text boxes to avoid overflow and uneven alignment
function textBox(str, x, y, w, h) {
  text(str, x, y, w, h);
}

// ==================== 场景切换 / Scene switching ====================
function changeScene(sceneName) {
  currentScene = sceneName;
  playHoverTone();
}

// ==================== 提示消息 / Flash message ====================
function showFlash(msg, good) {
  flashText = msg;
  flashGood = good;
  flashTimer = 60;
}

function drawFlashMessage() {
  if (flashTimer <= 0) return;

  let alpha = map(flashTimer, 0, 60, 0, 220);

  noStroke();
  fill(flashGood ? color(40, 170, 90, alpha) : color(180, 70, 70, alpha));
  rect(width / 2 - px(190), px(102), px(380), px(42), px(10));

  fill(255, alpha);
  textAlign(CENTER, CENTER);
  textSize(px(16));
  text(flashText, width / 2, px(123));
}

// ==================== 输入 / Input ====================
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
    if (key === '3') openExternalPage(pageRoutes.shop, "shop page");
    if (key === '4') changeScene(SCENE_GUIDE);
  }

  if (currentScene === SCENE_CHARACTER_SELECT) {
    if (key === '1') selectCharacterById(1);
    if (key === '2') selectCharacterById(2);
    if (key === '3') selectCharacterById(3);
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
  selectedCharacterId = id;
  savePersistentState();
  showFlash(`${getSelectedCharacter().name} selected`, true);
  playEquipTone();
}

// ==================== 小工具 / Helpers ====================
function mouseOverRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function getSelectedCharacter() {
  for (let c of characterOptions) {
    if (c.id === selectedCharacterId) return c;
  }
  return characterOptions[0];
}

// ==================== 音效 / Audio ====================
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

function playFailTone() {
  playTone(220, 0.10, "sawtooth", 0.04);
}

function playHoverTone() {
  playTone(360, 0.04, "square", 0.02);
}
