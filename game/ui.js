// ==================== 共用 UI 系统 / Shared UI System ====================
let menuImg;

// ===== 菜单按钮状态 =====
let menuBtnScale = 1.0;
let menuBtnTargetScale = 1.0;
let menuBtnSize = 35;
let menuBtnPadding = 15;
let menuOpen = false;

// 菜单面板淡入淡出
let menuPanelAlpha = 0;
let menuPanelTargetAlpha = 0;

let _menuBtns = [];
let _lastMenuBtns = [];

const UI_FONT = 'Georgia';
const UI_TITLE_COLOR = [248, 232, 190];
const UI_TEXT_COLOR = [232, 200, 145];
const UI_LINE_COLOR = [190, 145, 70];

// ==================== 预加载 ====================
function uiPreload() {
    menuImg = loadImage('assets/menu.png');
}

// ==================== 菜单按钮绘制 ====================
function drawMenuButton() {
    menuBtnScale += (menuBtnTargetScale - menuBtnScale) * 0.25;

    let bx = width - menuBtnPadding - menuBtnSize / 2;
    let by = menuBtnPadding + menuBtnSize / 2;

    push();
    imageMode(CENTER);
    translate(bx, by);
    scale(menuBtnScale);

    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'rgba(0,0,0,0)';

    if (menuImg) {
        image(menuImg, 0, 0, menuBtnSize, menuBtnSize);
    } else {
        noStroke();
        fill(220, 180, 80);
        rect(-18, -8, 36, 5, 3);
        rect(-18, -1, 36, 5, 3);
        rect(-18, 6, 36, 5, 3);
    }

    pop();
}

// ==================== 菜单面板 ====================
function drawMenuPanel() {
    menuPanelAlpha += (menuPanelTargetAlpha - menuPanelAlpha) * 0.18;
    if (menuPanelAlpha < 2) return;

    let panelW = 240;
    let panelH = 160;
    let panelX = width - menuBtnPadding - panelW;
    let panelY = menuBtnPadding + menuBtnSize + 8;

    drawWindowBox(panelX, panelY, panelW, panelH, menuPanelAlpha / 255);

    push();
    textFont(UI_FONT);
    textAlign(CENTER, TOP);
    noStroke();

    fill(245, 225, 175, menuPanelAlpha);
    textSize(19);
    textStyle(BOLD);
    text('Menu', panelX + panelW / 2, panelY + 28);
    textStyle(NORMAL);

    stroke(210, 165, 80, menuPanelAlpha * 0.8);
    strokeWeight(1);
    line(panelX + 42, panelY + 58, panelX + panelW - 42, panelY + 58);
    noStroke();

    let btnX = panelX + 34;
    let btnY = panelY + 74;
    let btnW = panelW - 68;
    let btnH = 30;

    drawMenuPanelBtn(btnX, btnY, btnW, btnH, 'Return to Main Menu', menuPanelAlpha, function () {
        returnToMainMenu();
    });

    drawMenuPanelBtn(btnX, btnY + 42, btnW, btnH, 'Resume', menuPanelAlpha, function () {
        closeMenuPanel();
    });

    pop();
}

function drawMenuPanelBtn(x, y, w, h, label, alpha, callback) {
    let hovered = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;

    push();

    drawingContext.shadowBlur = hovered ? 10 : 4;
    drawingContext.shadowColor = hovered
        ? `rgba(245, 190, 90, ${alpha / 255})`
        : `rgba(0, 0, 0, ${0.35 * alpha / 255})`;

    noStroke();
    fill(hovered ? color(155, 100, 35, alpha * 0.95) : color(70, 42, 20, alpha * 0.9));
    rect(x, y, w, h, 7);

    drawingContext.shadowBlur = 0;

    stroke(230, 180, 85, alpha * 0.9);
    strokeWeight(1);
    noFill();
    rect(x + 1, y + 1, w - 2, h - 2, 7);

    stroke(95, 55, 20, alpha * 0.9);
    rect(x + 3, y + 3, w - 6, h - 6, 5);

    noStroke();
    fill(248, 224, 168, alpha);
    textSize(12);
    textFont(UI_FONT);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);

    pop();

    if (!_menuBtns) _menuBtns = [];
    _menuBtns.push({ x, y, w, h, callback });
}

