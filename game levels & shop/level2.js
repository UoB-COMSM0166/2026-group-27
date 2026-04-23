// ==================== 游戏常量 / Game Constants ====================
const KEY_PAUSE = 80;
const KEY_M = 77;
const KEY_SPACE = 32;
const KEY_SHIFT = 16;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const blockSize = 32;
const miniMapScale = 3;
const mazeW = 16;
const mazeH = 16;
const timeLimit = 5;

const playerSpeed = 120;
const enemyCount = 8;

// 迷雾亮度 / Fog
const fogRadiusWithLight = 165;

// 武器配置 / Weapon configs
const weaponConfigs = {
    crossbow: {
        name: "Crossbow",
        damage: 10,
        projectileSpeed: 320,
        cooldown: 0.22
    },
    ring: {
        name: "Magic Ring",
        damage: 10,
        projectileSpeed: 320,
        cooldown: 0.22
    }
};

// 图鉴存储键 / Codex storage key
const ITEM_CODEX_KEY = "itemCodex";

// ==================== 游戏变量 / Game Variables ====================
let worldWidth = 0;
let worldHeight = 0;
let gTime = 0;
let elapsedTime = 0;
let lastKeyPress = null;
let pause = true;
let gameover = false;
let start = true;
let end = false;
let moving = false;
let showInstructions = false;

// ==================== 游戏对象 / Game Objects ====================
let mazeMap;
let cam;
let wall = [];
let terrain = [];
let player;
let dir = 0;

let box;
let lightItem;
let ringItem;
let exitDoor;

let projectiles = [];
let enemies = [];

let mazeLayer;
let fogLayer;

// ==================== 状态 / States ====================
let hasMiniMap = false;
let hasLight = false;
let hasRing = false;

// 第二关默认已拥有弩箭 / Level 2 starts with crossbow
let hasCrossbow = true;
let currentWeapon = "crossbow";
let currentWeaponStats = weaponConfigs.crossbow;

let showMiniMap = true;
let attackCooldownTimer = 0;

let smallKillCount = 0;

let endTimePopUp = 0;
let popUpTitle = '';
let popUpMessage = '';
let gameoverMsg = '';

// ==================== 图片素材 / Image Assets ====================
let floorPlain01Img;
let floorPlain03Img;
let floorPlain04Img;
let floorCrackedGlowImg;
let wallImg;

let lightImg;
let ringImg;
let littleGhostImg;
let boxImg;

// ==================== 预加载 / Preload ====================
function preload() {
    // 地板 / Floor
    floorPlain01Img = loadImage('assets/floor_plain_01.png');
    floorPlain03Img = loadImage('assets/floor_plain_03.png');
    floorPlain04Img = loadImage('assets/floor_plain_04.png');
    floorCrackedGlowImg = loadImage('assets/floor_cracked_glow.png');

    // 墙 / Wall
    wallImg = loadImage('assets/wall_column_tall.png');

    // 道具 / Items
    boxImg = loadImage('assets/box.png');
    lightImg = loadImage('assets/light.png');
    ringImg = loadImage('assets/ring.png');

    // 敌人 / Enemy
    littleGhostImg = loadImage('assets/little ghost.png');

    // 人物四视图 / Character sprites from shared renderer
    preloadSelectedCharacterSprites();
}

// ==================== p5 入口 / p5 Entry ====================
function setup() {
    createCanvas(800, 600);

    // 第二关默认图鉴里有弩箭
    unlockCodexItem('crossbow');

    currentWeapon = "crossbow";
    currentWeaponStats = weaponConfigs[currentWeapon];

    mazeMap = new Maze(mazeW, mazeH, 'random', 1, 1);
    player = new Rect(32, 32, 32, 48, true);
    cam = new Camera();

    setMap();
    buildMazeLayer();

    fogLayer = createGraphics(width, height);

    createBox();
    createLight();
    createRing();
    createExitDoor();
    createEnemies();

    cam.focus(player.left, player.top);
}

function draw() {
    let dt = deltaTime / 1000;
    if (dt > 1) dt = 0;

    act(dt);
    drawGame();
}

// ==================== 游戏主流程 / Main Game Flow ====================
function drawGame() {
    background(0);

    drawMaze();
    drawDoor(exitDoor.left - cam.x, exitDoor.top - cam.y);

    if (!hasMiniMap) {
        drawBox(box.left - cam.x, box.top - cam.y);
    }

    if (!hasLight && hasMiniMap) {
        drawLightPickup(lightItem.left - cam.x, lightItem.top - cam.y);
    }

    if (!hasRing && hasMiniMap) {
        drawRingPickup(ringItem.left - cam.x, ringItem.top - cam.y);
    }

    for (let e of enemies) {
        e.draw();
    }

    for (let p of projectiles) {
        p.draw();
    }

    drawPlayer();
    drawFog();

    if (endTimePopUp > elapsedTime) drawPopUp();

    if (hasMiniMap && showMiniMap) drawMiniMap();

    if (pause) {
        if (start) drawStart();
        else if (end) drawEnd();
        else if (gameover) drawGameOver();
        else drawPause();
    }

    if (showInstructions) {
        drawInformation();
    }

    drawElapsedTime();
    drawHud();
    
}



