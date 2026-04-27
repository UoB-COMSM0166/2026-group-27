let FORCE_OPENING = true;
let desiredBGM = "opening";
let bgImg;
let portraits = {};
let fogImg;
let fogAlphaImg;
let dialogueFrameImg;
let selectedCharacter = null;
let selectCards = [];
let selectCardImg;
let confirmButtonImg;
//cutscene+ending
let backgrounds = {};
let voiceGirlImg;
let voiceBalloonImg;

//transition
let transitionAlpha = 0;
let transitionTargetUrl = null;
let isTransitioning = false;
let transitionTargetState = null;

let currentStory = null;
let currentStoryNextState = null;
let currentBgKey = "first_scene";
//debug
let DEBUG_MODE = false ;
let DEBUG_CHARACTER = "eliza"; // "eliza" / "lando" / "fox"

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
  //update story
  let scene_church = [
  {
    speaker: "hero",
    portraitByCharacter: {
      eliza: "talking",
      lando: "determined",
      fox: "worry"
  },
    textByCharacter: {
      eliza: "The structure… it’s unstable.",
      lando: "Walls don’t just shift like that.",
      fox: "This place breathes."
    }
  },
  { speaker: "Voice", text: "You stand within a fractured space." },
  { speaker: "Voice", text: "A labyrinth shaped by the curse." },
  { speaker: "Voice", text: "Search for the chest." },
  { speaker: "Voice", text: "It will reveal a map." },
  { speaker: "Voice", text: "And a weapon — the crossbow." },
  { speaker: "Voice", text: "Use it to survive." },
  {
    speaker: "hero",
   portrait: "default",
    textByCharacter: {
      eliza: "Then I’ll read the pattern.",
      lando: "Then I’ll outrun it.",
      fox: "Then I’ll follow its rhythm."
    }
  }
];

let scene_after_maze1 = [
  {
    speaker: "hero",
   portraitByCharacter: {
      eliza: "talking",
      lando: "determined",
      fox: "worry"
    },
    textByCharacter: {
      eliza: "No pattern… just controlled chaos.",
      lando: "It tried to box me in.",
      fox: "It shifts without reason."
    }
  },
  { speaker: "Voice", text: "The mist deepens." },
  { speaker: "Voice", text: "Go to Wills Memorial Building." },
  { speaker: "Voice", text: "This labyrinth is veiled." },
  { speaker: "Voice", text: "The mist will obscure your path." },
  { speaker: "Voice", text: "Find a lantern. It will clear your sight." },
  { speaker: "Voice", text: "Search for the magic ring." },
  { speaker: "Voice", text: "It grants power beyond the physical." },
  { speaker: "Voice", text: "You are no longer alone." },
  { speaker: "Voice", text: "Shadows within the mist now hunt you." }
];

let scene_after_maze2 = [
  {
    speaker: "hero",
    portraitByCharacter: {
      eliza: "talking",
      lando: "determined",
      fox: "worry"
    },
    textByCharacter: {
      eliza: "The fog distorted everything… and the ghosts made every step dangerous.",
      lando: "Couldn’t see far — had to fight through it one move at a time.",
      fox: "The lantern cleared my sight, but the dead still came close."
    }
  },
  
  { speaker: "Voice", text: "Go to Clifton Observatory." },
{ action: "changeBg", bgKey: "cliftonBloodMoon" },
  
  {
    speaker: "hero",
    portrait: "default",
    textByCharacter: {
      eliza: "This is the core… I can feel it.",
      lando: "So this is the final stretch.",
      fox: "The source is near."
    }
  },
  {
    speaker: "Voice",
    text: "The final labyrinth awaits."
  },
  {
    speaker: "Voice",
    text: "Warping circles lie within the maze."
  },
  {
    speaker: "Voice",
    text: "Step into one, and space will throw you elsewhere."
  },
  {
    speaker: "Voice",
    text: "Find the Key and the Lock first."
  },
  {
    speaker: "Voice",
    text: "Then face the Devourer."
  },
  {
    speaker: "Voice",
    text: "Only with them can the curse be sealed."
  }
];

