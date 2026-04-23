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
const enemyCount = 15;

const playerMaxHp = 100;
const playerInvulnTime = 0.8;
const teleportCooldownTime = 1.0;

const enemyTouchDamage = 8;
const enemyProjectileDamage = 6;
const enemySpeed = 52;

const bossMaxHp = 180;
const bossContactDamage = 16;
const bossProjectileDamage = 14;
const bossSpeed = 36;
const bossShootCooldown = 1.6;

const fogAlpha = 185;
const fogRevealRadius = 165;

const ITEM_CODEX_KEY = "itemCodex";
const EQUIPPED_WEAPON_KEY = "equippedWeapon";

const bossSealHoldTime = 1.8;

// 武器配置 / Weapon configs
const weaponConfigs = {
    crossbow: { name: "Crossbow", damage: 16, speed: 360, cooldown: 0.22 },
    ring:     { name: "Magic Ring", damage: 12, speed: 320, cooldown: 0.22 },
    seal:     { name: "Seal", damage: 0,  speed: 0,   cooldown: 0.35 }
};

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
let lockItem;
let keyItem;

let portals = [];
let projectiles = [];
let enemyProjectiles = [];
let enemies = [];
let boss = null;

let mazeLayer;
let fogLayer;

// ==================== 图片素材 / Image Assets ====================
let floorPlain01Img;
let floorPlain02Img;
let floorPlain03Img;
let floorCrackedGlowImg;
let wallLevel3Img;

let boxImg;
let lightImg;
let lockImg;
let keyImg;
let arrowImg;
let ringImg;
let portalImg;
let cageImg;
let littleGhostImg;
let bossImg;
let mapUIImg;
let timeUIImg;
let hpUIImg;

// ==================== 状态 / States ====================
let hasMiniMap = false;
let hasLight = false;
let hasCrossbow = true;   // 默认已有第一关弩箭
let hasRing = false;      // 从第二关图鉴记忆读取
let hasLock = false;
let hasKey = false;

let bossSealed = false;

let playerHp = playerMaxHp;
let playerInvulnTimer = 0;
let attackCooldownTimer = 0;
let teleportCooldownTimer = 0;

let currentWeapon = "crossbow";
let currentWeaponStats = weaponConfigs.crossbow;

let smallKillCount = 0;

let endTimePopUp = 0;
let popUpTitle = '';
let popUpMessage = '';
let gameoverMsg = '';

let popupRequiresEnter = false;

let bossSealAnimating = false;
let bossSealAnimTime = 0;
let bossSealDuration = 0.55;
let bossSealHoldTimer = 0;

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
    if (hasCodexItem('ring')) names.push('Ring');
    if (hasCodexItem('light')) names.push('Light');
    if (hasCodexItem('lock')) names.push('Lock');
    if (hasCodexItem('key')) names.push('Key');
    if (names.length === 0) return 'None';
    return names.join(', ');
}


// ==================== 武器记忆 / Weapon Memory ====================
function getStoredEquippedWeapon() {
    return localStorage.getItem(EQUIPPED_WEAPON_KEY) || "crossbow";
}

function saveEquippedWeapon(weaponId) {
    localStorage.setItem(EQUIPPED_WEAPON_KEY, weaponId);
}

function getAvailableWeapons() {
    let weapons = ["crossbow"];
    if (hasRing) weapons.push("ring");
    if (hasLock && hasKey) weapons.push("seal");
    return weapons;
}

function setCurrentWeapon(weaponId) {
    const available = getAvailableWeapons();
    if (!available.includes(weaponId)) {
        weaponId = available[0];
    }

    currentWeapon = weaponId;
    currentWeaponStats = weaponConfigs[weaponId];
    saveEquippedWeapon(weaponId);
}

function cycleWeapon() {
    const available = getAvailableWeapons();
    let index = available.indexOf(currentWeapon);
    if (index === -1) index = 0;
    index = (index + 1) % available.length;
    setCurrentWeapon(available[index]);

    triggerPopUp(
        "Weapon switched!",
        `Current weapon: ${currentWeaponStats.name}`,
        1.2
    );
}


// ==================== 预加载 / Preload ====================
function preload() {
    floorPlain01Img = loadImage('assets/floor_plain_1.png');
    floorPlain02Img = loadImage('assets/floor_plain_2.png');
    floorPlain03Img = loadImage('assets/floor_plain_3.png');
    floorCrackedGlowImg = loadImage('assets/floor_cracked_glow3.png');
    wallLevel3Img = loadImage('assets/wall_level_3.png');
    mapUIImg = loadImage('assets/map.png');
    timeUIImg = loadImage('assets/time.png');
    hpUIImg = loadImage('assets/hp.png');

    boxImg = loadImage('assets/box.png');
    lightImg = loadImage('assets/light.png');
    lockImg = loadImage('assets/lock.png');
    keyImg = loadImage('assets/key.png');
    arrowImg = loadImage('assets/arrow.png');
    ringImg = loadImage('assets/ring.png');
    portalImg = loadImage('assets/portal.png');
    cageImg = loadImage('assets/cage.png');
    littleGhostImg = loadImage('assets/little ghost.png');
    bossImg = loadImage('assets/boss.png');

    preloadSelectedCharacterSprites();
}


