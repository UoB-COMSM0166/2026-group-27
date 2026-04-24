let bgImg;
let portraits = {};

// ===== Core State =====
let gameState = "story"; // "story" or "select"
let currentLine = 0;
let visibleChars = 0;
let typingSpeed = 2; // show one more character every few frames
let lineFullyShown = false;
let fadeAlpha = 255;

// ===== Character Data =====
let characters = {
  Eliza: {
    name: "Eliza",
    x: 300,
    bottomY: 610,
    boxH: 520,
    defaultPortrait: "Eliza_default"
  },
  Lando: {
    name: "Lando",
    x: 760,
    bottomY: 610,
    boxH: 540,
    defaultPortrait: "Lando_default"
  },
  fox: {
    name: "Fox",
    x: 1200,
    bottomY: 610,
    boxH: 430,
    defaultPortrait: "fox_default"
  }
};

// portrait settings
let portraitSettings = {
  Eliza_default:  { scale: 1.00, offsetX: 0, offsetY: 0 },
  Eliza_smile:    { scale: 1.00, offsetX: 0, offsetY: 0 },
  Eliza_talking:  { scale: 1.00, offsetX: 0, offsetY: 0 },

  Lando_default: { scale: 1.00, offsetX: 0, offsetY: 0 },
  Lando_determination: { scale: 1.00, offsetX: 0, offsetY: 0 },

  fox_default: { scale: 1.00, offsetX: 0, offsetY: 0 },
  fox_smile:   { scale: 1.00, offsetX: 0, offsetY: 0 },
  fox_worry:   { scale: 1.00, offsetX: 0, offsetY: 0 }
};

// ===== Story Data =====
let story = [
  { speaker: "Eliza", name: "Eliza", portrait: "Eliza_talking", text: "...Where is this...? College Green?" },
  { speaker: "Lando", name: "Lando", portrait: "Lando_default", text: "Something is wrong... I was just on the track." },
  { speaker: "fox", name: "Fox", portrait: "fox_worry", text: "The wind is wrong... and so is the scent." },

  { speaker: "Eliza", name: "Eliza", portrait: "Eliza_talking", text: "Why is there so much fog here...?" },
  { speaker: "Lando", name: "Lando", portrait: "Lando_default", text: "And why is it night? The timing makes no sense." },

  { speaker: "narrator", name: "???", portrait: null, text: "You have already been drawn into the mist." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "A force once sealed away in the Middle Ages has awakened again." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "It is a soul-devouring being — the Devourer in the Mist." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "Through the mist, it spreads across the city." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "Anyone who breathes in the mist will fall into a deep sleep." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "Their souls will then be consumed, little by little, until nothing remains." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "And you — all three of you — come from different timelines." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "Yet each of you has a special connection to Bristol and to this ancient curse." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "At this moment, Bristol stands between reality and illusion." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "Time is collapsing. Space is distorting." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "Labyrinths that should not exist are now forming inside its buildings." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "You must break through three mazes within six hours." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "And claim three key relics." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "The Crossbow — for physical attack." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "The Magic Ring — for magical attack." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "The Key and Lock — to seal the curse master." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "If you fail, your souls too will vanish into the mist." },

  { speaker: "Eliza", name: "Eliza", portrait: "Eliza_default", text: "Then... we have no other choice." },
  { speaker: "Lando", name: "Lando", portrait: "Lando_determination", text: "Fine. Then we break through it." },
  { speaker: "fox", name: "Fox", portrait: "fox_smile", text: "Heh... so fate has begun to move at last." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "Choose your fate." }
];