let ending_scene = [
  { speaker: "Eliza", 
   portrait: "Eliza_smile",
   text: "The mist is lifting."
},
  { speaker: "Lando", 
   portrait: "Lando_default",
   text: "Clean run. We made it." 
  },
  { speaker: "fox", 
   portrait: "fox_smile",
   text: "Bristol breathes again." 
  },

  { speaker: "Voice", text: "The labyrinth collapses." },
  { speaker: "Voice", text: "The curse is sealed once more." },

  
  { speaker: "Eliza", 
   portrait: "Eliza_talking",
   text: "That presence… I know it." 
  },
  { speaker: "Lando", 
   portrait: "Lando_default",
   text: "You finally decided to show up." 
  },
  { speaker: "fox", 
    portrait: "fox_default",
    text: "You wear a borrowed shape." 
  },
  
  

  { speaker: "BanksyGirl", text: "A shape, nothing more." },
  { speaker: "BanksyGirl", text: "I simply prefer this one." },
  { speaker: "BanksyGirl", text: "Do not mistake it for what I am." },

  { speaker: "Eliza", 
   portrait: "Eliza_talking",
   text: "You guided Bristol before." 
  },
  
  { speaker: "BanksyGirl", text: "When the mist first rose." },
  { speaker: "BanksyGirl", text: "And now, you have done the same." },

  { speaker: "Lando", 
   portrait: "Lando_default",
   text: "Not bad for three people lost in time." 
  },
  {speaker: "fox",
   portrait: "fox_default",
  text: "Three?"
  },
  {speaker: "Eliza",
   portrait: "Eliza_smile",
  text: "Still counts."
  },
  { speaker: "fox", 
    portrait: "fox_default",
   text: "Lost… but not alone." 
  },
  { speaker: "Eliza", 
    portrait: "Eliza_default",
   text: "Then this city remembers us." 
  },

  { speaker: "BanksyGirl", text: "For a while." },
  { speaker: "BanksyGirl", text: "Now return to your time." },

  { speaker: "Eliza", 
   portrait: "Eliza_smile",
   text: "I’ll remember." 
  },
  { speaker: "Lando", 
   portrait: "Lando_default",
   text: "See you on another line." 
  },
  { speaker: "fox", 
    portrait: "fox_default",
   text: "The wind carries us apart." 
  },

  { speaker: "BanksyGirl", text: "Farewell." }
]; 


function preload() {
  audioPreload();
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
  confirmButtonImg = loadImage("assets/ui/confirm.png");
  
  backgrounds.cathedralInterior = loadImage("assets/background/cathedral_interior.png");
backgrounds.wayToLibrary = loadImage("assets/background/way_to_library.png");
backgrounds.libraryInterior = loadImage("assets/background/library_interior.png");
backgrounds.cliftonBloodMoon = loadImage("assets/background/clifton_observatory_blood_moon.png");
backgrounds.victory = loadImage("assets/background/Victory.png");

voiceGirlImg = loadImage("assets/voice/voice_girl.png");
voiceBalloonImg = loadImage("assets/voice/voice_girl_ballon.png");
  
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

  startBGM("opening", 0.05);
  handleStoryEntry();

  if (DEBUG_MODE) {
    selectedCharacter = DEBUG_CHARACTER;
    startCutscene(scene_church, "level1", "cathedralInterior");
  }
}