// ==================== p5 入口 / p5 Entry ====================
function setup() {
    createCanvas(800, 600);

    unlockCodexItem('crossbow');
    hasRing = hasCodexItem('ring');

    const storedWeapon = getStoredEquippedWeapon();
    if (storedWeapon === "ring" && hasRing) {
        setCurrentWeapon("ring");
    } else {
        setCurrentWeapon("crossbow");
    }

    mazeMap = new Maze(mazeW, mazeH, 'random', 1, 1);
    player = new Rect(32, 32, 32, 48, true);
    cam = new Camera();

    setMap();
    carveBossArena();
    buildMazeLayer();

    fogLayer = createGraphics(width, height);

    createBox();
    createLight();
    createLock();
    createKey();
    createBoss();
    createPortals();
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
    background(8, 10, 14);

    drawMaze();

    for (let p of portals) {
        drawPortal(p.left - cam.x, p.top - cam.y, p);
    }

    if (!hasMiniMap) {
        drawBox(box.left - cam.x, box.top - cam.y);
    }

    if (!hasLight && hasMiniMap) {
        drawLightPickup(lightItem.left - cam.x, lightItem.top - cam.y);
    }

    if (!hasLock && hasMiniMap) {
        drawLockPickup(lockItem.left - cam.x, lockItem.top - cam.y);
    }

    if (!hasKey && hasMiniMap) {
        drawKeyPickup(keyItem.left - cam.x, keyItem.top - cam.y);
    }

    for (let e of enemies) {
        e.draw();
    }

    if (boss && boss.alive) {
        boss.draw();
    }

    if (boss && (bossSealAnimating || bossSealed || end)) {
        drawBossCage();
    }

    for (let p of enemyProjectiles) {
        p.draw();
    }

    for (let p of projectiles) {
        p.draw();
    }

    drawPlayer();
    drawFog();

    if (endTimePopUp > elapsedTime || popupRequiresEnter) {
        drawPopUp();
    }

    if (hasMiniMap && showMiniMap) {
        drawMiniMap();
    }

    if (pause) {
        if (start) drawStart();
        else if (end) drawEnd();
        else if (gameover) drawGameOver();
        else drawPause();
    }

    if (showInstructions) drawInformation();

    drawElapsedTime();
    drawHud();
    drawPlayerHealthBar();
}

function act(dt) {
    gTime += dt;

    if (bossSealAnimating) {
        bossSealAnimTime += dt;

        if (bossSealAnimTime >= bossSealDuration) {
            bossSealHoldTimer += dt;

            // 到时间后再进入通关
            if (bossSealHoldTimer >= bossSealHoldTime) {
                if (boss) boss.alive = false;
                bossSealed = true;
                end = true;
                pause = true;
            }
        }

        return;
    }

    if (playerInvulnTimer > 0) playerInvulnTimer -= dt;
    if (attackCooldownTimer > 0) attackCooldownTimer -= dt;
    if (teleportCooldownTimer > 0) teleportCooldownTimer -= dt;

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
        handlePickups();
        handlePortals();
        updateProjectiles(dt);
        updateEnemies(dt);
        updateBoss(dt);
        updateEnemyProjectiles(dt);

        cam.focus(player.left, player.top);
    }
}


