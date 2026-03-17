// ==================== 商城数据 / Shop Data ====================
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
]

// ==================== 全局变量 / Globals ====================
let coins = 0
let ownedGunLevel = 1
let equippedGunLevel = 1

let selectedIndex = 0
let hoverIndex = -1
let rotationAngle = 0

let buyButtons = []
let equipButtons = []

let uiPulse = 0
let flashTimer = 0
let flashText = ""
let flashGood = true

let audioCtx = null

// 布局缓存 / Layout cache
let layout = null

// ==================== p5 入口 / p5 Entry ====================
function setup() {
  createCanvas(windowWidth, windowHeight)
  textFont('Arial')
  updateCanvasSize()

  initShopStorage()
  loadShopState()
  computeLayout()
}

function draw() {
  uiPulse += 0.03
  rotationAngle += 0.03
  if (flashTimer > 0) flashTimer--

  computeLayout()

  background(14, 18, 28)
  drawBackgroundGlow()
  drawTitleBar()
  drawInstructions()
  drawWeaponCards()
  drawPreviewPanel()
  drawBottomStatus()
  drawFlashMessage()
}

function windowResized() {
  updateCanvasSize()
  computeLayout()
}

// ==================== 初始化 / Init ====================
function initShopStorage() {
  if (localStorage.getItem("gameCoins") === null) {
    localStorage.setItem("gameCoins", "0")
  }
  if (localStorage.getItem("ownedGunLevel") === null) {
    localStorage.setItem("ownedGunLevel", "1")
  }
  if (localStorage.getItem("shopGunLevel") === null) {
    localStorage.setItem("shopGunLevel", "1")
  }
}

function loadShopState() {
  coins = Number(localStorage.getItem("gameCoins") || "0")
  ownedGunLevel = Number(localStorage.getItem("ownedGunLevel") || "1")
  equippedGunLevel = Number(localStorage.getItem("shopGunLevel") || "1")

  if (ownedGunLevel < 1) ownedGunLevel = 1
  if (equippedGunLevel < 1) equippedGunLevel = 1
  if (equippedGunLevel > ownedGunLevel) equippedGunLevel = ownedGunLevel
}

function saveShopState() {
  localStorage.setItem("gameCoins", String(coins))
  localStorage.setItem("ownedGunLevel", String(ownedGunLevel))
  localStorage.setItem("shopGunLevel", String(equippedGunLevel))
}

function updateCanvasSize() {
  const w = max(windowWidth, 920)
  const h = max(windowHeight, 700)
  resizeCanvas(w, h)
}

// ==================== 布局 / Layout ====================
function computeLayout() {
  const margin = clamp(width * 0.02, 16, 28)
  const titleH = clamp(height * 0.11, 82, 96)
  const infoH = clamp(height * 0.065, 48, 60)
  const gapY = 14
  const gapX = clamp(width * 0.018, 12, 20)

  const cardsY = margin + titleH + gapY + infoH + gapY
  const previewH = clamp(height * 0.24, 150, 190)
  const footerReserve = 28
  const availableForCards = height - cardsY - previewH - footerReserve - gapY - margin

  const cardsH = clamp(availableForCards, 230, 295)
  const cardW = floor((width - margin * 2 - gapX * 2) / 3)

  layout = {
    margin,
    titleH,
    infoH,
    gapY,
    gapX,
    cardsY,
    cardsH,
    cardW,
    previewY: cardsY + cardsH + gapY,
    previewH
  }
}

function getUIScale() {
  return min(width / 980, height / 720)
}

// ==================== 绘制主界面 / Main Drawing ====================
function drawBackgroundGlow() {
  noStroke()
  fill(40, 60, 100, 30)
  circle(width * 0.18, height * 0.18, min(width, height) * 0.36)
  fill(70, 40, 120, 28)
  circle(width * 0.82, height * 0.22, min(width, height) * 0.42)
  fill(30, 90, 90, 24)
  circle(width * 0.72, height * 0.82, min(width, height) * 0.35)
}

function drawTitleBar() {
  const m = layout.margin
  const h = layout.titleH
  drawPanel(m, m, width - m * 2, h)

  const s = getUIScale()

  fill(255)
  textAlign(LEFT, CENTER)
  textSize(clamp(28 * s, 22, 30))
  textStyle(BOLD)
  text("WEAPON SHOP", m + 18, m + h * 0.42)

  textStyle(NORMAL)
  textSize(clamp(14 * s, 12, 15))
  fill(200)
  text("Pure p5 shop demo", m + 20, m + h * 0.74)

  fill(255, 220, 120)
  textSize(clamp(18 * s, 14, 20))
  textAlign(RIGHT, CENTER)
  text(`Coins: £${coins}`, width - m - 18, m + h * 0.42)

  fill(180, 220, 255)
  textSize(clamp(14 * s, 11, 15))
  text(
    `Equipped: ${shopItems[equippedGunLevel - 1].name}`,
    width - m - 18,
    m + h * 0.74
  )
}