// ==================== 菜单开关 ====================
function toggleMenuPanel() {
    menuOpen = !menuOpen;
    menuPanelTargetAlpha = menuOpen ? 255 : 0;

    menuBtnTargetScale = 0.82;
    setTimeout(() => {
        menuBtnTargetScale = 1.0;
    }, 120);

    if (menuOpen && typeof pause !== 'undefined') {
        pause = true;
    }
}

function closeMenuPanel() {
    menuOpen = false;
    menuPanelTargetAlpha = 0;

    if (typeof pause !== 'undefined') {
        pause = false;
    }
}

function returnToMainMenu() {
    closeMenuPanel();

    if (typeof resetGame === 'function') {
        resetGame();
    }

    if (typeof start !== 'undefined') start = true;
    if (typeof pause !== 'undefined') pause = true;
}

// ==================== 点击检测 ====================
function uiMousePressed() {
    let bx = width - menuBtnPadding - menuBtnSize / 2;
    let by = menuBtnPadding + menuBtnSize / 2;
    let half = menuBtnSize / 2 + 4;

    if (
        mouseX > bx - half &&
        mouseX < bx + half &&
        mouseY > by - half &&
        mouseY < by + half
    ) {
        toggleMenuPanel();
        return true;
    }

    if (menuOpen) {
        for (let btn of _lastMenuBtns) {
            if (
                mouseX > btn.x &&
                mouseX < btn.x + btn.w &&
                mouseY > btn.y &&
                mouseY < btn.y + btn.h
            ) {
                btn.callback();
                return true;
            }
        }

        let panelW = 240;
        let panelH = 160;
        let panelX = width - menuBtnPadding - panelW;
        let panelY = menuBtnPadding + menuBtnSize + 8;

        if (
            mouseX < panelX ||
            mouseX > panelX + panelW ||
            mouseY < panelY ||
            mouseY > panelY + panelH
        ) {
            closeMenuPanel();
            return true;
        }
    }

    return false;
}

function uiEndFrame() {
    _lastMenuBtns = [..._menuBtns];
    _menuBtns = [];
}

// ==================== I 键开关 ====================
function uiKeyPressed() {
    if (keyCode === 73) {
        toggleMenuPanel();
        return true;
    }
    return false;
}

// ==================== 通用窗口绘制：纯代码金边棕色框 ====================
function drawWindowBox(x, y, w, h, alphaRatio = 1.0) {
    push();

    let a = constrain(alphaRatio, 0, 1);

    // ===== 背景（更克制，不要塑料感）=====
    noStroke();
    fill(48, 28, 16, 230 * a);
    rect(x, y, w, h);

    // ===== 内部轻微层次 =====
    fill(62, 38, 20, 160 * a);
    rect(x + 6, y + 6, w - 12, h - 12);

    // ===== 外细金边（第一层）=====
    stroke(210, 170, 90, 220 * a);
    strokeWeight(1);
    noFill();
    rect(x + 0.5, y + 0.5, w - 1, h - 1);

    // ===== 第二层更亮的金线 =====
    stroke(255, 220, 140, 120 * a);
    rect(x + 2.5, y + 2.5, w - 5, h - 5);

    // ===== 内收深边（增加锐度）=====
    stroke(90, 55, 25, 200 * a);
    rect(x + 5.5, y + 5.5, w - 11, h - 11);

    // ===== 最内细线 =====
    stroke(200, 160, 80, 90 * a);
    rect(x + 8.5, y + 8.5, w - 17, h - 17);

    // ===== 尖角装饰（关键！！）=====
    drawSharpCorner(x, y, w, h, a);

    pop();
}

function drawSharpCorner(x, y, w, h, a) {
    push();

    stroke(230, 185, 95, 200 * a);
    strokeWeight(1);

    let s = 12; // 尖角长度

    // 左上
    line(x, y, x + s, y);
    line(x, y, x, y + s);

    // 右上
    line(x + w, y, x + w - s, y);
    line(x + w, y, x + w, y + s);

    // 左下
    line(x, y + h, x + s, y + h);
    line(x, y + h, x, y + h - s);

    // 右下
    line(x + w, y + h, x + w - s, y + h);
    line(x + w, y + h, x + w, y + h - s);

    // ===== 内侧斜切（让它“尖”）=====
    stroke(255, 220, 140, 140 * a);

    line(x + 2, y + 2, x + 8, y + 2);
    line(x + 2, y + 2, x + 2, y + 8);

    line(x + w - 2, y + 2, x + w - 8, y + 2);
    line(x + w - 2, y + 2, x + w - 2, y + 8);

    line(x + 2, y + h - 2, x + 8, y + h - 2);
    line(x + 2, y + h - 2, x + 2, y + h - 8);

    line(x + w - 2, y + h - 2, x + w - 8, y + h - 2);
    line(x + w - 2, y + h - 2, x + w - 2, y + h - 8);

    pop();
}