// ==================== 输入 / Input ====================
function keyPressed() {
    lastKeyPress = keyCode;

    if (keyCode === ENTER && start) {
        pause = false;
        start = false;
        showInstructions = true;
        return;
    }

    if (keyCode === ENTER && showInstructions) {
        showInstructions = false;
        return;
    }

    if (keyCode === ENTER && popupRequiresEnter) {
        endTimePopUp = 0;
        popupRequiresEnter = false;
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

    if (keyCode === KEY_SHIFT && !pause && !showInstructions) {
        cycleWeapon();
    }

    if (keyCode === KEY_SPACE && !pause && !showInstructions) {
        if (currentWeapon === "seal") {
            attemptSealBoss();
        } else {
            shootProjectile();
        }
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


// ==================== 第三关逻辑 / Level 3 Logic ====================
function handlePickups() {
    if (!hasMiniMap && player.intersects(box)) boxIntersects();
    if (!hasLight && hasMiniMap && player.intersects(lightItem)) lightIntersects();
    if (!hasLock && hasMiniMap && player.intersects(lockItem)) lockIntersects();
    if (!hasKey && hasMiniMap && player.intersects(keyItem)) keyIntersects();
}

function handlePortals() {
    if (teleportCooldownTimer > 0) return;

    for (let i = 0; i < portals.length; i++) {
        if (player.intersects(portals[i])) {
            usePortal(i);
            break;
        }
    }
}

function usePortal(fromIndex) {
    let candidates = [];
    for (let i = 0; i < portals.length; i++) {
        if (i !== fromIndex) candidates.push(i);
    }

    if (candidates.length === 0) return;

    let toIndex = random(candidates);
    let target = portals[toIndex];

    let destinations = [
        { x: target.left + blockSize, y: target.top },
        { x: target.left - blockSize, y: target.top },
        { x: target.left, y: target.top + blockSize },
        { x: target.left, y: target.top - blockSize }
    ];

    let placed = false;
    for (let d of destinations) {
        let testRect = new Rect(d.x, d.y, player.width, player.height, true);
        if (!intersectsWall(testRect)) {
            let blockedByPortal = false;
            for (let p of portals) {
                if (testRect.intersects(p)) {
                    blockedByPortal = true;
                    break;
                }
            }
            if (!blockedByPortal) {
                player.left = d.x;
                player.top = d.y;
                placed = true;
                break;
            }
        }
    }

    if (!placed) {
        player.left = target.left + blockSize;
        player.top = target.top;
        while (intersectsWall(player)) {
            player.left -= blockSize;
        }
    }

    teleportCooldownTimer = teleportCooldownTime;
    triggerPopUp("Warped!", "The portal dragged you elsewhere.", 1.2);
}

function shootProjectile() {
    if (attackCooldownTimer > 0) return;
    if (currentWeapon === "seal") return;

    let startX = player.left + player.width / 2;
    let startY = player.top + player.height / 2;

    let target = null;
    if (hasLight) target = findAutoTarget(startX, startY, 220);

    let vx = null;
    let vy = null;

    if (target) {
        let dx = target.x - startX;
        let dy = target.y - startY;
        let d = sqrt(dx * dx + dy * dy);
        vx = (dx / max(d, 1)) * currentWeaponStats.speed;
        vy = (dy / max(d, 1)) * currentWeaponStats.speed;
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

function attemptSealBoss() {
    if (!(hasLock && hasKey)) {
        triggerPopUp("Seal unavailable!", "You still need both the lock and the key.", 1.8);
        return;
    }

    if (currentWeapon !== "seal") {
        triggerPopUp("Wrong equipment!", "Switch to Seal first with SHIFT.", 1.5);
        return;
    }

    if (!boss || !boss.alive) return;

    if (!boss.lockedState) {
        triggerPopUp("Seal not ready!", "Weaken the boss first.", 1.5);
        return;
    }

    let px = player.left + player.width / 2;
    let py = player.top + player.height / 2;
    let bx = boss.rect.left + boss.rect.width / 2;
    let by = boss.rect.top + boss.rect.height / 2;
    let dx = bx - px;
    let dy = by - py;
    let dist = sqrt(dx * dx + dy * dy);

    if (dist > 95) {
        triggerPopUp("Too far away!", "Get closer to seal the boss.", 1.2);
        return;
    }

    startBossSeal();
}

function startBossSeal() {
    bossSealAnimating = true;
    bossSealAnimTime = 0;
    bossSealHoldTimer = 0;
    pause = true;
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
            best = { x: ex, y: ey, type: 'enemy', ref: e };
        }
    }

    if (boss && boss.alive) {
        let bx = boss.rect.left + boss.rect.width / 2;
        let by = boss.rect.top + boss.rect.height / 2;
        let dx = bx - px;
        let dy = by - py;
        let d = sqrt(dx * dx + dy * dy);
        if (d <= range && d < bestD) {
            bestD = d;
            best = { x: bx, y: by, type: 'boss', ref: boss };
        }
    }

    return best;
}

function damagePlayer(amount, sourceText = "Something hurt you!") {
    if (playerInvulnTimer > 0) return;

    playerHp -= amount;
    playerInvulnTimer = playerInvulnTime;

    if (playerHp <= 0) {
        playerHp = 0;
        gameover = true;
        gameoverMsg = sourceText;
        pause = true;
    }
}

function healPlayer(amount) {
    playerHp = min(playerMaxHp, playerHp + amount);
}

function updateProjectiles(dt) {
    for (let p of projectiles) {
        p.update(dt);

        let pRect = new Rect(p.x - 10, p.y - 10, 20, 20, true);

        for (let e of enemies) {
            if (e.alive && p.alive && pRect.intersects(e.rect)) {
                e.hp -= p.damage;
                p.alive = false;

                if (e.hp <= 0) {
                    e.hp = 0;
                    e.alive = false;
                    smallKillCount += 1;
                    healPlayer(3);
                }
            }
        }

        if (boss && boss.alive && p.alive && pRect.intersects(boss.rect)) {
            // 锁血后不再继续掉血
            if (boss.lockedState) {
                p.alive = false;
                continue;
            }

            // 正常扣血
            boss.hp -= p.damage;
            p.alive = false;

            // 快死时进入锁血/眩晕状态
            if (boss.hp <= 18) {
                boss.hp = 1;
                boss.lockedState = true;

                if (hasLock && hasKey) {
                    triggerPopUp(
                        "Boss weakened!",
                        "Switch to Seal and press SPACE near the boss.",
                        2.5
                    );
                } else {
                    triggerPopUp(
                        "Boss stunned!",
                        "You still need both the lock and the key to seal it.",
                        2.5
                    );
                }
            }
        }
    }
    

    projectiles = projectiles.filter(p => p.alive);
    enemies = enemies.filter(e => e.alive);
}

function updateEnemies(dt) {
    for (let e of enemies) e.update(dt);
}

function updateBoss(dt) {
    if (boss && boss.alive) boss.update(dt);
}

function updateEnemyProjectiles(dt) {
    for (let p of enemyProjectiles) {
        p.update(dt);

        let pRect = new Rect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2, true);
        if (p.alive && pRect.intersects(player)) {
            p.alive = false;
            damagePlayer(p.damage, p.sourceText);
        }
    }

    enemyProjectiles = enemyProjectiles.filter(p => p.alive);
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
            if (other && item.intersects(other)) overlap = true;
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
            if (other && item.intersects(other)) overlap = true;
        }
        if (!overlap) return item;
    }

    return new Rect(416, 256, blockSize, blockSize, true);
}

function createItemInBossSide(avoidList = []) {
    let minX = worldWidth - blockSize * 10;
    let minY = worldHeight - blockSize * 9;
    let maxX = worldWidth - blockSize * 3;
    let maxY = worldHeight - blockSize * 3;

    let item;
    for (let i = 0; i < 500; i++) {
        let x = snapToGrid(random(minX, maxX));
        let y = snapToGrid(random(minY, maxY));

        item = new Rect(x, y, blockSize, blockSize, true);

        if (intersectsWall(item)) continue;
        if (item.intersects(player)) continue;

        let overlap = false;
        for (let other of avoidList) {
            if (other && item.intersects(other)) overlap = true;
        }
        if (!overlap) return item;
    }

    return new Rect(worldWidth - 6 * blockSize, worldHeight - 6 * blockSize, blockSize, blockSize, true);
}

function isInStartView(x, y) {
    return x < width - blockSize * 2 && y < height - blockSize * 2;
}


// ==================== 创建对象 / Create Objects ====================
function createBox() {
    box = createItemInStartView([]);
}

function createLight() {
    lightItem = createItemInStartView([box]);
}

function createLock() {
    lockItem = createItemInMidArea([box, lightItem]);
}

function createKey() {
    keyItem = createItemInBossSide([box, lightItem, lockItem]);
}