function act(dt) {
    gTime += dt;
    if (attackCooldownTimer > 0) attackCooldownTimer -= dt;

    if (showInstructions) return;

    if (!pause) {
        if (elapsedTime > timeLimit * 60) {
            gameover = true;
            gameoverMsg = "You have run out of time!";
            pause = true;
            return;
        }

        elapsedTime += dt;

        handlePlayerMovement(dt);
        handlePickupsAndGoal();
        updateProjectiles(dt);
        updateEnemies(dt);

        cam.focus(player.left, player.top);
    }
}

// ==================== 输入 / Input ====================
function keyPressed() {
    lastKeyPress = keyCode;

    // 开始游戏：先显示说明
    if (keyCode === ENTER && start) {
        pause = false;
        start = false;
        showInstructions = true;
        return;
    }

    // 关闭说明
    if (keyCode === ENTER && showInstructions) {
        showInstructions = false;
        return;
    }

    if (!start && !showInstructions && keyCode === KEY_PAUSE) {
        pause = !pause;
    }

    if (keyCode === ESCAPE && (end || gameover)) {
        resetGame();
    }

    if (keyCode === KEY_M) {
        showMiniMap = !showMiniMap;
    }

    if (keyCode === KEY_SPACE && hasCrossbow && !pause && !showInstructions) {
        shootProjectile();
    }

    if (keyCode === KEY_SHIFT && hasRing && !pause && !showInstructions) {
        toggleWeapon();
    }
}

function keyReleased() {
    moving = false;
}

// ==================== 玩家移动 / Player Movement ====================
function handlePlayerMovement(dt) {
    moving = false;

    let moveUp = keyIsDown(UP_ARROW) || keyIsDown(KEY_W);
    let moveRight = keyIsDown(RIGHT_ARROW) || keyIsDown(KEY_D);
    let moveDown = keyIsDown(DOWN_ARROW) || keyIsDown(KEY_S);
    let moveLeft = keyIsDown(LEFT_ARROW) || keyIsDown(KEY_A);

    if (moveUp) {
        dir = 2;
        moving = true;
        player.top -= playerSpeed * dt;
        solveWallCollision('up');
    }

    if (moveRight) {
        dir = 1;
        moving = true;
        player.left += playerSpeed * dt;
        solveWallCollision('right');
    }

    if (moveDown) {
        dir = 0;
        moving = true;
        player.top += playerSpeed * dt;
        solveWallCollision('down');
    }

    if (moveLeft) {
        dir = 3;
        moving = true;
        player.left -= playerSpeed * dt;
        solveWallCollision('left');
    }
}

function solveWallCollision(direction) {
    for (let w of wall) {
        if (player.intersects(w)) {
            if (direction === 'up') player.top = w.bottom;
            if (direction === 'right') player.right = w.left;
            if (direction === 'down') player.bottom = w.top;
            if (direction === 'left') player.left = w.right;
        }
    }
}

// ==================== 第二关逻辑 / Level 2 Logic ====================
function handlePickupsAndGoal() {
    if (!hasMiniMap && player.intersects(box)) {
        boxIntersects();
    }

    if (!hasLight && hasMiniMap && player.intersects(lightItem)) {
        lightIntersects();
    }

    if (!hasRing && hasMiniMap && player.intersects(ringItem)) {
        ringIntersects();
    }

    if (player.intersects(exitDoor)) {
        if (hasLight && hasRing) {
            end = true;
            pause = true;
        } else {
            triggerPopUp(
                "Door locked!",
                "You should first find the light and the ring.",
                2.5
            );
        }
    }
}

function toggleWeapon() {
    if (!hasRing) return;

    currentWeapon = (currentWeapon === "crossbow") ? "ring" : "crossbow";
    currentWeaponStats = weaponConfigs[currentWeapon];

    triggerPopUp(
        "Weapon switched!",
        `Current weapon: ${currentWeaponStats.name}`,
        1.2
    );
}

function shootProjectile() {
    if (attackCooldownTimer > 0) return;

    let startX = player.left + player.width / 2;
    let startY = player.top + player.height / 2;

    let target = null;
    if (hasLight) {
        target = findAutoTarget(startX, startY, 210);
    }

    let vx = null;
    let vy = null;

    if (target) {
        let dx = target.x - startX;
        let dy = target.y - startY;
        let d = sqrt(dx * dx + dy * dy);
        vx = (dx / max(d, 1)) * currentWeaponStats.projectileSpeed;
        vy = (dy / max(d, 1)) * currentWeaponStats.projectileSpeed;
    }

    let kind = (currentWeapon === "crossbow") ? "arrow" : "orb";

    projectiles.push(
        new Projectile(
            startX,
            startY,
            dir,
            kind,
            vx,
            vy,
            currentWeaponStats.damage
        )
    );

    attackCooldownTimer = currentWeaponStats.cooldown;
}