function preload() {
  bgImg = loadImage("assets/background/first_scene.png");

  portraits.Eliza_default = loadImage("assets/portraits/Eliza/Eliza_default.png");
  portraits.Eliza_smile = loadImage("assets/portraits/Eliza/Eliza_smile.png");
  portraits.Eliza_talking = loadImage("assets/portraits/Eliza/Eliza_talking.png");

  portraits.Lando_default = loadImage("assets/portraits/Lando/Lando_default.png");
  portraits.Lando_determination = loadImage("assets/portraits/Lando/Lando_determination.png");

  portraits.fox_default = loadImage("assets/portraits/fox/fox_default.png");
  portraits.fox_smile = loadImage("assets/portraits/fox/fox_smile.png");
  portraits.fox_worry = loadImage("assets/portraits/fox/fox_worry.png");
}

function setup() {
  createCanvas(1536, 864);
  textFont("Georgia");
  textWrap(CHAR);
}

function draw() {
  drawBackgroundScene();

  if (gameState === "story") {
    drawStoryMode();
  } else if (gameState === "select") {
    drawCharacterSelect();
  }

  drawFadeIn();
}

// ===== Story Scene =====
function drawStoryMode() {
  drawCharacters();
  drawFogOverlay();

  let line = story[currentLine];

  updateTyping(line.text);
  drawDialogueBox(line);

  drawContinueHint();

  if (fadeAlpha > 0) {
    fadeAlpha -= 6;
  }
}

// ===== Background =====
function drawBackgroundScene() {
  background(10);

  if (bgImg) {
    image(bgImg, 0, 0, width, height);
  }

  // Slight dark overlay for night atmosphere
  fill(10, 20, 40, 60);
  rect(0, 0, width, height);
}

// ===== Character Display =====
function drawCharacters() {
  let line = story[currentLine];

  drawPortrait("Eliza", line.speaker === "Eliza", line.portrait);
  drawPortrait("Lando", line.speaker === "Lando", line.portrait);
  drawPortrait("fox", line.speaker === "fox", line.portrait);
}

function drawPortrait(key, speaking, currentPortraitKey) {
  let c = characters[key];

  let portraitKey = speaking && currentPortraitKey
    ? currentPortraitKey
    : c.defaultPortrait;

  let img = portraits[portraitKey];
  if (!img) return;

  let setting = portraitSettings[portraitKey] || {
    scale: 1,
    offsetX: 0,
    offsetY: 0
  };

  let imgRatio = img.width / img.height;

  let drawH = c.boxH * setting.scale;
  let drawW = drawH * imgRatio;

  let bob = sin(frameCount * 0.04 + c.x * 0.01) * 3;

  let drawX = c.x + setting.offsetX;
  let drawY = c.bottomY - drawH / 2 + setting.offsetY + bob;

  push();

  if (speaking) {
    tint(255, 255);
  } else {
    tint(120, 150);
  }

  imageMode(CENTER);
  image(img, drawX, drawY, drawW, drawH);

  pop();
}

// ===== Dialogue Box =====
function drawDialogueBox(line) {
  let isNarrator = line.speaker === "narrator";

  push();

  let boxX = 130;
  let boxY = 625;
  let boxW = width - 260;
  let boxH = 180;

  // Narrator has a colder and more mysterious style
  if (isNarrator) {
    fill(8, 12, 25, 210);
    stroke(120, 150, 255, 120);
  } else {
    fill(0, 0, 0, 180);
    stroke(255, 220, 140, 100);
  }

  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 16);

  // Name box
  if (isNarrator) {
    fill(30, 40, 75, 220);
    stroke(140, 170, 255, 130);
  } else {
    fill(25, 25, 25, 220);
    stroke(255, 220, 140, 130);
  }
  rect(boxX + 22, boxY - 22, 210, 46, 12);

  // Speaker name
  noStroke();
  if (isNarrator) {
    fill(180, 210, 255);
  } else {
    fill(255, 228, 160);
  }
  textSize(28);
  textAlign(LEFT, CENTER);
  text(line.name, boxX + 42, boxY + 1);

  // Dialogue text
  if (isNarrator) {
    fill(220, 230, 255);
  } else {
    fill(255);
  }

  textSize(34);
  textAlign(LEFT, TOP);

  let shownText = line.text.substring(0, visibleChars);
  text(shownText, boxX + 42, boxY + 34, boxW - 84, boxH - 48);

  pop();
}