function canPlacePortal(r) {
    if (intersectsWall(r)) return false;
    if (r.intersects(box)) return false;
    if (r.intersects(lightItem)) return false;
    if (r.intersects(lockItem)) return false;
    if (r.intersects(keyItem)) return false;
    if (boss && r.intersects(boss.rect)) return false;
    return true;
}

function createPortals() {
    portals = [];

    const desired = [
        { x: worldWidth * 0.35, y: blockSize * 3 },
        { x: blockSize * 3, y: worldHeight * 0.55 },
        { x: worldWidth * 0.55, y: worldHeight - blockSize * 4 },
        { x: worldWidth - blockSize * 6, y: worldHeight - blockSize * 7 }
    ];

    for (let pos of desired) {
        let placed = false;

        for (let tries = 0; tries < 100; tries++) {
            let px = snapToGrid(pos.x + random(-1, 1) * blockSize);
            let py = snapToGrid(pos.y + random(-1, 1) * blockSize);

            let r = new Rect(px, py, blockSize, blockSize, true);

            if (canPlacePortal(r)) {
                portals.push(r);
                placed = true;
                break;
            }
        }

        if (!placed) {
            for (let tries = 0; tries < 200; tries++) {
                let px = snapToGrid(random(3 * blockSize, worldWidth - 3 * blockSize));
                let py = snapToGrid(random(3 * blockSize, worldHeight - 3 * blockSize));
                let r = new Rect(px, py, blockSize, blockSize, true);

                if (!isInStartView(px, py) && canPlacePortal(r)) {
                    portals.push(r);
                    break;
                }
            }
        }
    }
}

function createEnemies() {
    enemies = [];

    for (let i = 0; i < enemyCount; i++) {
        let e = null;

        for (let tries = 0; tries < 800; tries++) {
            let x = snapToGrid(random(4 * blockSize, worldWidth - 4 * blockSize));
            let y = snapToGrid(random(4 * blockSize, worldHeight - 4 * blockSize));

            if (isInStartView(x, y)) continue;

            e = new Enemy(x, y);

            let overlap = false;
            if (
                intersectsWall(e.rect) ||
                e.rect.intersects(player) ||
                e.rect.intersects(box) ||
                e.rect.intersects(lightItem) ||
                e.rect.intersects(lockItem) ||
                e.rect.intersects(keyItem)
            ) {
                overlap = true;
            }

            for (let p of portals) {
                if (e.rect.intersects(p)) overlap = true;
            }

            if (boss && e.rect.intersects(boss.rect)) overlap = true;

            if (overlap) {
                e = null;
                continue;
            }

            break;
        }

        if (e) enemies.push(e);
    }
}

function createBoss() {
    let x = worldWidth - 7 * blockSize;
    let y = worldHeight - 6 * blockSize;

    boss = new Boss(x, y);

    while (intersectsWall(boss.rect)) {
        x -= blockSize;
        boss = new Boss(x, y);
    }
}


// ==================== 道具拾取 / Pickups ====================
function boxIntersects() {
    hasMiniMap = true;
    showMiniMap = true;
}

function lightIntersects() {
    hasLight = true;
    unlockCodexItem('light');
    triggerPopUp(
        "Light found!",
        "Your vision has opened.\nAuto-lock now works inside the lit area.",
        3
    );
}

function lockIntersects() {
    hasLock = true;
    unlockCodexItem('lock');

    if (hasLock && hasKey) {
        triggerPopUp(
            "Seal completed!",
            "You now have both lock and key.\nPress SHIFT to switch to Seal.",
            3
        );
    } else {
        triggerPopUp(
            "Lock found!",
            "Now search for the matching key.",
            2.5
        );
    }
}

function keyIntersects() {
    hasKey = true;
    unlockCodexItem('key');

    if (hasLock && hasKey) {
        triggerPopUp(
            "Seal completed!",
            "You now have both lock and key.\nPress SHIFT to switch to Seal.",
            3
        );
    } else {
        triggerPopUp(
            "Key found!",
            "Now search for the matching lock.",
            2.5
        );
    }
}