function findAutoTarget(px, py, range) {
    let best = null;
    let bestD = Infinity;

    for (let e of enemies) {
        if (!e.alive) continue;
        let ex = e.rect.left + e.rect.width / 2;
        let ey = e.rect.top + e.rect.height / 2;
        let dx = ex - px;
        let dy = ey - py;
        let d = sqrt(dx * dx + dy * dy);
        if (d <= range && d < bestD) {
            bestD = d;
            best = { x: ex, y: ey, ref: e };
        }
    }

    return best;
}

function updateProjectiles(dt) {
    for (let p of projectiles) {
        p.update(dt);

        let pRect;
        if (p.kind === 'arrow') {
            pRect = new Rect(p.x - 8, p.y - 8, 16, 16, true);
        } else {
            pRect = new Rect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2, true);
        }

        for (let e of enemies) {
            if (e.alive && p.alive && pRect.intersects(e.rect)) {
                e.alive = false;
                p.alive = false;
                smallKillCount += 1;
            }
        }
    }

    projectiles = projectiles.filter(p => p.alive);
    enemies = enemies.filter(e => e.alive);
}

function updateEnemies(dt) {
    for (let e of enemies) {
        e.update(dt);
    }
}

// ==================== 图鉴 / Item Codex ====================
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

function unlockCodexItem(itemId) {
    const items = getCodexItems();
    if (!items.includes(itemId)) {
        items.push(itemId);
        localStorage.setItem(ITEM_CODEX_KEY, JSON.stringify(items));
    }
}

function hasCodexItem(itemId) {
    return getCodexItems().includes(itemId);
}

function getCodexDisplayText() {
    const names = [];
    if (hasCodexItem('crossbow')) names.push('Crossbow');
    if (hasCodexItem('light')) names.push('Light');
    if (hasCodexItem('ring')) names.push('Ring');
    if (names.length === 0) return 'None';
    return names.join(', ');
}

// ==================== 生成位置工具 / Spawn Helpers ====================
function createItemInStartView(avoidList = []) {
    let minX = blockSize * 2;
    let minY = blockSize * 2;
    let maxX = width - blockSize * 3;
    let maxY = height - blockSize * 3;

    let item;

    for (let i = 0; i < 300; i++) {
        let x = snapToGrid(random(minX, maxX));
        let y = snapToGrid(random(minY, maxY));

        item = new Rect(x, y, blockSize, blockSize, true);

        if (intersectsWall(item)) continue;
        if (item.intersects(player)) continue;

        let overlap = false;
        for (let other of avoidList) {
            if (other && item.intersects(other)) {
                overlap = true;
                break;
            }
        }
        if (!overlap) return item;
    }

    return new Rect(128, 128, blockSize, blockSize, true);
}

function createItemInMidArea(avoidList = []) {
    let minX = max(width * 0.45, blockSize * 6);
    let minY = max(height * 0.35, blockSize * 5);
    let maxX = min(worldWidth - blockSize * 4, width + 260);
    let maxY = min(worldHeight - blockSize * 4, height + 220);

    let item;

    for (let i = 0; i < 400; i++) {
        let x = snapToGrid(random(minX, maxX));
        let y = snapToGrid(random(minY, maxY));

        item = new Rect(x, y, blockSize, blockSize, true);

        if (intersectsWall(item)) continue;
        if (item.intersects(player)) continue;

        let overlap = false;
        for (let other of avoidList) {
            if (other && item.intersects(other)) {
                overlap = true;
                break;
            }
        }
        if (!overlap) return item;
    }

    return new Rect(416, 256, blockSize, blockSize, true);
}

// ==================== 创建对象 / Create Objects ====================
function createBox() {
    box = createItemInStartView([]);
}

function createLight() {
    lightItem = createItemInStartView([box]);
}

function createRing() {
    ringItem = createItemInMidArea([box, lightItem]);
}

function createExitDoor() {
    let x = (mazeMap.gridW - 3) * blockSize;
    let y = (mazeMap.gridH - 4) * blockSize;

    exitDoor = new Rect(x, y, blockSize, 40, true);

    while (intersectsWall(exitDoor)) {
        x -= blockSize;
        exitDoor = new Rect(x, y, blockSize, 40, true);
    }
}

