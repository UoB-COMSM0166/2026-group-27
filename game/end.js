let bgImg;
let portraits = {};
let fogImg;
let fogAlphaImg;
let dialogueFrameImg;
let selectedCharacter = null;
let selectCards = [];
let selectCardImg;

// ===== Core State =====
let gameState = "story"; // "story" or "select"
let currentLine = 0;
let visibleChars = 0;
let typingSpeed = 2; // show one more character every few frames
let lineFullyShown = false;
let fadeAlpha = 255;

// ===== Character Data =====
let characters;

// portrait settings
let portraitSettings = {
  Eliza_default:  { scale: 1.00, offsetX: 0, offsetY: 0 },
  Eliza_smile:    { scale: 1.00, offsetX: 0, offsetY: 0 },
  Eliza_talking:  { scale: 1.00, offsetX: 0, offsetY: 0 },

  Lando_default: { scale: 1.00, offsetX: 0, offsetY: 0 },
  Lando_determination: { scale: 1.00, offsetX: 10, offsetY: -16 },

  fox_default: { scale: 1.00, offsetX: 0, offsetY: 0 },
  fox_smile:   { scale: 1.00, offsetX: 0, offsetY: 0 },
  fox_worry:   { scale: 1.00, offsetX: 0, offsetY: 0 }
};

// ===== Story Data =====
let story = [
  { speaker: "Eliza", name: "Eliza", portrait: "Eliza_talking", text: "...Where is this...? College Green?" },
  { speaker: "Lando", name: "Lando", portrait: "Lando_determination", text: "Something is wrong... I was just on the track." },
  { speaker: "fox", name: "Fox", portrait: "fox_worry", text: "The wind is wrong... and so is the scent." },

  { speaker: "Eliza", name: "Eliza", portrait: "Eliza_talking", text: "Why is there so much fog here...?" },
  { speaker: "Lando", name: "Lando", portrait: "Lando_determination", text: "And why is it night? The timing makes no sense." },

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

  { speaker: "narrator", name: "Voice", portrait: null, text: "You must break through three mazes within one hour." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "And claim three key relics." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "The Crossbow — for physical attack." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "The Magic Ring — for magical attack." },
  { speaker: "narrator", name: "Voice", portrait: null, text: "The Key and Lock — to seal the curse master." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "If you fail, your souls too will vanish into the mist." },

  { speaker: "Eliza", name: "Eliza", portrait: "Eliza_default", text: "Then... we have no other choice." },
  { speaker: "Lando", name: "Lando", portrait: "Lando_default", text: "Fine. Then we break through it." },
  { speaker: "fox", name: "Fox", portrait: "fox_default", text: "Heh... so fate has begun to move at last." },

  { speaker: "narrator", name: "Voice", portrait: null, text: "Choose your fate." }
];

function preload() {
  bgImg = loadImage("assets/background/first_scene.png");
  
  fogImg = loadImage("assets/effects/fog.png");
  
  dialogueFrameImg = loadImage("assets/ui/dialogue_frame.png");

  portraits.Eliza_default = loadImage("assets/portraits/Eliza/Eliza_default.png");
  portraits.Eliza_smile = loadImage("assets/portraits/Eliza/Eliza_smile.png");
  portraits.Eliza_talking = loadImage("assets/portraits/Eliza/Eliza_talking.png");

  portraits.Lando_default = loadImage("assets/portraits/Lando/Lando_default.png");
  portraits.Lando_determination = loadImage("assets/portraits/Lando/Lando_determination.png");

  portraits.fox_default = loadImage("assets/portraits/fox/fox_default.png");
  portraits.fox_smile = loadImage("assets/portraits/fox/fox_smile.png");
  portraits.fox_worry = loadImage("assets/portraits/fox/fox_worry.png");
  
  selectCardImg = loadImage("assets/ui/select_card.png");
  
}

function setup() {
  createCanvas(1536, 864);
  textFont("Cormorant Garamond");
  textWrap(CHAR);

  characters = {
    Eliza: {
      name: "Eliza",
      x: width * 0.20,
      bottomY: height - 100,
      boxH: 540,
      defaultPortrait: "Eliza_default"
    },
    Lando: {
      name: "Lando",
      x: width * 0.46,
      bottomY: height - 100,
      boxH: 560,
      defaultPortrait: "Lando_default"
    },
    fox: {
      name: "Fox",
      x: width * 0.77,
      bottomY: height - 100,
      boxH: 460,
      defaultPortrait: "fox_default"
    }
  };
}