// ==================== 迷雾蒙版 / Fog Mask ====================
function drawFog() {
    fogLayer.clear();
    fogLayer.noStroke();

    fogLayer.fill(10, 12, 18, fogAlpha);
    fogLayer.rect(0, 0, width, height);

    if (hasLight) {
        fogLayer.erase();
        fogLayer.circle(
            player.left - cam.x + player.width / 2,
            player.top - cam.y + player.height / 2,
            fogRevealRadius * 2
        );
        fogLayer.noErase();
    }

    image(fogLayer, 0, 0);
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

function drawLockPickup(x, y) {
    push();
    imageMode(CORNER);

    if (lockImg) {
        image(lockImg, x, y, blockSize, blockSize);
    } else {
        noFill();
        stroke(210, 190, 120);
        strokeWeight(3);
        rect(x + 10, y + 14, 12, 10, 2);
        arc(x + 16, y + 14, 10, 10, PI, TWO_PI);
    }

    pop();
}

function drawKeyPickup(x, y) {
    push();
    imageMode(CORNER);

    if (keyImg) {
        image(keyImg, x, y, blockSize, blockSize);
    } else {
        stroke(230, 210, 120);
        strokeWeight(3);
        line(x + 10, y + 16, x + 24, y + 16);
        noStroke();
        fill(230, 210, 120);
        circle(x + 10, y + 16, 8);
        rect(x + 20, y + 13, 3, 6);
        rect(x + 23, y + 13, 3, 3);
    }

    pop();
}

function drawPortal(x, y, portalRect) {
    push();

    let phase = (portalRect.left + portalRect.top) * 0.01;
    let floatOffset = sin(gTime * 2.2 + phase) * 3;

    imageMode(CORNER);

    if (portalImg) {
        tint(255, 235);
        image(portalImg, x, y + floatOffset, blockSize, blockSize);
        noTint();
    } else {
        noFill();
        stroke(150, 80, 255, 180);
        strokeWeight(3);
        ellipse(x + 16, y + 16 + floatOffset, 22, 22);
        stroke(220, 180, 255, 120);
        ellipse(x + 16, y + 16 + floatOffset, 12, 12);
    }

    pop();
}

function drawBossCage() {
    if (!boss) return;

    let bx = boss.rect.left - cam.x;
    let by = boss.rect.top - cam.y;

    let cageW = boss.rect.width * 1.5;
    let cageH = boss.rect.height * 1.5;

    let targetX = bx - (cageW - boss.rect.width) / 2;
    let targetY = by - (cageH - boss.rect.height) / 2;

    let drawY = targetY;

    // 下落动画
    if (bossSealAnimating && bossSealAnimTime < bossSealDuration) {
        let t = constrain(bossSealAnimTime / bossSealDuration, 0, 1);
        let startY = targetY - 140;
        drawY = lerp(startY, targetY, t);
    }

    push();
    imageMode(CORNER);

    // ===== 金光核心（呼吸感）=====
    let glow = 22 + sin(gTime * 5) * 10;
    drawingContext.shadowBlur = glow;
    drawingContext.shadowColor = "rgba(255, 220, 120, 0.9)";

    // ===== 主笼子 =====
    if (cageImg) {
        tint(255, 245, 180); // 偏金色
        image(cageImg, targetX, drawY, cageW, cageH);
        noTint();
    } else {
        stroke(255, 220, 120);
        strokeWeight(4);
        noFill();
        rect(targetX, drawY, cageW, cageH, 6);
    }

    // ===== 外圈光环 =====
    noStroke();
    fill(255, 215, 100, 40);
    ellipse(
        targetX + cageW / 2,
        drawY + cageH / 2,
        cageW * 1.1,
        cageH * 1.1
    );

    // ===== 内部封印光 =====
    fill(255, 240, 160, 60);
    ellipse(
        targetX + cageW / 2,
        drawY + cageH / 2,
        cageW * 0.7,
        cageH * 0.7
    );

    // ===== 金色十字闪光（重点帅）=====
    stroke(255, 240, 180, 180);
    strokeWeight(2);

    let cx = targetX + cageW / 2;
    let cy = drawY + cageH / 2;
    let cross = 20 + sin(gTime * 8) * 6;

    line(cx - cross, cy, cx + cross, cy);
    line(cx, cy - cross, cx, cy + cross);

    drawingContext.shadowBlur = 0;
    pop();
}

function drawHud() {
    // 开始界面 / 说明界面时不显示，避免挡住画面
    if (start || showInstructions) return;

    fill(255);
    textSize(12);
    textFont('Arial');
    textAlign(LEFT);

    // 左上角只保留最重要的信息
    let x = 14;
    let y = 22;

    text(`Weapon: ${currentWeaponStats.name}`, x, y);
    y += 18;

    let itemText = [];
    if (hasMiniMap) itemText.push("Map");
    if (hasLight) itemText.push("Light");
    if (hasLock) itemText.push("Lock");
    if (hasKey) itemText.push("Key");

    text(`Items: ${itemText.length ? itemText.join(", ") : "None"}`, x, y);
    y += 18;

    text(`Boss: ${bossSealed ? "Sealed" : (boss && boss.lockedState ? "Stunned" : "Alive")}`, x, y);
    textAlign(LEFT);
}

function drawPlayerHealthBar() {
    // ===== 缩小后的外框 =====
    let frameW = 200;
    let frameH = 50;

    let frameX = width - frameW - 45;
    let frameY = 6;

    // ===== 按比例缩小后的内容区 =====
    let barX = frameX + 32;
    let barY = frameY + 17;
    let barW = 146;
    let barH = 18;

    let ratio = constrain(playerHp / playerMaxHp, 0, 1);

    // 底槽
    noStroke();
    fill(55, 28, 18);
    rect(barX, barY, barW, barH, 6);

    // 血量
    for (let i = 0; i < barW * ratio; i++) {
        let t = i / barW;
        let r = lerp(120, 200, t);
        let g = lerp(22, 38, t);
        let b = lerp(20, 28, t);
        stroke(r, g, b);
        line(barX + i, barY, barX + i, barY + barH);
    }
    noStroke();

    // 数字
    fill(230, 210, 160);
    textAlign(CENTER, CENTER);
    textSize(13);
    textFont('Georgia');
    text(`${playerHp}/${playerMaxHp}`, barX + barW / 2, barY + barH / 2 + 1);

    // 盖边框
    if (hpUIImg) {
        image(hpUIImg, frameX, frameY, frameW, frameH);
    }

    textAlign(LEFT, BASELINE);
}


// ==================== 投射物 / Projectiles ====================
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
        this.r = 5;
    }

    update(dt) {
        if (this.kind === 'seal') return;

        const speed = currentWeaponStats.speed;

        if (this.vx !== null && this.vy !== null) {
            this.x += this.vx * dt;
            this.y += this.vy * dt;
        } else {
            if (this.dir === 0) this.y += speed * dt;
            if (this.dir === 1) this.x += speed * dt;
            if (this.dir === 2) this.y -= speed * dt;
            if (this.dir === 3) this.x -= speed * dt;
        }

        let rect = new Rect(this.x - 10, this.y - 10, 20, 20, true);

        for (let w of wall) {
            if (rect.intersects(w)) {
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
            let angle = 0;

            if (this.vx !== null && this.vy !== null) {
                angle = atan2(this.vy, this.vx);
            } else {
                if (this.dir === 0) angle = HALF_PI;
                else if (this.dir === 1) angle = 0;
                else if (this.dir === 2) angle = -HALF_PI;
                else angle = PI;
            }

            translate(this.x - cam.x, this.y - cam.y);
            rotate(angle);

            imageMode(CENTER);
            if (arrowImg) {
                image(arrowImg, 0, 0, 28, 12);
            } else {
                stroke(92, 60, 32);
                strokeWeight(3);
                line(-8, 0, 8, 0);
            }
        } else {
            noStroke();
            fill(140, 210, 255);
            circle(this.x - cam.x, this.y - cam.y, this.r * 2);
        }

        pop();
    }
}