function createEnemies() {
    enemies = [];

    for (let i = 0; i < enemyCount; i++) {
        let x = floor(random(64, worldWidth - blockSize * 2));
        let y = floor(random(96, worldHeight - blockSize * 2));
        let e = new Enemy(snapToGrid(x), snapToGrid(y));

        while (
            intersectsWall(e.rect) ||
            e.rect.intersects(player) ||
            e.rect.intersects(box) ||
            e.rect.intersects(lightItem) ||
            e.rect.intersects(ringItem) ||
            e.rect.intersects(exitDoor)
        ) {
            x = floor(random(64, worldWidth - blockSize * 2));
            y = floor(random(96, worldHeight - blockSize * 2));
            e = new Enemy(snapToGrid(x), snapToGrid(y));
        }

        enemies.push(e);
    }
}

// ==================== 道具拾取 / Pickups ====================
function boxIntersects() {
    hasMiniMap = true;
    triggerPopUp(
        "Mini Map found!",
        "You can show/hide the map by pressing 'M'.\nNow search for the light and the ring.",
        3
    );
}

function lightIntersects() {
    hasLight = true;
    unlockCodexItem('light');
    triggerPopUp(
        "Light found!",
        "The fog clears around you now.\nAuto-lock is enabled in the lit area.",
        3
    );
}

function ringIntersects() {
    hasRing = true;
    unlockCodexItem('ring');
    triggerPopUp(
        "Ring found!",
        "Press SHIFT to switch weapons.\nCrossbow ↔ Magic Ring",
        3
    );
}

// ==================== 绘制 / Draw ====================
function drawPlayer() {
    drawSelectedCharacter(player, cam, dir, moving, elapsedTime);
}

function drawBox(x, y) {
    push();
    imageMode(CORNER);

    if (boxImg) {
        image(boxImg, x + 1, y + 1, blockSize - 2, blockSize - 2);
    } else {
        noStroke();
        fill(90, 50, 15, 80);
        ellipse(x + 16, y + 28, 18, 6);

        fill(139, 69, 19);
        rect(x + 4, y + 12, 24, 16, 3);

        fill(160, 82, 45);
        rect(x + 4, y + 8, 24, 7, 3);

        fill(255, 215, 0);
        rect(x + 14, y + 16, 4, 8, 2);
        ellipse(x + 16, y + 18, 6, 6);
    }

    pop();
}

function drawLightPickup(x, y) {
    push();
    imageMode(CORNER);

    if (lightImg) {
        image(lightImg, x, y, blockSize, blockSize);
    } else {
        noStroke();
        fill(80, 60, 40);
        rect(x + 12, y + 18, 8, 10, 2);

        fill(255, 220, 100);
        ellipse(x + 16, y + 14, 14, 14);

        fill(255, 220, 100, 80);
        ellipse(x + 16, y + 14, 24, 24);
    }

    pop();
}

function drawRingPickup(x, y) {
    push();
    imageMode(CORNER);

    if (ringImg) {
        image(ringImg, x, y, blockSize, blockSize);
    } else {
        noFill();
        stroke(255, 215, 120);
        strokeWeight(3);
        ellipse(x + 16, y + 16, 14, 14);
    }

    pop();
}

function drawDoor(x, y) {
    push();
    noStroke();

    fill(70, 40, 20);
    rect(x + 3, y, 26, 40, 4);

    fill(120, 80, 40);
    rect(x + 7, y + 4, 18, 32, 3);

    fill(255, 215, 0);
    circle(x + 22, y + 20, 4);

    pop();
}

function drawHud() {
    fill(255);
    textSize(12);
    textFont('Arial');
    textAlign(LEFT);

    let y = 20;
    text("Level 2 Demo", 15, y);
    y += 16;
    text("Character: " + getSelectedCharacterName(), 15, y);
    y += 16;
    text("Weapon: " + currentWeaponStats.name, 15, y);
    y += 16;
    text("Map: " + (hasMiniMap ? "Yes" : "No"), 15, y);
    y += 16;
    text("Light: " + (hasLight ? "Yes" : "No"), 15, y);
    y += 16;
    text("Ring: " + (hasRing ? "Yes" : "No"), 15, y);
    y += 16;
    text("Enemies: " + enemies.length, 15, y);
    y += 16;
    text("Kills: " + smallKillCount, 15, y);

    textAlign(RIGHT);
    text("Item Codex: " + getCodexDisplayText(), width - 15, 20);
    textAlign(LEFT);
}

function drawFog() {
    fogLayer.clear();
    fogLayer.noStroke();

    fogLayer.fill(10, 12, 18, 185);
    fogLayer.rect(0, 0, width, height);

    if (hasLight) {
        fogLayer.erase();
        fogLayer.circle(
            player.left - cam.x + player.width / 2,
            player.top - cam.y + player.height / 2,
            fogRadiusWithLight * 2
        );
        fogLayer.noErase();
    }

    image(fogLayer, 0, 0);
}