for (let key in portraits) {
  cleanWhiteEdge(portraits[key]);
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
  drawFog("back");
  drawCharacters();
  drawFog("front");

  let line = story[currentLine];

  updateTyping(line.text);
  drawDialogueBox(line);
  drawContinueHint();

  if (fadeAlpha > 0) {
    fadeAlpha -= 6;
  }
}
//remove white edge 去白边
function cleanWhiteEdge(img) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let a = img.pixels[i + 3];

    let brightness = (r + g + b) / 3;
    let colorDiff = max(r, g, b) - min(r, g, b);

    // 接近白 / 灰白 / 米白的边缘都处理
    let isPaleEdge = brightness > 210 && colorDiff < 45;

    if (isPaleEdge && a > 0) {
      img.pixels[i + 3] = 0;
    }
  }

  img.updatePixels();
}
// ===== Background =====
function drawBackgroundScene() {
  background(14);

  if (bgImg) {
    image(bgImg, 0, 0, width, height);
  }

  // Slight dark overlay for night atmosphere
  fill(10, 20, 40, 60);
  rect(0, 0, width, height);
}

function removeWhiteBackground(img) {
  let result = createImage(img.width, img.height);

  img.loadPixels();
  result.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    // 越接近白色，越透明
    let brightnessValue = (r + g + b) / 3;
    let alpha = map(brightnessValue, 255, 120, 0, 180);
    alpha = constrain(alpha, 0, 180);

    result.pixels[i] = r;
    result.pixels[i + 1] = g;
    result.pixels[i + 2] = b;
    result.pixels[i + 3] = alpha;
  }

  result.updatePixels();
  return result;
}



