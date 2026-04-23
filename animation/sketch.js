let bgImg;

// ===== Core State =====
let gameState = "story"; // "story" or "select"
let currentLine = 0;
let visibleChars = 0;
let typingSpeed = 2; // show one more character every few frames
let lineFullyShown = false;
let fadeAlpha = 255;

// ===== Character Data =====
let characters = {
  student: {
    name: "Student",
    color: [180, 210, 255],
    x: 220,
    y: 430,
    w: 220,
    h: 360
  },
  racer: {
    name: "F1 Driver",
    color: [255, 210, 120],
    x: 640,
    y: 430,
    w: 220,
    h: 360
  },
  fox: {
    name: "Fox",
    color: [255, 150, 90],
    x: 1060,
    y: 430,
    w: 220,
    h: 320
  }
};

// ===== Story Data =====
let story = [
  { speaker: "student", name: "Student", text: "...Where is this...? College Green?" },
  { speaker: "racer", name: "F1 Driver", text: "Something is wrong... I was just on the track." },
  { speaker: "fox", name: "Fox", text: "The wind is wrong... and so is the scent." },

  { speaker: "student", name: "Student", text: "Why is there so much fog here...?" },
  { speaker: "racer", name: "F1 Driver", text: "And why is it night? The timing makes no sense." },

  { speaker: "narrator", name: "???", text: "You have already been drawn into the mist." },

  { speaker: "narrator", name: "Voice", text: "A force once sealed away in the Middle Ages has awakened again." },
  { speaker: "narrator", name: "Voice", text: "It is a soul-devouring being — the Lord of Dementors." },
  { speaker: "narrator", name: "Voice", text: "Through the mist, it spreads across the city." },

  { speaker: "narrator", name: "Voice", text: "Anyone who breathes in the mist will fall into a deep sleep." },
  { speaker: "narrator", name: "Voice", text: "Their souls will then be consumed, little by little, until nothing remains." },

  { speaker: "narrator", name: "Voice", text: "And you — all three of you — come from different timelines." },
  { speaker: "narrator", name: "Voice", text: "Yet each of you has a special connection to Bristol and to this ancient curse." },

  { speaker: "narrator", name: "Voice", text: "At this moment, Bristol stands between reality and illusion." },
  { speaker: "narrator", name: "Voice", text: "Time is collapsing. Space is distorting." },
  { speaker: "narrator", name: "Voice", text: "Labyrinths that should not exist are now forming inside its buildings." },

  { speaker: "narrator", name: "Voice", text: "You must break through three mazes within six hours." },
  { speaker: "narrator", name: "Voice", text: "And claim three key relics." },

  { speaker: "narrator", name: "Voice", text: "The Crossbow — for physical attack." },
  { speaker: "narrator", name: "Voice", text: "The Magic Ring — for magical attack." },
  { speaker: "narrator", name: "Voice", text: "The Key and Lock — to seal the curse master." },

  { speaker: "narrator", name: "Voice", text: "If you fail, your souls too will vanish into the mist." },

  { speaker: "student", name: "Student", text: "Then... we have no other choice." },
  { speaker: "racer", name: "F1 Driver", text: "Fine. Then we break through it." },
  { speaker: "fox", name: "Fox", text: "Heh... so fate has begun to move at last." },

  { speaker: "narrator", name: "Voice", text: "Choose your fate." }
];

function preload() {
  bgImg = loadImage("first_scene.png");
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

  drawCharacterSprite("student", line.speaker === "student");
  drawCharacterSprite("racer", line.speaker === "racer");
  drawCharacterSprite("fox", line.speaker === "fox");
}

function drawCharacterSprite(key, speaking) {
  let c = characters[key];

  push();

  // Dim characters who are not speaking
  if (speaking) {
    tint(255, 255);
  } else {
    tint(180, 180);
  }

  let bob = sin(frameCount * 0.04 + c.x * 0.01) * 3;

  // Placeholder portrait for now
  translate(c.x, c.y + bob);

  if (key === "fox") {
    drawFoxPortrait(0, 0, c.w, c.h, speaking);
  } else {
    drawHumanPortrait(0, 0, c.w, c.h, c.color, key, speaking);
  }

  pop();
}

function drawHumanPortrait(x, y, w, h, baseColor, key, speaking) {
  push();
  rectMode(CENTER);
  noStroke();

  // Body
  fill(baseColor[0] * 0.7, baseColor[1] * 0.7, baseColor[2] * 0.7, 230);
  rect(x, y + 40, w * 0.52, h * 0.72, 20);

  // Head
  fill(245, 220, 195, 245);
  ellipse(x, y - 95, w * 0.42, w * 0.42);

  // Hair and details
  if (key === "student") {
    fill(35, 30, 45, 240);
    arc(x, y - 110, w * 0.46, w * 0.40, PI, TWO_PI);
    rect(x, y - 80, w * 0.40, h * 0.18, 20);

    // Glasses
    noFill();
    stroke(40, 40, 40, 220);
    strokeWeight(3);
    rect(x - 26, y - 95, 32, 22, 5);
    rect(x + 26, y - 95, 32, 22, 5);
    line(x - 10, y - 95, x + 10, y - 95);
  } else if (key === "racer") {
    fill(80, 50, 25, 240);
    arc(x, y - 112, w * 0.48, w * 0.36, PI, TWO_PI);
    rect(x, y - 88, w * 0.36, h * 0.12, 16);

    // Racing suit accent
    noStroke();
    fill(220, 70, 50, 220);
    rect(x, y + 65, w * 0.48, h * 0.18, 18);
  }

  // Glow around speaking character
  if (speaking) {
    noFill();
    stroke(255, 240, 180, 120);
    strokeWeight(5);
    rect(x, y, w * 0.62, h * 0.86, 24);
  }

  pop();
}

function drawFoxPortrait(x, y, w, h, speaking) {
  push();
  rectMode(CENTER);
  noStroke();

  // Cloak
  fill(45, 80, 70, 235);
  triangle(x - w * 0.28, y + 85, x + w * 0.28, y + 85, x, y - 20);

  // Head
  fill(210, 100, 45, 245);
  ellipse(x, y - 70, w * 0.42, w * 0.34);

  // Ears
  triangle(x - 50, y - 110, x - 18, y - 165, x - 2, y - 95);
  triangle(x + 50, y - 110, x + 18, y - 165, x + 2, y - 95);

  // White fur
  fill(240, 235, 225, 245);
  ellipse(x, y - 45, w * 0.26, w * 0.18);

  // Nose
  fill(35, 35, 35);
  ellipse(x, y - 52, 12, 8);

  // Eyes
  ellipse(x - 25, y - 78, 8, 8);
  ellipse(x + 25, y - 78, 8, 8);

  if (speaking) {
    noFill();
    stroke(255, 240, 180, 120);
    strokeWeight(5);
    rect(x, y, w * 0.62, h * 0.78, 24);
  }

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

  drawMiniPortrait("student", 300, 385);
  drawMiniPortrait("racer", 768, 385);
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
  push();
  translate(x, y);
  if (key === "fox") {
    drawFoxPortrait(0, 0, 120, 170, false);
  } else if (key === "student") {
    drawHumanPortrait(0, 0, 120, 170, [180, 210, 255], "student", false);
  } else {
    drawHumanPortrait(0, 0, 120, 170, [255, 210, 120], "racer", false);
  }
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
      print("Selected: Student");
    } else if (key === '2') {
      print("Selected: F1 Driver");
    } else if (key === '3') {
      print("Selected: Fox");
    }
  }
}