class HostileProjectile {
    constructor(x, y, vx, vy, damage, colorArr, sourceText) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = 5;
        this.damage = damage;
        this.colorArr = colorArr;
        this.sourceText = sourceText;
        this.alive = true;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        let rect = new Rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2, true);

        for (let w of wall) {
            if (rect.intersects(w)) {
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
        noStroke();
        fill(this.colorArr[0], this.colorArr[1], this.colorArr[2], 190);
        circle(this.x - cam.x, this.y - cam.y, this.r * 2);
        fill(255, 255, 255, 70);
        circle(this.x - cam.x, this.y - cam.y, this.r * 3);
        pop();
    }
}


// ==================== 敌人 / Enemies ====================
class Enemy {
    constructor(x, y) {
        this.rect = new Rect(x, y, 32, 48, true);
        this.dir = floor(random(4));
        this.speed = enemySpeed;
        this.alive = true;
        this.hp = random([30, 40]);
        this.changeTimer = random(1, 3);
        this.shootTimer = random(1.2, 2.3);
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
            damagePlayer(enemyTouchDamage, "A little ghost dragged you down!");
        }

        this.shootTimer -= dt;
        let ex = this.rect.left + this.rect.width / 2;
        let ey = this.rect.top + this.rect.height / 2;
        let px = player.left + player.width / 2;
        let py = player.top + player.height / 2;
        let dx = px - ex;
        let dy = py - ey;
        let dist = sqrt(dx * dx + dy * dy);

        if (dist < 230 && this.shootTimer <= 0) {
            let projSpeed = 120;
            let vx = (dx / max(dist, 1)) * projSpeed;
            let vy = (dy / max(dist, 1)) * projSpeed;

            enemyProjectiles.push(
                new HostileProjectile(ex, ey, vx, vy, enemyProjectileDamage, [180, 70, 70], "A little ghost shot you!")
            );

            this.shootTimer = random(1.4, 2.5);
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
            tint(255, 200);
            drawingContext.shadowBlur = 12;
            drawingContext.shadowColor = "rgba(180,220,255,0.6)";
            image(littleGhostImg, drawX, drawY, drawW, drawH);
            noTint();
            drawingContext.shadowBlur = 0;
        } else {
            noStroke();
            fill(170, 170, 255, 220);
            ellipse(drawX + drawW / 2, drawY + drawH * 0.45, drawW * 0.7, drawH * 0.75);
        }

        pop();
    }
}

class Boss {
    constructor(x, y) {
        this.rect = new Rect(x, y, 64, 64, true);
        this.hp = bossMaxHp;
        this.alive = true;
        this.lockedState = false;
        this.shootTimer = bossShootCooldown;
        this.floatPhase = random(TWO_PI);
    }

    update(dt) {
        if (!this.alive) return;

        let px = player.left + player.width / 2;
        let py = player.top + player.height / 2;
        let bx = this.rect.left + this.rect.width / 2;
        let by = this.rect.top + this.rect.height / 2;

        let dx = px - bx;
        let dy = py - by;
        let dist = sqrt(dx * dx + dy * dy);

        let oldLeft = this.rect.left;
        let oldTop = this.rect.top;

        if (dist > 130) {
            let vx = (dx / max(dist, 1)) * bossSpeed * dt;
            let vy = (dy / max(dist, 1)) * bossSpeed * dt;
            this.rect.left += vx;
            this.rect.top += vy;

            for (let w of wall) {
                if (this.rect.intersects(w)) {
                    this.rect.left = oldLeft;
                    this.rect.top = oldTop;
                    break;
                }
            }
        }

        this.shootTimer -= dt;
        if (dist < 340 && this.shootTimer <= 0) {
            this.fireFanShot(px, py);
            this.shootTimer = bossShootCooldown;
        }

        if (this.rect.intersects(player)) {
            damagePlayer(bossContactDamage, "The boss tore through you!");
        }
    }

    fireFanShot(px, py) {
        let bx = this.rect.left + this.rect.width / 2;
        let by = this.rect.top + this.rect.height / 2;

        let baseDx = px - bx;
        let baseDy = py - by;
        let baseAngle = atan2(baseDy, baseDx);
        let projSpeed = 105;
        let spread = radians(18);

        let angles = [baseAngle - spread, baseAngle, baseAngle + spread];

        for (let a of angles) {
            let vx = cos(a) * projSpeed;
            let vy = sin(a) * projSpeed;

            enemyProjectiles.push(
                new HostileProjectile(bx, by, vx, vy, bossProjectileDamage, [180, 60, 210], "The boss struck you down!")
            );
        }
    }