function drawFog(layer) {
  if (!fogImg) return;

  push();
  imageMode(CORNER);

  if (layer === "back") {
    tint(255, 50);

    // 底边贴住画面底边
    let fogH = height * 0.58;
    image(fogImg, 0, height - fogH, width, fogH);
  }

  if (layer === "front") {
    tint(255, 85);

    // 前景雾也底边贴住画面底边，但不要太高
    let fogH = height * 0.50;
    image(fogImg, 0, height - fogH, width, fogH);
  }

  noTint();
  pop();
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

  // ❌ 删除浮动
  // let bob = sin(...) ❌

  // ✅ 底部对齐（关键）
  let dialogueTop = height - 260;  // 对话框顶部位置（根据你UI高度）

  let drawX = c.x + setting.offsetX;

  // 👇 核心：贴住对话框
  let drawY = c.bottomY - drawH / 2 + setting.offsetY;

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

  // 对话框位置和大小
  let boxX = 110;
  let boxY = height - 230;
  let boxW = width - 220;
  let boxH = 205;

  // 绘制美术框
  if (dialogueFrameImg) {
    imageMode(CORNER);
    image(dialogueFrameImg, boxX, boxY, boxW, boxH);
  }

  // 名字
  noStroke();
  if (isNarrator) {
    fill(200, 215, 235, 230);
  } else {
    fill(255, 232, 170);
  }
  
  

// 名字框区域
let nameBoxX = boxX + 80;
let nameBoxY = boxY - 2;
let nameBoxW = 410;
let nameBoxH = 58;

// 名字居中
textAlign(CENTER, CENTER);
textFont("Cinzel");
textSize(26);
text(line.name, nameBoxX + nameBoxW / 2, nameBoxY + nameBoxH / 2);

  // 正文
  if (isNarrator) {
    fill(210, 220, 235, 220); 
  } else {
    fill(255);
  }

  textAlign(LEFT, TOP);
  textFont("Cormorant Garamond"); 
  textSize(28);

  let shownText = line.text.substring(0, visibleChars);
  text(shownText, boxX + 78, boxY + 78, boxW - 150, boxH - 100);

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
  push();

  let glow = 185 + sin(frameCount * 0.018) * 45;

  textFont("Cinzel");
  textSize(16);
  textAlign(RIGHT, CENTER);

  // 位置：对话框右下角金色小标左边
  let hintX = width - 206;
  let hintY = height - 46;

  // 柔光
  fill(255, 220, 140, glow * 0.35);
  text("SPACE / CLICK", hintX, hintY);

  // 主文字
  fill(255, 232, 170, glow);
  text("SPACE / CLICK", hintX, hintY);

  pop();
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
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  fill(255, 230, 180);
  textAlign(CENTER, CENTER);
  textFont("Cinzel");
  textSize(56);
  text("Choose Your Fate", width / 2, 120);

  textFont("Cormorant Garamond");
  textSize(24);
  fill(220);
  text("Select a character to begin", width / 2, 180);

  selectCards = [
    { key: "Eliza", x: 300, y: 430, w: 260, h: 420, title: "Eliza", desc: "Seeker of knowledge" },
    { key: "Lando", x: 768, y: 430, w: 260, h: 420, title: "Lando", desc: "Built for speed" },
    { key: "fox", x: 1236, y: 430, w: 260, h: 420, title: "Fox", desc: "Guided by instinct" }
  ];

  for (let card of selectCards) {
    let hovering =
      mouseX > card.x - card.w / 2 &&
      mouseX < card.x + card.w / 2 &&
      mouseY > card.y - card.h / 2 &&
      mouseY < card.y + card.h / 2;

    let selected = selectedCharacter === normalizeOpeningCharacterId(card.key);
    drawSelectCard(card.x, card.y, card.w, card.h, card.title, card.desc, hovering, selected);
    drawMiniPortrait(card.key, card.x, card.y - 40);
    if (selected) {
      drawSelectedCardGlow(card.x, card.y, card.w, card.h);
    }
  }
  push();

  let glow = 170 + sin(frameCount * 0.02) * 40;

  textFont("Cinzel");
  textSize(22);
  textAlign(CENTER, CENTER);

  fill(255, 220, 140, glow * 0.35);
  text("Click to select", width / 2, height - 90);

  fill(255, 232, 170, glow);
  text("Click to select", width / 2, height - 90);

  pop();
  
  let btnW = 260;
  let btnH = 58;
  let btnX = width / 2;
  let btnY = height - 48;

  let hoveringConfirm =
    mouseX > btnX - btnW / 2 &&
    mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 &&
    mouseY < btnY + btnH / 2;

  drawGoldButton(
    btnX,
    btnY,
    btnW,
    btnH,
    selectedCharacter ? "Confirm" : "Select First",
    hoveringConfirm,
    selectedCharacter !== null
  );
}

function drawSelectedCardGlow(x, y, w, h) {
  push();

  rectMode(CENTER);
  noFill();

  let pulse = 120 + sin(frameCount * 0.05) * 45;

  // 很轻的外部暗金辉光
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = "rgba(210, 165, 80, 0.45)";

  stroke(210, 168, 88, pulse);
  strokeWeight(2);
  rect(x, y, w + 8, h + 8, 6);

  drawingContext.shadowBlur = 0;

  // 外细线
  stroke(238, 205, 130, 210);
  strokeWeight(1.2);
  rect(x, y, w + 2, h + 2, 4);

  // 内细线
  stroke(130, 92, 40, 180);
  strokeWeight(1);
  rect(x, y, w - 12, h - 12, 2);

  // 四角短线，更尖锐
  stroke(248, 218, 145, 230);
  strokeWeight(1.4);

  let cx1 = x - w / 2 - 4;
  let cx2 = x + w / 2 + 4;
  let cy1 = y - h / 2 - 4;
  let cy2 = y + h / 2 + 4;
  let len = 24;

  line(cx1, cy1, cx1 + len, cy1);
  line(cx1, cy1, cx1, cy1 + len);

  line(cx2, cy1, cx2 - len, cy1);
  line(cx2, cy1, cx2, cy1 + len);

  line(cx1, cy2, cx1 + len, cy2);
  line(cx1, cy2, cx1, cy2 - len);

  line(cx2, cy2, cx2 - len, cy2);
  line(cx2, cy2, cx2, cy2 - len);

  pop();
}