class Projectile {
    constructor(x, y, dir, kind, vx = null, vy = null, damage = 10) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.kind = kind; // arrow / orb
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.alive = true;
        this.r = 4;
        this.arrowLength = 16;
    }

    update(dt) {
        const speed = currentWeaponStats.projectileSpeed;

        if (this.vx !== null && this.vy !== null) {
            this.x += this.vx * dt;
            this.y += this.vy * dt;
        } else {
            if (this.dir === 0) this.y += speed * dt;
            if (this.dir === 1) this.x += speed * dt;
            if (this.dir === 2) this.y -= speed * dt;
            if (this.dir === 3) this.x -= speed * dt;
        }

        let pRect;
        if (this.kind === 'arrow') {
            pRect = new Rect(this.x - 8, this.y - 8, 16, 16, true);
        } else {
            pRect = new Rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2, true);
        }

        for (let w of wall) {
            if (pRect.intersects(w)) {
                this.alive = false;
                return;
            }
        }

        if (this.x < 0 || this.y < 0 || this.x > worldWidth || this.y > worldHeight) {
            this.alive = false;
        }
    }

    draw() {
        push();

        if (this.kind === 'arrow') {
            let dx = 0;
            let dy = 0;

            if (this.vx !== null && this.vy !== null) {
                let len = sqrt(this.vx * this.vx + this.vy * this.vy);
                dx = this.vx / max(len, 1);
                dy = this.vy / max(len, 1);
            } else {
                if (this.dir === 0) dy = 1;
                if (this.dir === 1) dx = 1;
                if (this.dir === 2) dy = -1;
                if (this.dir === 3) dx = -1;
            }

            let x1 = this.x - cam.x;
            let y1 = this.y - cam.y;
            let x2 = x1 - dx * this.arrowLength;
            let y2 = y1 - dy * this.arrowLength;

            stroke(92, 60, 32);
            strokeWeight(3);
            line(x1, y1, x2, y2);

            noStroke();
            fill(120, 85, 45);
            circle(x1, y1, 4);
        } else {
            noStroke();
            fill(140, 210, 255);
            circle(this.x - cam.x, this.y - cam.y, this.r * 2);
        }

        pop();
    }
}

class Enemy {
    constructor(x, y) {
        this.rect = new Rect(x, y, 32, 48, true);
        this.dir = floor(random(4));
        this.speed = 60;
        this.alive = true;
        this.changeTimer = random(1, 3);
        this.floatPhase = random(TWO_PI);
    }

    update(dt) {
        if (!this.alive) return;

        this.changeTimer -= dt;
        if (this.changeTimer <= 0) {
            this.dir = floor(random(4));
            this.changeTimer = random(1, 3);
        }

        let oldLeft = this.rect.left;
        let oldTop = this.rect.top;

        if (this.dir === 0) this.rect.top += this.speed * dt;
        if (this.dir === 1) this.rect.left += this.speed * dt;
        if (this.dir === 2) this.rect.top -= this.speed * dt;
        if (this.dir === 3) this.rect.left -= this.speed * dt;

        for (let w of wall) {
            if (this.rect.intersects(w)) {
                this.rect.left = oldLeft;
                this.rect.top = oldTop;
                this.dir = floor(random(4));
                break;
            }
        }

        if (this.rect.intersects(player)) {
            gameover = true;
            gameoverMsg = "A little ghost caught you!";
            pause = true;
        }
    }

    draw() {
        push();

        let bob = sin(gTime * 2.8 + this.floatPhase) * 2.5;

        let drawW = this.rect.width * 1.6;
        let drawH = this.rect.height * 1.1;

        let drawX = this.rect.left - cam.x - (drawW - this.rect.width) / 2;
        let drawY = this.rect.top - cam.y + this.rect.height - drawH + bob;

        imageMode(CORNER);

        if (littleGhostImg) {

            // 幽灵透明
            tint(255, 200);

            // 发光效果
            drawingContext.shadowBlur = 12;
            drawingContext.shadowColor = "rgba(180,220,255,0.6)";

            image(littleGhostImg, drawX, drawY, drawW, drawH);

            noTint();

            // 关闭发光避免影响其他物体
            drawingContext.shadowBlur = 0;
        }

        pop();
    }
}