// ==================== 文本测量辅助 ====================
function getTextBoxSize(title, lines, titleSize = 20, textSizeValue = 14) {
    push();
    textFont(UI_FONT);

    let maxW = 0;

    textSize(titleSize);
    textStyle(BOLD);
    maxW = max(maxW, textWidth(title));

    textStyle(NORMAL);
    textSize(textSizeValue);
    for (let line of lines) {
        maxW = max(maxW, textWidth(line));
    }

    pop();

    let paddingX = 88;
    let paddingY = 88;
    let lineGap = 24;

    let boxW = constrain(maxW + paddingX, 280, width - 80);
    let boxH = paddingY + lines.length * lineGap + 34;

    return { w: boxW, h: boxH };
}

// ==================== 普通提示弹窗：自适应内容 ====================
function drawUnifiedPopUp(title, message, alpha = 255) {
    let lines = message.split('\n');

    let size = getTextBoxSize(title, lines, 20, 14);
    let boxW = size.w;
    let boxH = size.h;

    let boxX = width / 2 - boxW / 2;
    let boxY = 58;

    drawWindowBox(boxX, boxY, boxW, boxH, alpha / 255);

    push();
    textFont(UI_FONT);
    textAlign(CENTER, TOP);
    noStroke();

    fill(248, 232, 190, alpha);
    textSize(20);
    textStyle(BOLD);
    text(title, width / 2, boxY + 30);
    textStyle(NORMAL);

    stroke(220, 170, 80, alpha * 0.75);
    strokeWeight(1);
    line(boxX + 46, boxY + 62, boxX + boxW - 46, boxY + 62);
    noStroke();

    fill(232, 200, 145, alpha);
    textSize(14);

    for (let i = 0; i < lines.length; i++) {
        text(lines[i], width / 2, boxY + 78 + i * 24);
    }

    pop();
}

// ==================== 统一状态屏幕：自适应内容 ====================
function drawUnifiedScreen(type, title, lines, blinkText, blinkState) {
    let allLines = [...lines];
    if (blinkText) allLines.push(blinkText);

    let size = getTextBoxSize(title, allLines, 22, 15);

    let boxW = max(size.w, 390);
    let boxH = 130 + lines.length * 28 + 42;

    let boxX = width / 2 - boxW / 2;
    let boxY = height / 2 - boxH / 2;

    drawWindowBox(boxX, boxY, boxW, boxH);

    push();
    textFont(UI_FONT);
    textAlign(CENTER, TOP);
    noStroke();

    let accentColor;
    if      (type === 'end')      accentColor = color(55, 95, 55, 185);
    else if (type === 'gameover') accentColor = color(105, 35, 35, 190);
    else if (type === 'pause')    accentColor = color(45, 60, 90, 185);
    else                          accentColor = color(95, 65, 28, 190);

    fill(accentColor);
    rect(boxX + 46, boxY + 44, boxW - 92, 42, 8);

    stroke(235, 185, 90, 130);
    strokeWeight(1);
    noFill();
    rect(boxX + 49, boxY + 47, boxW - 98, 36, 6);

    noStroke();
    fill(248, 232, 190);
    textSize(22);
    textStyle(BOLD);
    text(title, width / 2, boxY + 51);
    textStyle(NORMAL);

    stroke(215, 165, 80, 160);
    strokeWeight(1);
    line(boxX + 50, boxY + 100, boxX + boxW - 50, boxY + 100);
    noStroke();

    fill(232, 200, 150);
    textSize(15);

    for (let i = 0; i < lines.length; i++) {
        text(lines[i], width / 2, boxY + 116 + i * 26);
    }

    if (blinkText && blinkState) {
        fill(245, 205, 120, 225);
        textSize(13);
        text(blinkText, width / 2, boxY + boxH - 45);
    }

    pop();
}

// ==================== instruction 专用框 ====================
function drawInstructionBox(x, y, w, h) {
    drawWindowBox(x, y, w, h);
}

// ==================== 暂停界面 ====================
function drawPause_shared() {
    let blink = floor(gTime * 3) % 2 === 1;

    drawUnifiedScreen(
        'pause',
        'Paused',
        ['The mist holds its breath...'],
        'Press P to resume',
        blink
    );
}