function drawSelectCard(x, y, w, h, title, desc, hovering, selected) {
  push();
  imageMode(CENTER);

  if (selectCardImg) {
  if (hovering) {
    tint(255, 238);   // 只变亮
  } else {
    tint(255, 215);
  }

  image(selectCardImg, x, y, w, h); // 不再放大

} 

  noTint();
  noStroke();

  fill(255, 225, 160);
  textFont("Cinzel");
  textSize(30);
  textAlign(CENTER, CENTER);
  text(title, x, y + 145);

  fill(220);
  textFont("Cormorant Garamond");
  textSize(20);
  text(desc, x, y + 180);


  pop();
}
function drawMiniPortrait(key, x, y) {
  let img = portraits[characters[key].defaultPortrait];
  if (!img) return;

  let portraitSelectSize = {
    Eliza: { h: 300, offsetY: 0 },
    Lando: { h: 300, offsetY: 0 },
    fox: { h: 260, offsetY: 20 }
  };

  let s = portraitSelectSize[key];

  let ratio = img.width / img.height;
  let drawH = s.h;
  let drawW = drawH * ratio;

  push();
  imageMode(CENTER);
  image(img, x, y + s.offsetY, drawW, drawH);
  pop();
}
// ===== Input =====
function advanceDialogue() {
  if (gameState === "story") {
    let fullText = story[currentLine].text;

    if (!lineFullyShown) {
      visibleChars = fullText.length;
      lineFullyShown = true;
    } else {
      nextLine();
    }
  }
}

function keyPressed() {
  if (gameState === "story") {
    if (key === ' ' || keyCode === ENTER) {
      advanceDialogue();
    }
  } else if (gameState === "select") {
    if (key === '1') selectedCharacter = "eliza";
    if (key === '2') selectedCharacter = "lando";
    if (key === '3') selectedCharacter = "fox";

    if ((keyCode === ENTER || key === ' ') && selectedCharacter) {
      localStorage.setItem("selectedCharacterId", selectedCharacter);
      localStorage.setItem("openingSeen", "true");
      window.location.href = "level1.html";
    }
  }
}

function normalizeOpeningCharacterId(key) {
  if (key === "Lando") return "lando";
  if (key === "Eliza") return "eliza";
  if (key === "fox") return "fox";
  return "fox";
}

function mousePressed() {
  if (mouseButton !== LEFT) return;

  if (gameState === "story") {
    advanceDialogue();
    return;
  }

  if (gameState === "select") {

    for (let card of selectCards) {
      let inside =
        mouseX > card.x - card.w / 2 &&
        mouseX < card.x + card.w / 2 &&
        mouseY > card.y - card.h / 2 &&
        mouseY < card.y + card.h / 2;

      if (inside) {
        selectedCharacter = normalizeOpeningCharacterId(card.key);
        print("Selected: " + selectedCharacter);
      }
    }

    let btnW = 260;
    let btnH = 58;
    let btnX = width / 2;
    let btnY = height - 48;

    let clickConfirm =
      mouseX > btnX - btnW / 2 &&
      mouseX < btnX + btnW / 2 &&
      mouseY > btnY - btnH / 2 &&
      mouseY < btnY + btnH / 2;

    if (clickConfirm && selectedCharacter) {
      localStorage.setItem("selectedCharacterId", selectedCharacter);
      localStorage.setItem("openingSeen", "true");
      window.location.href = "level1.html";
    }
  }
}

function drawGoldButton(cx, cy, w, h, label, hovering, enabled = true) {
  push();
  rectMode(CENTER);

  drawingContext.shadowBlur = hovering && enabled ? 14 : 6;
  drawingContext.shadowColor = hovering && enabled
    ? "rgba(245, 190, 90, 0.9)"
    : "rgba(0, 0, 0, 0.55)";

  noStroke();

  if (!enabled) {
    fill(70, 65, 55);
  } else {
    fill(hovering ? 155 : 90, hovering ? 95 : 50, 28);
  }

  rect(cx, cy, w, h, 10);

  drawingContext.shadowBlur = 0;

  stroke(235, 185, 90, enabled ? 230 : 90);
  strokeWeight(2);
  noFill();
  rect(cx, cy, w - 4, h - 4, 8);

  stroke(95, 55, 20, 220);
  strokeWeight(1);
  rect(cx, cy, w - 12, h - 12, 6);

  noStroke();
  fill(enabled ? color(248, 224, 168) : color(170, 150, 120));
  textFont("Cinzel");
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, cx, cy + 1);

  pop();
}