function drawInstructions() {
  const m = layout.margin
  const y = m + layout.titleH + layout.gapY
  const h = layout.infoH

  drawPanel(m, y, width - m * 2, h)

  fill(215)
  textAlign(LEFT, CENTER)
  textSize(clamp(14 * getUIScale(), 11, 15))
  text(
    "Mouse: hover / click    Keyboard: ← → select, B buy, E equip, 1/2/3 quick select",
    m + 18,
    y + h / 2
  )
}

function drawWeaponCards() {
  buyButtons = []
  equipButtons = []
  hoverIndex = -1

  for (let i = 0; i < shopItems.length; i++) {
    const x = layout.margin + i * (layout.cardW + layout.gapX)
    drawWeaponCard(i, x, layout.cardsY, layout.cardW, layout.cardsH)
  }
}

function drawWeaponCard(i, x, y, w, h) {
  let item = shopItems[i]
  let isSelected = selectedIndex === i

  let hoveringCard = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h
  if (hoveringCard) hoverIndex = i

  let hoverLift = hoveringCard ? -4 : 0
  let glow = isSelected ? 1 : 0
  if (hoveringCard) glow = max(glow, 0.7)

  const s = min(1, w / 290)
  const pad = 18 * s
  const iconSize = clamp(72 * s, 52, 72)
  const titleX = x + pad + iconSize + 14 * s
  const bodyLeft = x + pad
  const textWidth = w - pad * 2 - iconSize - 18 * s
  const smallText = clamp(14 * s, 11, 14)
  const titleText = clamp(22 * s, 16, 22)
  const descText = clamp(13 * s, 10, 13)
  const buttonH = clamp(34 * s, 28, 34)
  const buttonW = (w - pad * 2 - 12 * s) / 2

  push()
  translate(0, hoverLift)

  drawCardGlow(x, y, w, h, item.accent, glow)
  drawPanel(x, y, w, h)

  if (isSelected) {
    noFill()
    stroke(item.accent[0], item.accent[1], item.accent[2], 220)
    strokeWeight(2)
    rect(x + 2, y + 2, w - 4, h - 4, 14)
  }

  drawWeaponIcon(item, x + pad, y + pad, iconSize, iconSize)

  fill(255)
  textAlign(LEFT, TOP)
  textStyle(BOLD)
  textSize(titleText)
  drawFitText(item.name, titleX, y + pad - 2, textWidth, 1.2)

  textStyle(NORMAL)
  textSize(descText)
  fill(200)
  drawWrappedText(item.desc, titleX, y + pad + 28 * s, textWidth, 16 * s, 2)

  let tagText = ""
  let tagColor = [90, 90, 110]

  if (equippedGunLevel === item.level) {
    tagText = "EQUIPPED"
    tagColor = [40, 150, 90]
  } else if (ownedGunLevel >= item.level) {
    tagText = "OWNED"
    tagColor = [70, 100, 160]
  } else {
    tagText = `PRICE £${item.price}`
    tagColor = [130, 90, 40]
  }

  drawTag(
    tagText,
    titleX,
    y + pad + iconSize - 10 * s,
    tagColor,
    min(112 * s, textWidth)
  )

  fill(235)
  textAlign(LEFT, TOP)
  textSize(smallText)

  let statsY = y + pad + iconSize + 18 * s
  drawFitText(`Damage: ${item.damage}`, bodyLeft, statsY, w - pad * 2, 1.2)
  drawFitText(`Bullet Speed: ${item.speed}`, bodyLeft, statsY + 24 * s, w - pad * 2, 1.2)
  drawFitText(`Cooldown: ${item.cooldown}s`, bodyLeft, statsY + 48 * s, w - pad * 2, 1.2)

  let buyRect = {
    x: x + pad,
    y: y + h - pad - buttonH,
    w: buttonW,
    h: buttonH
  }

  let equipRect = {
    x: x + pad + buttonW + 12 * s,
    y: y + h - pad - buttonH,
    w: buttonW,
    h: buttonH
  }

  buyButtons.push(buyRect)
  equipButtons.push(equipRect)

  let canBuy = ownedGunLevel < item.level
  let canEquip = ownedGunLevel >= item.level && equippedGunLevel !== item.level

  drawButton(
    buyRect.x, buyRect.y, buyRect.w, buyRect.h,
    canBuy ? "Buy" : "Purchased",
    canBuy,
    mouseOverRect(buyRect.x, buyRect.y, buyRect.w, buyRect.h),
    [40, 110, 220]
  )

  drawButton(
    equipRect.x, equipRect.y, equipRect.w, equipRect.h,
    equippedGunLevel === item.level ? "Equipped" : "Equip",
    canEquip,
    mouseOverRect(equipRect.x, equipRect.y, equipRect.w, equipRect.h),
    [30, 150, 100]
  )

  pop()
}