function handleStoryEntry() {
  const params = new URLSearchParams(window.location.search);
  const scene = params.get("scene");

  if (scene === "after1") {
    selectedCharacter = localStorage.getItem("selectedCharacterId") || "fox";
    unlockAudio();
    startBGM("cutscene2", 0.06);
    startCutscene(scene_after_maze1, "level2.html", "wayToLibrary");
    return;
  }

  if (scene === "after2") {
    selectedCharacter = localStorage.getItem("selectedCharacterId") || "fox";
    unlockAudio();
    startBGM("cutscene3", 0.06);
    startCutscene(scene_after_maze2, "level3.html", "libraryInterior");
    return;
  }

  if (scene === "ending") {
    selectedCharacter = localStorage.getItem("selectedCharacterId") || "fox";
    unlockAudio();
    startBGM("ending", 0.06);
    startCutscene(ending_scene, "main_menu.html", "victory");
    return;
  }

  if (FORCE_OPENING) {
    localStorage.removeItem("openingSeen");
    gameState = "story";
    currentLine = 0;
    visibleChars = 0;
    lineFullyShown = false;
    return;
  }

  if (localStorage.getItem("openingSeen") === "true") {
    window.location.href = "main_menu.html";
  }
}

function draw() {
  drawBackgroundScene();

  if (gameState === "story") {
    drawStoryMode();
  } else if (gameState === "select") {
    drawCharacterSelect();
  } else if (gameState === "cutscene") {
    drawCutsceneMode();
  } else if (gameState === "level1") {
    drawPlaceholderLevel("LEVEL 1");
  } else if (gameState === "level2") {
    drawPlaceholderLevel("LEVEL 2");
  } else if (gameState === "level3") {
    drawPlaceholderLevel("LEVEL 3");
  } else if (gameState === "credits") {
    drawPlaceholderLevel("THE END");
  }

  drawFadeIn();
  drawTransition();
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

//cut scene

function startCutscene(storyArray, nextState, bgKey) {
  currentStory = storyArray;
  currentStoryNextState = nextState;
  currentLine = 0;
  visibleChars = 0;
  lineFullyShown = false;
  fadeAlpha = 255;
  currentBgKey = bgKey;
  gameState = "cutscene";
}

function drawCutsceneMode() {
  let isEnding = currentStory === ending_scene;

  if (!isEnding) {
    drawFog("back");
  }

  if (isEnding) {
    drawEndingCharacters();
  } else {
    drawCutsceneCharacter();
  }

  if (!isEnding) {
    drawFog("front");
  }

  let line = currentStory[currentLine];

  updateTyping(getLineText(line));
  drawDialogueBoxForCutscene(line);

  // Banksy Girl 要在对话框之后画，才不会被对话框遮住
  if (line.speaker === "BanksyGirl") {
    drawBanksyGirl();
  }

  drawContinueHint();

  if (fadeAlpha > 0) {
    fadeAlpha -= 6;
  }
}
function drawEndingCharacters() {
  drawEndingPortrait("Eliza", "Eliza_default", width * 0.22, height - 100, 540);
  drawEndingPortrait("Lando", "Lando_default", width * 0.50, height - 100, 560);
  drawEndingPortrait("fox", "fox_default", width * 0.78, height - 100, 460);

  let line = currentStory[currentLine];

  
}

function drawEndingPortrait(key, defaultPortraitKey, x, bottomY, h) {
  let line = currentStory[currentLine];

  let portraitKey = defaultPortraitKey;

  if (line.speaker === key && line.portrait) {
    portraitKey = line.portrait;
  }

  let img = portraits[portraitKey];
  if (!img) return;

  let ratio = img.width / img.height;
  let w = h * ratio;

  push();
  imageMode(CENTER);

  let active = line.speaker === key;

  if (active) {
    tint(255, 255);
  } else {
    tint(130, 165);
  }

  image(img, x, bottomY - h / 2, w, h);
  noTint();
  pop();
}
function getLineText(line) {
  if (line.textByCharacter && selectedCharacter) {
    return line.textByCharacter[selectedCharacter];
  }
  return line.text;
}

function getSpeakerName(line) {
  if (line.speaker === "hero") {
    if (selectedCharacter === "eliza") return "Eliza";
    if (selectedCharacter === "lando") return "Lando";
    if (selectedCharacter === "fox") return "Fox";
  }

  if (line.speaker === "BanksyGirl") return "Banksy Girl";
  if (line.speaker === "Voice") return "Voice";

  return line.speaker;
}

function getHeroPortrait(expression) {
  if (selectedCharacter === "eliza") {
    if (expression === "smile") return "Eliza_smile";
    if (expression === "talking") return "Eliza_talking";
    return "Eliza_default";
  }

  if (selectedCharacter === "lando") {
    if (expression === "determined") return "Lando_determination";
    return "Lando_default";
  }

  if (selectedCharacter === "fox") {
    if (expression === "smile") return "fox_smile";
    if (expression === "worry") return "fox_worry";
    return "fox_default";
  }

  return null;
}

function drawCutsceneCharacter() {
  if (!currentStory) return;

  let line = currentStory[currentLine];

  if (line.speaker === "BanksyGirl") {
    drawBanksyGirl();
    return;
  }

  if (line.speaker !== "hero") return;

 let expression = line.portrait || "default";

if (line.portraitByCharacter && selectedCharacter) {
  expression = line.portraitByCharacter[selectedCharacter] || "default";
}

let portraitKey = getHeroPortrait(expression);
  let img = portraits[portraitKey];
  if (!img) return;

  let imgRatio = img.width / img.height;
  let drawH = selectedCharacter === "fox" ? 460 : 560;
  let drawW = drawH * imgRatio;

  let drawX = width * 0.5;
  let drawY = height - 100 - drawH / 2;

  push();
  imageMode(CENTER);
  tint(255, 255);
  image(img, drawX, drawY, drawW, drawH);
  noTint();
  pop();
}

function drawBanksyGirl() {
  if (!voiceGirlImg) return;

  push();
  imageMode(CORNER);

  // 叠在对话框左上角
  let x = 90;
  let y = height - 385;
  let h = 320;

  let ratio = voiceGirlImg.width / voiceGirlImg.height;
  let w = h * ratio;

  tint(255, 255);
  image(voiceGirlImg, x, y, w, h);

  if (voiceBalloonImg) {
    image(voiceBalloonImg, x + 125, y + 60, 60, 75);
  }

  noTint();
  pop();
}
function drawDialogueBoxForCutscene(line) {
  let fakeLine = {
    speaker: line.speaker === "Voice" || line.speaker === "BanksyGirl" ? "narrator" : line.speaker,
    name: getSpeakerName(line),
    text: getLineText(line)
  };

  drawDialogueBox(fakeLine);
}

function drawPlaceholderLevel(label) {
  push();

  fill(0, 190);
  rect(0, 0, width, height);

  fill(255, 232, 170);
  textFont("Cinzel");
  textSize(56);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2 - 40);

  textFont("Cormorant Garamond");
  textSize(28);
  fill(230);
  text("Press N to continue testing", width / 2, height / 2 + 30);

  pop();
}