// ==================== 工具函数 / Utility Functions ====================
function convertTime(time) {
    let seconds = floor(time % 60);
    let minutes = floor((time / 60) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

function fillTextMultiLine(txt, x, y) {
    let lineHeight = 16;
    let lines = txt.split("\n");

    for (let i = 0; i < lines.length; i++) {
        text(lines[i], x, y);
        y += lineHeight;
    }
}

function snapToGrid(value) {
    return floor(value / blockSize) * blockSize;
}

function intersectsWall(object) {
    for (let w of wall) {
        if (object.intersects(w)) {
            return true;
        }
    }
    return false;
}

function triggerPopUp(title, message, time) {
    endTimePopUp = elapsedTime + time;
    popUpTitle = title;
    popUpMessage = message;
}

// ==================== 类 / Classes ====================
class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    focus(x, y) {
        this.x = x - width / 2;
        this.y = y - height / 2;

        if (this.x < 0) this.x = 0;
        else if (this.x > worldWidth - width) this.x = worldWidth - width;

        if (this.y < 0) this.y = 0;
        else if (this.y > worldHeight - height) this.y = worldHeight - height;
    }
}

class Rect {
    constructor(x, y, w, h, createFromTopLeft, type) {
        this.width = (w === undefined) ? 0 : w;
        this.height = (h === undefined) ? this.width : h;

        if (createFromTopLeft) {
            this.left = (x === undefined) ? 0 : x;
            this.top = (y === undefined) ? 0 : y;
        } else {
            this.x = (x === undefined) ? 0 : x;
            this.y = (y === undefined) ? 0 : y;
        }

        this.t = (type === undefined) ? -1 : type;
    }

    get x() { return this.left + this.width / 2; }
    set x(value) { this.left = value - this.width / 2; }

    get y() { return this.top + this.height / 2; }
    set y(value) { this.top = value - this.height / 2; }

    get right() { return this.left + this.width; }
    set right(value) { this.left = value - this.width; }

    get bottom() { return this.top + this.height; }
    set bottom(value) { this.top = value - this.height; }

    intersects(rect) {
        if (rect !== undefined) {
            return (
                this.left < rect.right &&
                this.right > rect.left &&
                this.top < rect.bottom &&
                this.bottom > rect.top
            );
        }
        return false;
    }
}

class Maze {
    constructor(w, h, nextCell, startX, startY) {
        this.w = (isNaN(w) || w < 5 || w > 999) ? 20 : w;
        this.h = (isNaN(h) || h < 5 || h > 999) ? 20 : h;
        this.map = [];

        for (let y = 0; y < h; y++) {
            this.map[y] = [];
            for (let x = 0; x < w; x++) {
                this.map[y][x] = { N: 0, S: 0, E: 0, W: 0, V: 0 };
            }
        }

        this.nextCell = (
            typeof nextCell === 'undefined' ||
            (nextCell !== 'first' && nextCell !== 'last' && nextCell !== 'random')
        ) ? 'random' : nextCell;

        this.startX = (isNaN(startX) || startX < 0 || startX >= w) ? 0 : startX;
        this.startY = (isNaN(startY) || startY < 0 || startY >= h) ? 0 : startY;

        this.build();
    }

    toGrid() {
        let grid = [];

        for (let y = 0; y < (this.h * 3 + 1); y++) {
            grid[y] = [];
            for (let x = 0; x < (this.w * 3 + 1); x++) {
                grid[y][x] = 0;
            }
        }

        for (let y = 0; y < this.h; y++) {
            let py = (y * 3) + 1;

            for (let x = 0; x < this.w; x++) {
                let px = (x * 3) + 1;

                grid[py][px] = 1;
                grid[py][px + 1] = 1;
                grid[py + 1][px] = 1;
                grid[py + 1][px + 1] = 1;

                if (this.map[y][x].N === 1) {
                    grid[py - 1][px] = 1;
                    grid[py - 1][px + 1] = 1;
                }
                if (this.map[y][x].S === 1) {
                    grid[py + 1][px] = 1;
                    grid[py + 1][px + 1] = 1;
                }
                if (this.map[y][x].E === 1) {
                    grid[py][px + 1] = 1;
                    grid[py + 1][px + 1] = 1;
                }
                if (this.map[y][x].W === 1) {
                    grid[py][px - 1] = 1;
                    grid[py + 1][px - 1] = 1;
                }
            }
        }

        this.gridMap = grid;
        this.gridH = grid.length;
        this.gridW = grid[0].length;
    }

    build() {
        let cells = [];
        cells.push({ x: this.startX, y: this.startY });
        this.map[this.startY][this.startX].V = 1;

        let modDir = {
            'N': { y: -1, x: 0, o: 'S' },
            'S': { y: 1, x: 0, o: 'N' },
            'W': { y: 0, x: -1, o: 'E' },
            'E': { y: 0, x: 1, o: 'W' }
        };

        while (cells.length > 0) {
            let i = (this.nextCell === 'first') ? 0 :
                    (this.nextCell === 'last') ? cells.length - 1 :
                    floor(random(cells.length));

            let cell = cells[i];
            let n = [];

            if (cell.x > 0 && this.map[cell.y][cell.x - 1].V === 0) n.push('W');
            if (cell.x < this.w - 1 && this.map[cell.y][cell.x + 1].V === 0) n.push('E');
            if (cell.y > 0 && this.map[cell.y - 1][cell.x].V === 0) n.push('N');
            if (cell.y < this.h - 1 && this.map[cell.y + 1][cell.x].V === 0) n.push('S');

            if (n.length === 0) {
                cells.splice(i, 1);
                continue;
            }

            let direction = n[floor(random(n.length))];
            let destX = cell.x + modDir[direction].x;
            let destY = cell.y + modDir[direction].y;

            this.map[cell.y][cell.x][direction] = 1;
            this.map[destY][destX][modDir[direction].o] = 1;
            this.map[destY][destX].V = 1;

            cells.push({ x: destX, y: destY });
        }

        this.toGrid();
    }
}

// ==================== 地图 / Map ====================
function setMap() {
    wall = [];
    terrain = [];

    for (let y = 0; y < mazeMap.gridH; y++) {
        for (let x = 0; x < mazeMap.gridW; x++) {
            if (mazeMap.gridMap[y][x] === 1) {
                terrain.push(new Rect(x * blockSize, y * blockSize, blockSize, blockSize, true));
            } else {
                wall.push(new Rect(x * blockSize, y * blockSize, blockSize, blockSize, true, 0));
            }
        }
    }

    worldWidth = mazeMap.gridW * blockSize;
    worldHeight = mazeMap.gridH * blockSize;
}

function buildMazeLayer() {
    mazeLayer = createGraphics(worldWidth, worldHeight);
    mazeLayer.background(12, 16, 22);

    for (let t of terrain) drawTerrainToLayer(mazeLayer, t.left, t.top);
    for (let w of wall) drawWallToLayer(mazeLayer, w.left, w.top);
}

function drawMaze() {
    image(mazeLayer, -cam.x, -cam.y);
}

function drawTerrainToLayer(g, x, y) {
    const gx = floor(x / blockSize);
    const gy = floor(y / blockSize);
    const seed = abs(gx * 17 + gy * 23) % 20;

    let img = floorPlain01Img;

    if (seed <= 8 && floorPlain01Img) {
        img = floorPlain01Img;
    } else if (seed <= 14 && floorPlain03Img) {
        img = floorPlain03Img;
    } else if (seed <= 18 && floorPlain04Img) {
        img = floorPlain04Img;
    } else if (floorCrackedGlowImg) {
        img = floorCrackedGlowImg;
    }

    if (img) {
        g.image(img, x, y, blockSize, blockSize);
    } else {
        g.push();
        g.noStroke();
        g.fill(100, 108, 120);
        g.rect(x, y, blockSize, blockSize);
        g.pop();
    }
}

function drawWallToLayer(g, x, y) {
    if (wallImg) {
        g.image(wallImg, x, y, blockSize, blockSize);
    } else {
        g.push();
        g.noStroke();
        g.fill(42, 50, 62);
        g.rect(x, y, blockSize, blockSize);
        g.pop();
    }
}

// ==================== UI / Screens ====================
function drawStart() {
    fill(50, 65, 98);
    noStroke();
    rect(width / 2 - 170, height / 2 - 70, 340, 140, 8);

    textAlign(CENTER);
    fill(255);
    textSize(30);
    textFont('Impact');
    text('Explorer Camp - Level 2', width / 2, height / 2 - 18);

    textSize(12);
    textFont('Arial');
    text("Find the map, light, ring and reach the door.", width / 2, height / 2 + 10);
    text("Start weapon: Crossbow", width / 2, height / 2 + 28);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press ENTER to start", width / 2, height / 2 + 50);
    }

    textAlign(LEFT);
}