function drawPreviewPanel() {
  const x = layout.margin
  const y = layout.previewY
  const w = width - layout.margin * 2
  const h = layout.previewH
  const s = getUIScale()

  drawPanel(x, y, w, h)

  let item = shopItems[selectedIndex]

  fill(255)
  textAlign(LEFT, TOP)
  textStyle(BOLD)
  textSize(clamp(22 * s, 18, 24))
  text("Preview", x + 18, y + 18)

  textStyle(NORMAL)
  textSize(clamp(14 * s, 11, 14))
  fill(200)
  text("Showcase model / pseudo-3D display", x + 18, y + 50)

  let showcaseX = x + min(245, w * 0.26)
  let showcaseY = y + h * 0.58

  push()
  noStroke()
  fill(0, 0, 0, 55)
  ellipse(showcaseX, showcaseY + 30, min(120, w * 0.12), 26)
  pop()

  push()
  noStroke()
  fill(255, 255, 255, 14)
  rect(showcaseX - 78, showcaseY + 18, 156, 10, 8)
  fill(180, 220, 255, 20)
  rect(showcaseX - 60, showcaseY + 6, 120, 8, 6)
  pop()

  push()
  translate(showcaseX, showcaseY)
  scale(clamp(s, 0.85, 1.15))
  drawGunShowcaseModel(item)
  pop()

  let infoX = x + min(420, w * 0.42)

  fill(235)
  textAlign(LEFT, TOP)
  textSize(clamp(16 * s, 13, 16))
  drawFitText(`Selected: ${item.name}`, infoX, y + 24, w - (infoX - x) - 20, 1.2)
  drawFitText(`Damage: ${item.damage}`, infoX, y + 52, w - (infoX - x) - 20, 1.2)
  drawFitText(`Bullet Speed: ${item.speed}`, infoX, y + 80, w - (infoX - x) - 20, 1.2)
  drawFitText(`Cooldown: ${item.cooldown}s`, infoX, y + 108, w - (infoX - x) - 20, 1.2)

  fill(180, 220, 255)
  textSize(clamp(14 * s, 11, 14))
  drawWrappedText(
    "Hint: after buying, equip it here.",
    infoX,
    y + 136,
    w - (infoX - x) - 24,
    16,
    2
  )
}

function drawBottomStatus() {
  if (hoverIndex !== -1) {
    let item = shopItems[hoverIndex]
    fill(255, 245, 200)
    textAlign(RIGHT, CENTER)
    textSize(clamp(14 * getUIScale(), 11, 14))
    text(`Hovering: ${item.name}`, width - layout.margin, height - 14)
  }
}

function drawFlashMessage() {
  if (flashTimer <= 0) return

  let alpha = map(flashTimer, 0, 60, 0, 220)
  noStroke()
  fill(flashGood ? color(40, 170, 90, alpha) : color(180, 70, 70, alpha))
  rect(width / 2 - min(170, width * 0.18), 112, min(340, width * 0.36), 40, 10)

  fill(255, alpha)
  textAlign(CENTER, CENTER)
  textSize(clamp(16 * getUIScale(), 12, 16))
  text(flashText, width / 2, 132)
}

// ==================== UI 小组件 / UI Components ====================
function drawPanel(x, y, w, h) {
  noStroke()
  fill(24, 30, 45, 235)
  rect(x, y, w, h, 14)

  fill(255, 255, 255, 10)
  rect(x + 2, y + 2, w - 4, min(20, h * 0.18), 12)
}

function drawCardGlow(x, y, w, h, accent, strength) {
  if (strength <= 0) return
  noStroke()
  fill(accent[0], accent[1], accent[2], 18 * strength)
  rect(x - 6, y - 6, w + 12, h + 12, 18)
}