    draw() {
        push();

        let bob = sin(gTime * 1.9 + this.floatPhase) * 3;

        let drawW = this.rect.width * 1.2;
        let drawH = this.rect.height * 1.2;

        let drawX = this.rect.left - cam.x - (drawW - this.rect.width) / 2;
        let drawY = this.rect.top - cam.y + this.rect.height - drawH + bob;

        imageMode(CORNER);

        if (bossImg) {
            if (this.lockedState) {
                tint(255, 180, 180, 220);
                drawingContext.shadowBlur = 16;
                drawingContext.shadowColor = "rgba(255,120,120,0.6)";
            } else {
                tint(255, 255);
                drawingContext.shadowBlur = 16;
                drawingContext.shadowColor = "rgba(180,100,255,0.55)";
            }

            image(bossImg, drawX, drawY, drawW, drawH);
            noTint();
            drawingContext.shadowBlur = 0;

            // 下半部分轻微融入背景
            noStroke();
            for (let i = 0; i < 10; i++) {
                let a = map(i, 0, 9, 0, 18);
                fill(8, 10, 14, a);
                rect(drawX, drawY + drawH * 0.58 + i * 3, drawW, 3);
            }
        } else {
            noStroke();
            fill(95, 20, 125, 220);
            ellipse(drawX + drawW / 2, drawY + drawH / 2, drawW * 0.8, drawH * 0.8);
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
        if (object.intersects(w)) return true;
    }
    return false;
}

function triggerPopUp(title, message, time, requireEnter = false) {
    if (requireEnter) {
        endTimePopUp = Infinity;
        popupRequiresEnter = true;
    } else {
        endTimePopUp = elapsedTime + time;
        popupRequiresEnter = false;
    }

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
            if (mazeMap.gridMap[y][x] === 1) terrain.push(new Rect(x * blockSize, y * blockSize, blockSize, blockSize, true));
            else wall.push(new Rect(x * blockSize, y * blockSize, blockSize, blockSize, true, 0));
        }
    }

    worldWidth = mazeMap.gridW * blockSize;
    worldHeight = mazeMap.gridH * blockSize;
}

function carveBossArena() {
    let arenaX = worldWidth - 12 * blockSize;
    let arenaY = worldHeight - 9 * blockSize;
    let arenaW = 9 * blockSize;
    let arenaH = 7 * blockSize;

    let newWall = [];
    let newTerrain = [...terrain];

    for (let w of wall) {
        let insideArena =
            w.left >= arenaX &&
            w.left < arenaX + arenaW &&
            w.top >= arenaY &&
            w.top < arenaY + arenaH;

        if (insideArena) newTerrain.push(new Rect(w.left, w.top, blockSize, blockSize, true));
        else newWall.push(w);
    }

    wall = newWall;
    terrain = newTerrain;
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
    const seed = abs(gx * 17 + gy * 23) % 24;

    let img = floorPlain01Img;

    if (seed <= 9 && floorPlain01Img) {
        img = floorPlain01Img;
    } else if (seed <= 16 && floorPlain02Img) {
        img = floorPlain02Img;
    } else if (seed <= 21 && floorPlain03Img) {
        img = floorPlain03Img;
    } else if (floorCrackedGlowImg) {
        img = floorCrackedGlowImg;
    }

    if (img) {
        g.image(img, x, y, blockSize, blockSize);
    } else {
        g.push();
        g.noStroke();
        g.fill(86, 92, 106);
        g.rect(x, y, blockSize, blockSize);
        g.pop();
    }
}

function drawWallToLayer(g, x, y) {
    if (wallLevel3Img) {
        g.image(wallLevel3Img, x, y, blockSize, blockSize);
    } else {
        g.push();
        g.noStroke();
        g.fill(36, 42, 54);
        g.rect(x, y, blockSize, blockSize);
        g.pop();
    }
}


// ==================== UI / Screens ====================
function drawStart() {
    fill(50, 65, 98);
    noStroke();
    rect(width / 2 - 190, height / 2 - 86, 380, 172, 8);

    textAlign(CENTER);
    fill(255);
    textSize(30);
    textFont('Impact');
    text('Explorer Camp - Level 3', width / 2, height / 2 - 28);

    textSize(12);
    textFont('Arial');
    text("Find the map, light, lock and key.", width / 2, height / 2 + 2);
    text("Use portals, survive the little ghosts, seal the boss.", width / 2, height / 2 + 20);
    text(`Starting weapon: ${currentWeaponStats.name}`, width / 2, height / 2 + 40);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press ENTER to start", width / 2, height / 2 + 64);
    }

    textAlign(LEFT);
}

function drawEnd() {
    fill(50, 65, 98);
    noStroke();
    rect(width / 2 - 180, height / 2 - 80, 360, 170, 8);

    textAlign(CENTER);
    fill(255);
    textSize(24);
    textFont('Impact');
    text('LEVEL 3 COMPLETE', width / 2, height / 2 - 38);

    textSize(12);
    textFont('Arial');
    text(`Small kills: ${smallKillCount}`, width / 2, height / 2 - 8);
    text(`Boss sealed: Yes`, width / 2, height / 2 + 12);
    text(`Item Codex: ${getCodexDisplayText()}`, width / 2, height / 2 + 34);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press ESC to restart", width / 2, height / 2 + 66);
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
    rect(width / 2 - 180, height / 2 - 82, 360, 170, 8);

    textAlign(CENTER);
    fill(255);
    textSize(20);
    textFont('Impact');
    text('GAME OVER', width / 2, height / 2 - 42);

    textSize(11);
    textFont('Arial');
    text(gameoverMsg, width / 2, height / 2 - 16);
    text(`Small kills: ${smallKillCount}`, width / 2, height / 2 + 10);
    text(`Item Codex: ${getCodexDisplayText()}`, width / 2, height / 2 + 30);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press ESC to restart", width / 2, height / 2 + 58);
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
    rect(width / 2 - 230, 56, 460, 390, 8);

    textAlign(CENTER);
    fill(255);
    textSize(16);
    textFont('Arial');
    text('Instructions', width / 2, 90);

    textAlign(LEFT);
    textSize(12);
    noStroke();

    text('Find the chest first to unlock the mini map.', width / 2 - 210, 132);
    text('The fog covers the whole map at first.', width / 2 - 210, 152);
    text('Find the light to unlock the lit vision area.', width / 2 - 210, 172);
    text('Inside the lit area, your weapon can auto-lock targets.', width / 2 - 210, 192);
    text('You start this level with your remembered weapon from Level 2.', width / 2 - 210, 212);
    text('Find both the lock and the key to unlock the Seal.', width / 2 - 210, 232);
    text('Use SHIFT to switch between Crossbow / Ring / Seal.', width / 2 - 210, 252);
    text('The boss cannot be cleared by damage alone.', width / 2 - 210, 272);
    text('When the boss enters locked HP state, switch to Seal and', width / 2 - 210, 292);
    text('press SPACE near it to finish the level.', width / 2 - 210, 312);
    text("Use Arrow Keys or WASD to move.", width / 2 - 210, 336);
    text("Press 'M' to show/hide the mini map and 'P' to pause.", width / 2 - 210, 356);

    textAlign(CENTER);
    textSize(10);
    stroke(255);
    strokeWeight(2);
    noFill();

    text('Up', width / 2, 350);
    rect(width / 2 - 22.5, 325, 45, 45, 10);

    text('Left', width / 2 - 50, 401);
    rect(width / 2 - 72.5, 375, 45, 45, 10);

    text('Down', width / 2, 401);
    rect(width / 2 - 22.5, 375, 45, 45, 10);

    text('Right', width / 2 + 50, 401);
    rect(width / 2 + 27.5, 375, 45, 45, 10);

    push();
    textAlign(CENTER, CENTER);
    textFont('Arial');
    textSize(12);
    fill(255);
    noStroke();
    strokeWeight(0);

    if (floor(gTime * 3) % 2 === 1) {
        text("Press 'Enter' to continue", width / 2, 425);
    }
    pop();

    textAlign(LEFT);
}