function drawEnd() {
    fill(50, 65, 98);
    noStroke();
    rect(width / 2 - 170, height / 2 - 72, 340, 150, 8);

    textAlign(CENTER);
    fill(255);
    textSize(24);
    textFont('Impact');
    text('LEVEL 2 COMPLETE', width / 2, height / 2 - 24);

    textSize(12);
    textFont('Arial');
    text(`Kills: ${smallKillCount}`, width / 2, height / 2 + 8);
    text(`Item Codex: ${getCodexDisplayText()}`, width / 2, height / 2 + 30);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press ESC to restart demo", width / 2, height / 2 + 58);
    }

    textAlign(LEFT);
}

function drawPause() {
    fill(50, 65, 98);
    noStroke();
    rect(width / 2 - 145, height / 2 - 50, 290, 100, 8);

    textAlign(CENTER);
    fill(255);
    textSize(20);
    textFont('Impact');
    text('PAUSE', width / 2, height / 2);

    if (floor(gTime * 3) % 2 === 1) {
        textSize(12);
        textFont('Arial');
        text("Press 'P' to pause/resume the game", width / 2, height / 2 + 20);
    }

    textAlign(LEFT);
}

function drawGameOver() {
    fill(120, 40, 40);
    noStroke();
    rect(width / 2 - 170, height / 2 - 72, 340, 150, 8);

    textAlign(CENTER);
    fill(255);
    textSize(20);
    textFont('Impact');
    text('GAME OVER', width / 2, height / 2 - 28);

    textSize(11);
    textFont('Arial');
    text(gameoverMsg, width / 2, height / 2 - 6);
    text(`Kills: ${smallKillCount}`, width / 2, height / 2 + 20);
    text(`Item Codex: ${getCodexDisplayText()}`, width / 2, height / 2 + 40);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press ESC to restart", width / 2, height / 2 + 62);
    }

    textAlign(LEFT);
}