function drawTag(label, x, y, c, tagW = 106) {
  noStroke()
  fill(c[0], c[1], c[2], 210)
  rect(x, y, tagW, 26, 999)

  fill(255)
  textAlign(CENTER, CENTER)
  textSize(clamp(12 * getUIScale(), 10, 12))
  text(label, x + tagW / 2, y + 13)
}

function drawButton(x, y, w, h, label, enabled, hovered, baseColor) {
  let c = enabled ? baseColor : [90, 95, 110]
  let brighten = hovered && enabled ? 25 : 0

  noStroke()
  fill(c[0] + brighten, c[1] + brighten, c[2] + brighten)
  rect(x, y, w, h, 10)

  fill(255, 255, 255, hovered ? 28 : 16)
  rect(x + 2, y + 2, w - 4, min(10, h * 0.35), 8)

  fill(255)
  textAlign(CENTER, CENTER)
  textSize(clamp(14 * getUIScale(), 11, 14))
  drawCenteredFitText(label, x + w / 2, y + h / 2, w - 10)
}

function drawWeaponIcon(item, x, y, w, h) {
  noStroke()
  fill(18, 22, 32)
  rect(x, y, w, h, 14)

  push()
  translate(x + w / 2, y + h / 2)
  scale(min(0.9, w / 80))
  drawGunModel(item, 0, 0, 0.9)
  pop()
}

function drawGunModel(item, x, y, s = 1) {
  push()
  translate(x, y)
  scale(s)

  let body = item.color
  let accent = item.accent

  noStroke()

  fill(body[0], body[1], body[2])
  rect(-36, -6, 52, 12, 4)
  rect(12, -4, 16, 8, 3)
  rect(-20, 6, 10, 20, 4)

  fill(accent[0], accent[1], accent[2])
  rect(-28, -10, 18, 5, 3)
  rect(-2, -3, 10, 6, 2)

  fill(255, 255, 255, 40)
  rect(-34, -4, 18, 3, 2)

  pop()
}

function drawGunShowcaseModel(item) {
  let body = item.color
  let accent = item.accent

  let yaw = sin(rotationAngle) * 0.9
  let bob = sin(rotationAngle * 1.4) * 4

  let bodyLen = 78 + cos(rotationAngle) * 10
  let barrelLen = 26 + cos(rotationAngle) * 6

  rotate(-0.28)
  translate(0, bob)

  noStroke()

  push()
  fill(0, 0, 0, 35)
  rect(-bodyLen * 0.55 + 3, -8 + 3, bodyLen, 16, 6)
  rect(bodyLen * 0.12 + 3, -5 + 3, barrelLen, 10, 4)
  rect(-18 + 3, 8 + 3, 14, 32, 6)
  pop()

  fill(body[0], body[1], body[2])
  rect(-bodyLen * 0.55, -8, bodyLen, 16, 6)
  rect(bodyLen * 0.12, -5, barrelLen, 10, 4)
  rect(-18, 8, 14, 32, 6)
  rect(-bodyLen * 0.55 - 12, -4, 16, 8, 4)

  fill(accent[0], accent[1], accent[2], 230)
  rect(-bodyLen * 0.38, -12, bodyLen * 0.34, 6, 4)
  rect(-4, -4, 14, 8, 3)

  fill(255, 255, 255, 60)
  rect(bodyLen * 0.18, -3, barrelLen * 0.45, 3, 2)

  fill(
    max(body[0] - 25, 0),
    max(body[1] - 25, 0),
    max(body[2] - 25, 0)
  )
  quad(
    -bodyLen * 0.55, 8,
    bodyLen * 0.45, 8,
    bodyLen * 0.45 + yaw * 7, 14,
    -bodyLen * 0.55 + yaw * 7, 14
  )

  quad(
    -18, 40,
    -4, 40,
    -4 + yaw * 3, 46,
    -18 + yaw * 3, 46
  )

  fill(255, 255, 255, 70)
  ellipse(-bodyLen * 0.08, -1, 10, 6)
}

// ==================== 文本工具 / Text Helpers ====================
function drawFitText(str, x, y, maxWidth, lineHeightFactor = 1.2) {
  let originalSize = textSize()
  let s = originalSize

  while (s > 9 && textWidth(str) > maxWidth) {
    s -= 0.5
    textSize(s)
  }

  text(str, x, y)
  textSize(originalSize)
}

function drawCenteredFitText(str, cx, cy, maxWidth) {
  let originalSize = textSize()
  let s = originalSize

  while (s > 9 && textWidth(str) > maxWidth) {
    s -= 0.5
    textSize(s)
  }

  text(str, cx, cy)
  textSize(originalSize)
}