// ===== Background =====
function drawBackgroundScene() {
  background(14);

  let currentBg = bgImg;

  if (currentBgKey && backgrounds[currentBgKey]) {
    currentBg = backgrounds[currentBgKey];
  }

  if (currentBg) {
    image(currentBg, 0, 0, width, height);
  }

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
    startBGM("select", 0.06);
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

//cutscene transition

function startTransitionToPage(url) {
  transitionTargetUrl = url;
  transitionAlpha = 0;
  isTransitioning = true;
}

function drawTransition() {
  if (!isTransitioning) return;

  transitionAlpha += 3;
  let t = transitionAlpha / 255;

  push();
  noStroke();

  // subtle darkening
  fill(0, 200 * t);
  rect(0, 0, width, height);

  // bottom black mist
  fill(0, 120 * t);
  beginShape();
  vertex(0, height);

  for (let x = 0; x <= width; x += 60) {
    let wave = sin(frameCount * 0.035 + x * 0.01) * 18;
    let y = height - t * height * 0.78 + wave;
    vertex(x, y);
  }

  vertex(width, height);
  endShape(CLOSE);

  // soft vignette layers
  for (let i = 0; i < 10; i++) {
    fill(0, 10 * t);
    rect(i * 10, i * 10, width - i * 20, height - i * 20, 28);
  }

  pop();

if (transitionAlpha >= 255) {
  isTransitioning = false;

  if (transitionTargetUrl) {
    window.location.href = transitionTargetUrl;
  } else if (transitionTargetState) {
    gameState = transitionTargetState;
    transitionTargetState = null;
  }

  transitionAlpha = 0;
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
  text("Click to select", width / 2, height - 130);

  fill(255, 232, 170, glow);
  text("Click to select", width / 2, height - 130);

  pop();
  
  let btnW = 260;
  let btnH = 56;
  let btnX = width / 2;
  let btnY = height - 50;

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

  } else if (gameState === "cutscene") {
  let fullText = getLineText(currentStory[currentLine]);

  if (!lineFullyShown) {
    visibleChars = fullText.length;
    lineFullyShown = true;
  } else {
    currentLine++;

    while (currentLine < currentStory.length && currentStory[currentLine].action) {
      let actionLine = currentStory[currentLine];

      if (actionLine.action === "changeBg") {
        currentBgKey = actionLine.bgKey;
        fadeAlpha = 255;
      }

      currentLine++;
    }

    if (currentLine >= currentStory.length) {
      currentLine = currentStory.length - 1;
      visibleChars = getLineText(currentStory[currentLine]).length;
      lineFullyShown = true;

      startTransitionToState(currentStoryNextState);
      return;
    }

    visibleChars = 0;
    lineFullyShown = false;
  }
}
}

function keyPressed() {
  if (gameState === "story" || gameState === "cutscene") {
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
      //window.location.href = "level1.html";
      startBGM("cutscene1", 0.06);
      startCutscene(scene_church, "level1.html", "cathedralInterior");
    }
  }
  
  if (key === 'n' || key === 'N') {
    if (gameState === "level1") {
      startBGM("cutscene2", 0.06);
      startCutscene(scene_after_maze1, "level2.html", "wayToLibrary");
    } else if (gameState === "level2") {
      startBGM("cutscene3", 0.06);
      startCutscene(scene_after_maze2, "level3.html", "libraryInterior");
    } else if (gameState === "level3") {
      startBGM("ending", 0.06);
      startCutscene(ending_scene, "main_menu.html", "victory");
    }
  }
}

function startTransitionToState(nextState) {
  transitionAlpha = 0;
  isTransitioning = true;

  if (typeof nextState === "string" && nextState.endsWith(".html")) {
    transitionTargetUrl = nextState;
    transitionTargetState = null;
  } else {
    transitionTargetUrl = null;
    transitionTargetState = nextState;
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

  if (gameState === "story" || gameState === "cutscene") {
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

      startBGM("cutscene1", 0.06);
      startCutscene(scene_church, "level1.html", "cathedralInterior");
    }
  }
}

function drawGoldButton(cx, cy, w, h, label, hovering, enabled = true) {
  push();
  imageMode(CENTER);

  if (confirmButtonImg) {
    if (!enabled) {
      tint(130, 130);
    } else if (hovering) {
      tint(255, 255);
    } else {
      tint(255, 225);
    }

    image(confirmButtonImg, cx, cy, w, h);
    noTint();
  }

  noStroke();
  textFont("Cinzel");
  textSize(24);
  textAlign(CENTER, CENTER);

  if (enabled) {
    fill(255, 232, 170);
  } else {
    fill(165, 145, 115);
  }

  text(label, cx, cy + 1);

  pop();
}