function drawMiniMap() {
    let frameW = 215;
    let frameH = 200;

    let frameX = -5;
    let frameY = height - frameH + 15;

    let innerX = frameX + 51;
    let innerY = frameY + 43.5;
    let innerW = 108;
    let innerH = 112;

    let scaleX = innerW / mazeMap.gridW;
    let scaleY = innerH / mazeMap.gridH;
    let scale = min(scaleX, scaleY);

    fill(230, 210, 160);
    noStroke();
    rect(innerX, innerY, innerW, innerH, 4);

    fill(60, 40, 20);
    for (let w of wall) {
        rect(
            (w.left / blockSize) * scale + innerX,
            (w.top / blockSize) * scale + innerY,
            scale,
            scale
        );
    }

    // 传送点
    fill(150, 80, 255);
    for (let p of portals) {
        circle(
            (p.left / blockSize) * scale + innerX + 1,
            (p.top / blockSize) * scale + innerY + 1,
            4
        );
    }

    // light
    if (!hasLight) {
        fill(255, 220, 0);
        circle(
            (lightItem.left / blockSize) * scale + innerX + 1,
            (lightItem.top / blockSize) * scale + innerY + 1,
            4
        );
    }

    // lock
    if (!hasLock) {
        fill(220, 190, 120);
        circle(
            (lockItem.left / blockSize) * scale + innerX + 1,
            (lockItem.top / blockSize) * scale + innerY + 1,
            4
        );
    }

    // key
    if (!hasKey) {
        fill(120, 220, 120);
        circle(
            (keyItem.left / blockSize) * scale + innerX + 1,
            (keyItem.top / blockSize) * scale + innerY + 1,
            4
        );
    }

    // 小怪
    fill(120, 0, 120);
    for (let e of enemies) {
        circle(
            (e.rect.left / blockSize) * scale + innerX + 1,
            (e.rect.top / blockSize) * scale + innerY + 1,
            3
        );
    }

    // boss
    if (boss && boss.alive) {
        fill(boss.lockedState ? 255 : 90, boss.lockedState ? 90 : 0, 150);
        circle(
            (boss.rect.left / blockSize) * scale + innerX + 1,
            (boss.rect.top / blockSize) * scale + innerY + 1,
            6
        );
    }

    // 玩家
    fill(200, 30, 30);
    circle(
        (player.left / blockSize) * scale + innerX + 1,
        (player.top / blockSize) * scale + innerY + 1,
        4
    );

    if (mapUIImg) {
        image(mapUIImg, frameX, frameY, frameW, frameH);
    }
}

function drawElapsedTime() {
    let frameW = 120;
    let frameH = 100;

    let frameX = width / 2 - frameW / 2;
    let frameY = -20;

    let innerW = 76;
    let innerH = 35;

    let innerX = frameX + (frameW - innerW) / 2;
    let innerY = frameY + (frameH - innerH) / 1.8;

    // ===== 背景（羊皮纸色）=====
    fill(230, 210, 160);
    noStroke();
    rect(innerX, innerY, innerW, innerH, 6);

    // ===== 文字（深棕）=====
    fill(60, 40, 20);
    textAlign(CENTER, CENTER);
    textSize(20);
    textFont('Georgia');
    text(convertTime(elapsedTime), innerX + innerW / 2, innerY + innerH / 2 + 1);

    // ===== 金框盖上 =====
    if (timeUIImg) {
        image(timeUIImg, frameX, frameY, frameW, frameH);
    }

    textAlign(LEFT, BASELINE);
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
    lockItem = null;
    keyItem = null;

    portals = [];
    projectiles = [];
    enemyProjectiles = [];
    enemies = [];
    boss = null;

    hasMiniMap = false;
    hasLight = false;
    hasCrossbow = true;
    hasRing = hasCodexItem('ring');
    hasLock = false;
    hasKey = false;
    bossSealed = false;

    playerHp = playerMaxHp;
    playerInvulnTimer = 0;
    attackCooldownTimer = 0;
    teleportCooldownTimer = 0;

    smallKillCount = 0;

    endTimePopUp = 0;
    popUpTitle = '';
    popUpMessage = '';
    gameoverMsg = '';
    popupRequiresEnter = false;

    bossSealAnimating = false;
    bossSealAnimTime = 0;

    setup();
}