function drawWrappedText(str, x, y, maxWidth, lineHeight = 16, maxLines = 2) {
  let words = str.split(' ')
  let lines = []
  let current = ""

  for (let w of words) {
    let test = current.length === 0 ? w : current + " " + w
    if (textWidth(test) <= maxWidth) {
      current = test
    } else {
      if (current.length > 0) lines.push(current)
      current = w
    }
  }
  if (current.length > 0) lines.push(current)

  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines)
    let last = lines[maxLines - 1]
    while (textWidth(last + "...") > maxWidth && last.length > 0) {
      last = last.slice(0, -1)
    }
    lines[maxLines - 1] = last + "..."
  }

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, y + i * lineHeight)
  }
}

// ==================== 交互 / Interaction ====================
function mousePressed() {
  ensureAudio()

  for (let i = 0; i < shopItems.length; i++) {
    if (mouseOverRect(buyButtons[i].x, buyButtons[i].y, buyButtons[i].w, buyButtons[i].h)) {
      selectedIndex = i
      tryBuy(i)
      return
    }

    if (mouseOverRect(equipButtons[i].x, equipButtons[i].y, equipButtons[i].w, equipButtons[i].h)) {
      selectedIndex = i
      tryEquip(i)
      return
    }
  }

  for (let i = 0; i < shopItems.length; i++) {
    const x = layout.margin + i * (layout.cardW + layout.gapX)
    if (mouseOverRect(x, layout.cardsY, layout.cardW, layout.cardsH)) {
      selectedIndex = i
      playHoverTone()
      return
    }
  }
}

function keyPressed() {
  ensureAudio()

  if (keyCode === LEFT_ARROW) {
    selectedIndex = max(0, selectedIndex - 1)
    playHoverTone()
  } else if (keyCode === RIGHT_ARROW) {
    selectedIndex = min(shopItems.length - 1, selectedIndex + 1)
    playHoverTone()
  } else if (key === 'b' || key === 'B') {
    tryBuy(selectedIndex)
  } else if (key === 'e' || key === 'E') {
    tryEquip(selectedIndex)
  } else if (key === '1') {
    selectedIndex = 0
    playHoverTone()
  } else if (key === '2') {
    selectedIndex = 1
    playHoverTone()
  } else if (key === '3') {
    selectedIndex = 2
    playHoverTone()
  }
}

function tryBuy(index) {
  let item = shopItems[index]

  if (ownedGunLevel >= item.level) {
    showFlash("Already purchased", false)
    playFailTone()
    return
  }

  if (coins < item.price) {
    showFlash("Not enough coins", false)
    playFailTone()
    return
  }

  coins -= item.price
  ownedGunLevel = item.level
  saveShopState()

  showFlash(`Purchased ${item.name}`, true)
  playBuyTone()
}

function tryEquip(index) {
  let item = shopItems[index]

  if (ownedGunLevel < item.level) {
    showFlash("Buy it first", false)
    playFailTone()
    return
  }

  if (equippedGunLevel === item.level) {
    showFlash("Already equipped", false)
    playHoverTone()
    return
  }

  equippedGunLevel = item.level
  saveShopState()

  showFlash(`Equipped ${item.name}`, true)
  playEquipTone()
}

function showFlash(msg, good) {
  flashText = msg
  flashGood = good
  flashTimer = 60
}

function mouseOverRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h
}

// ==================== 音效 / Audio ====================
function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume()
  }
}

function playTone(freq, duration, type = "sine", volume = 0.03) {
  if (!audioCtx) return

  let osc = audioCtx.createOscillator()
  let gain = audioCtx.createGain()

  osc.type = type
  osc.frequency.value = freq
  gain.gain.value = volume

  osc.connect(gain)
  gain.connect(audioCtx.destination)

  let now = audioCtx.currentTime
  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  osc.start(now)
  osc.stop(now + duration)
}

function playBuyTone() {
  playTone(520, 0.08, "triangle", 0.05)
  setTimeout(() => playTone(680, 0.10, "triangle", 0.05), 60)
}

function playEquipTone() {
  playTone(480, 0.07, "sine", 0.04)
  setTimeout(() => playTone(620, 0.09, "sine", 0.04), 50)
}

function playFailTone() {
  playTone(220, 0.10, "sawtooth", 0.04)
}

function playHoverTone() {
  playTone(360, 0.04, "square", 0.02)
}

// ==================== 工具 / Utils ====================
function clamp(v, minV, maxV) {
  return min(max(v, minV), maxV)
}