function drawPopUp() {
    fill(80, 105, 140);
    noStroke();
    rect(width / 2 - 160, 75, 320, 120, 8);

    textAlign(CENTER);
    fill(255);
    textSize(16);
    textFont('Arial');
    text(popUpTitle, width / 2, 100);

    textSize(12);
    fillTextMultiLine(popUpMessage, width / 2, 130);
    textAlign(LEFT);
}

function drawInformation() {
    fill(80, 105, 140);
    noStroke();
    rect(width / 2 - 210, 70, 420, 360, 8);

    textAlign(CENTER);
    fill(255);
    textSize(16);
    textFont('Arial');
    text('Instructions', width / 2, 100);

    textAlign(LEFT);
    textSize(12);
    noStroke();

    text('Find the chest first to unlock the mini map.', width / 2 - 190, 140);
    text('Then search for the light and the magic ring.', width / 2 - 190, 160);
    text('You already start with the crossbow equipped.', width / 2 - 190, 180);
    text('The light clears the fog and enables auto-lock nearby.', width / 2 - 190, 200);
    text("Press SPACE to attack.", width / 2 - 190, 230);
    text("After finding the ring, press SHIFT to switch weapons.", width / 2 - 190, 250);
    text("Use Arrow Keys or WASD to move.", width / 2 - 190, 280);
    text("Press 'M' to toggle the mini map and 'P' to pause.", width / 2 - 190, 300);

    textAlign(CENTER);
    textSize(10);
    stroke(255);
    strokeWeight(2);
    noFill();

    text('Up', width / 2, 325);
    rect(width / 2 - 22.5, 300, 45, 45, 10);

    text('Left', width / 2 - 50, 376);
    rect(width / 2 - 72.5, 350, 45, 45, 10);

    text('Down', width / 2, 376);
    rect(width / 2 - 22.5, 350, 45, 45, 10);

    text('Right', width / 2 + 50, 376);
    rect(width / 2 + 27.5, 350, 45, 45, 10);

    push();
    textAlign(CENTER, CENTER);
    textFont('Arial');
    textSize(12);
    fill(255);
    noStroke();
    strokeWeight(0);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press 'Enter' to continue", width / 2, 410);
    }
    pop();

    textAlign(LEFT);
}

function drawMiniMap() {
    let miniMapBorder = 5;
    let miniMapLeft = 10;
    let miniMapTop = height - mazeMap.gridH * miniMapScale - 10 - miniMapBorder;

    fill(255);
    noStroke();
    rect(miniMapLeft, miniMapTop, mazeMap.gridW * miniMapScale + 10, mazeMap.gridH * miniMapScale + 10);

    fill(210);
    rect(miniMapLeft + miniMapBorder, miniMapTop + miniMapBorder, mazeMap.gridW * miniMapScale, mazeMap.gridH * miniMapScale);

    fill(0);
    for (let w of wall) {
        rect(
            (w.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder,
            (w.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder,
            miniMapScale,
            miniMapScale
        );
    }

    fill(0, 200, 0);
    rect(
        (exitDoor.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder,
        (exitDoor.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder,
        miniMapScale,
        miniMapScale
    );

    if (!hasLight) {
        fill(255, 220, 0);
        circle(
            (lightItem.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
            (lightItem.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
            4
        );
    }

    if (!hasRing) {
        fill(120, 220, 255);
        circle(
            (ringItem.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
            (ringItem.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
            4
        );
    }

    fill(180, 0, 180);
    for (let e of enemies) {
        circle(
            (e.rect.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
            (e.rect.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
            3
        );
    }

    fill(255, 0, 0);
    circle(
        (player.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
        (player.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
        4
    );
}

function drawElapsedTime() {
    fill(0);
    noStroke();
    rect(width / 2 - 37, 5, 74, 42);

    fill(255);
    rect(width / 2 - 32, 10, 64, 32);

    fill(0);
    textAlign(CENTER);
    textSize(20);
    textFont('Arial');
    text(convertTime(elapsedTime), width / 2, 32);
    textAlign(LEFT);
}

// ==================== 重置 / Reset ====================
function resetGame() {
    gTime = 0;
    elapsedTime = 0;
    lastKeyPress = null;
    pause = true;
    gameover = false;
    start = true;
    end = false;
    moving = false;
    showInstructions = false;

    wall = [];
    terrain = [];
    dir = 0;

    box = null;
    lightItem = null;
    ringItem = null;
    exitDoor = null;

    projectiles = [];
    enemies = [];

    hasMiniMap = false;
    hasLight = false;
    hasRing = false;
    hasCrossbow = true;
    currentWeapon = "crossbow";
    currentWeaponStats = weaponConfigs.crossbow;
    showMiniMap = true;

    attackCooldownTimer = 0;
    smallKillCount = 0;

    endTimePopUp = 0;
    popUpTitle = '';
    popUpMessage = '';
    gameoverMsg = '';

    setup();
}