// ===== Typewriter Effect =====
function updateTyping(fullText) {
  if (!lineFullyShown && frameCount % typingSpeed === 0) {
    visibleChars++;
    if (visibleChars >= fullText.length) {
      visibleChars = fullText.length;
      lineFullyShown = true;
    }
  }
}

function nextLine() {
  currentLine++;

  if (currentLine >= story.length) {
    gameState = "select";
    return;
  }

  visibleChars = 0;
  lineFullyShown = false;
}

// ===== Continue Hint =====
function drawContinueHint() {
  if (frameCount % 60 < 30 && lineFullyShown) {
    push();
    fill(255, 220, 120);
    textSize(22);
    textAlign(RIGHT, CENTER);
    text("Press SPACE", width - 170, 785);
    pop();
  }
}

// ===== Fog Overlay =====
function drawFogOverlay() {
  noStroke();

  for (let i = 0; i < 6; i++) {
    let x = (frameCount * (0.3 + i * 0.05) + i * 260) % (width + 300) - 150;
    let y = 470 + sin(frameCount * 0.01 + i) * 18 + i * 28;

    fill(180, 190, 220, 24);
    ellipse(x, y, 300, 90);

    fill(160, 170, 200, 18);
    ellipse(x + 60, y + 20, 240, 70);
  }

  // Foreground fog
  fill(120, 130, 170, 28);
  rect(0, height - 180, width, 180);
}

// ===== Fade In =====
function drawFadeIn() {
  if (fadeAlpha > 0) {
    fill(0, fadeAlpha);
    rect(0, 0, width, height);
  }
}

// ===== Character Selection =====
function drawCharacterSelect() {
  drawFogOverlay();

  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  fill(255, 230, 180);
  textAlign(CENTER, CENTER);
  textSize(56);
  text("Choose Your Fate", width / 2, 120);

  textSize(24);
  fill(220);
  text("Press 1 for Student   |   Press 2 for F1 Driver   |   Press 3 for Fox", width / 2, 180);

  drawSelectCard(300, 430, 260, 420, "Student", "Balanced / Careful Explorer");
  drawSelectCard(768, 430, 260, 420, "F1 Driver", "Fast / High Mobility");
  drawSelectCard(1236, 430, 260, 420, "Fox", "Mystic / Fog Sense");

drawMiniPortrait("Eliza", 300, 385);
drawMiniPortrait("Lando", 768, 385);
drawMiniPortrait("fox", 1236, 385);
}

function drawSelectCard(x, y, w, h, title, desc) {
  push();
  rectMode(CENTER);

  fill(15, 18, 30, 210);
  stroke(255, 220, 140, 90);
  strokeWeight(2);
  rect(x, y, w, h, 20);

  noStroke();
  fill(255, 225, 160);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(title, x, y + 120);

  fill(220);
  textSize(20);
  text(desc, x, y + 165);

  fill(170);
  textSize(18);
  text("Stats can be added later", x, y + 210);

  pop();
}

function drawMiniPortrait(key, x, y) {
  let img = portraits[characters[key].defaultPortrait];
  if (!img) return;

  push();
  imageMode(CENTER);
  image(img, x, y, 170, 240);
  pop();
}

// ===== Input =====
function keyPressed() {
  if (gameState === "story") {
    let fullText = story[currentLine].text;

    if (key === ' ' || keyCode === ENTER) {
      if (!lineFullyShown) {
        visibleChars = fullText.length;
        lineFullyShown = true;
      } else {
        nextLine();
      }
    }
  } else if (gameState === "select") {
    if (key === '1') {
  print("Selected: Eliza");
} else if (key === '2') {
  print("Selected: Lando");
} else if (key === '3') {
  print("Selected: Fox");
}
    }
  
}
