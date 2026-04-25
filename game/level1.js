// ==================== 游戏常量 / Game constants ====================

// 暂停键和小地图键 / Pause key and mini-map key
const KEY_PAUSE = 80, KEY_M = 77;
const KEY_W = 87, KEY_A = 65, KEY_S = 83, KEY_D = 68;

// 单个方块大小 / Single tile size
const blockSize = 32;

// 小地图缩放比例 / Mini-map scale
const miniMapScale = 3;

// 迷宫逻辑宽高 / Maze logical width and height
const mazeW = 16;
const mazeH = 16;

// 时间限制（分钟） / Time limit (minutes)
const timeLimit = 5;


// ==================== 图片素材 / Image assets ====================

// 地板
let floorPlain01Img;
let floorPlain03Img;
let floorPlain04Img;
let floorCrackedGlowImg;

// 墙
let wallImg;

// 出口传送阵
let exitPortalImg;

// 宝箱
let boxImg;

// 弩箭
let crossbowImg;

// UI
let mapUIImg;
let timeUIImg;

// ==================== 游戏变量 / Game variables ====================

// 世界总宽度 / Total world width
let worldWidth = 0;

// 世界总高度 / Total world height
let worldHeight = 0;

// 游戏运行总时间 / Total running time
let gTime = 0;

// 已经过的关卡时间 / Elapsed level time
let elapsedTime = 0;

// 最后一次按键 / Last key pressed
let lastKeyPress = null;

// 是否暂停 / Whether the game is paused
let pause = true;

// 是否游戏失败 / Whether the game is over
let gameover = false;

// 是否处于开始界面 / Whether the game is at start screen
let start = true;

// 是否通关 / Whether the player has won
let end = false;

// 是否正在移动 / Whether the player is moving
let moving = false;

// 是否显示说明面板
let showInstructions = false;

// 建立墙体查询表 / Create a wall search table
let wallLookup = new Set();


// ==================== 游戏对象 / Game objects ====================

// 迷宫对象 / Maze object
let mazeMap;

// 相机对象 / Camera object
let cam;

// 墙体数组 / Wall tiles
let wall = [];

// 地面数组 / Terrain tiles
let terrain = [];

// 出口区域数组 / Exit portal tiles
let exitTiles = [];

// 宝箱 / Chest
let box;

// 弩箭 / Crossbow
let crossbow;

// 玩家 / Player
let player;

// 玩家朝向 / Player direction
let dir = 0;


// ==================== 道具状态 / Item states ====================

// 是否拿到小地图 / Whether the mini-map has been collected
let hasMiniMap = false;

// 是否拿到弩箭 / Whether the crossbow has been collected
let hasCrossbow = false;

// 是否显示小地图 / Whether to show the mini-map
let showMiniMap = true;

// 弹窗结束时间 / Popup end time
let endTimePopUp = 0;

// 弹窗标题 / Popup title
let popUpTitle = '';

// 弹窗内容 / Popup message
let popUpMessage = '';

// 游戏结束提示 / Game over message
let gameoverMsg = '';


function preload() {
    floorPlain01Img = loadImage('assets/floor_plain_01.png');
    floorPlain03Img = loadImage('assets/floor_plain_03.png');
    floorPlain04Img = loadImage('assets/floor_plain_04.png');
    floorCrackedGlowImg = loadImage('assets/floor_cracked_glow.png');
    wallImg = loadImage('assets/wall_column_tall.png');
    exitPortalImg = loadImage('assets/exit.png');
    boxImg = loadImage('assets/box.png');
    crossbowImg = loadImage('assets/crossbow.png');
    mapUIImg = loadImage('assets/map.png');
    timeUIImg = loadImage('assets/time.png');
    preloadSelectedCharacterSprites();
    uiPreload();
}


// ==================== 初始化 / Setup ====================

function setup() {
    createCanvas(800, 600);
    setupSelectedCharacter();
    
    mazeMap = new Maze(mazeW, mazeH, 'random', 1, 1);
    player = new Rect(32, 32, 32, 48, true);
    cam = new Camera();

    setMap();

    // ==================== 宝箱：入口附近随机生成 ====================
    let boxMinX = blockSize * 5;
    let boxMaxX = blockSize * 20;
    let boxMinY = blockSize * 5;
    let boxMaxY = blockSize * 12;

    let boxX = floor(random(boxMinX, boxMaxX));
    let boxY = floor(random(boxMinY, boxMaxY));
    box = new Rect(boxX, boxY, blockSize, blockSize, true);

    while (
        boxX % blockSize !== 0 ||
        boxY % blockSize !== 0 ||
        intersectsWall(box)
    ) {
        boxX = floor(random(boxMinX, boxMaxX));
        boxY = floor(random(boxMinY, boxMaxY));
        box = new Rect(boxX, boxY, blockSize, blockSize, true);
    }

    // ==================== 弩箭：地图随机位置 ====================
    let crossbowX = floor(random(64, (mazeMap.gridH - 4) * blockSize));
    let crossbowY = floor(random(96, (mazeMap.gridW - 4) * blockSize));
    crossbow = new Rect(crossbowX, crossbowY, blockSize, blockSize, true);

    while (
        crossbowX % blockSize !== 0 ||
        crossbowY % blockSize !== 0 ||
        intersectsWall(crossbow) ||
        crossbow.intersects(box)
    ) {
        crossbowX = floor(random(64, (mazeMap.gridH - 4) * blockSize));
        crossbowY = floor(random(96, (mazeMap.gridW - 4) * blockSize));
        crossbow = new Rect(crossbowX, crossbowY, blockSize, blockSize, true);
    }

    cam.focus(player.left, player.top);
}


// ==================== 主循环 / Main loop ====================

function draw() {
    let dt = window.deltaTime / 1000;

    if (dt > 1) dt = 0;

    act(dt);
    drawGame();
}


// ==================== 游戏绘制 / Game rendering ====================

function drawGame() {
    background(0);

    drawMaze();
    drawPlayer();

    // 绘制宝箱
    if (!hasMiniMap) {
        drawBox(box.left - cam.x, box.top - cam.y);
    }

    // 绘制弩箭
    if (!hasCrossbow && hasMiniMap) {
        drawCrossbow(crossbow.left - cam.x, crossbow.top - cam.y);
    }

    if (endTimePopUp > elapsedTime) {
        drawPopUp();
    }

    if (hasMiniMap && showMiniMap) {
        drawMiniMap();
    }

    if (pause) {
        if (start) {
            drawStart_L1();
        } else if (end) {
            drawEnd_L1();
        } else if (gameover) {
            drawGameOver_L1();
        } else {
            drawPause_L1();
        }
    }

    if (showInstructions) {
        drawInformation();
    }

    drawElapsedTime();
    drawMenuButton();
    if (menuOpen) drawMenuPanel();
    uiEndFrame();
}


// ==================== 游戏逻辑 / Game logic ====================

function act(deltaTime) {
    gTime += deltaTime;

    if (showInstructions) return;

    if (!pause) {
        if (elapsedTime > timeLimit * 60) {
            gameover = true;
            gameoverMsg = "You have run out of time!";
            pause = true;
        }

        elapsedTime += deltaTime;

        let moveUp = keyIsDown(UP_ARROW) || keyIsDown(KEY_W);
        let moveRight = keyIsDown(RIGHT_ARROW) || keyIsDown(KEY_D);
        let moveDown = keyIsDown(DOWN_ARROW) || keyIsDown(KEY_S);
        let moveLeft = keyIsDown(LEFT_ARROW) || keyIsDown(KEY_A);

        if (moveUp) {
            dir = 2;
            moving = true;
            player.top -= 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.top = w.bottom;
                }
            }

            checkItemCollisions('up');
        }

        if (moveRight) {
            dir = 1;
            moving = true;
            player.left += 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.right = w.left;
                }
            }

            checkItemCollisions('right');
        }

        if (moveDown) {
            dir = 0;
            moving = true;
            player.top += 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.bottom = w.top;
                }
            }

            checkItemCollisions('down');
        }

        if (moveLeft) {
            dir = 3;
            moving = true;
            player.left -= 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.left = w.right;
                }
            }

            checkItemCollisions('left');
        }

        if (!moveUp && !moveRight && !moveDown && !moveLeft) {
            moving = false;
        }

        cam.focus(player.left, player.top);
    }
}


function mousePressed() {
    uiMousePressed();
}

// ==================== 键盘事件 / Keyboard events ====================

function keyPressed() {
    uiKeyPressed();
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

    if (!start && !showInstructions && keyCode === KEY_PAUSE) {
        pause = !pause;
    }

    if (keyCode === ESCAPE && (end || gameover)) {
        resetGame();
    }

    if (keyCode === KEY_M) {
        showMiniMap = !showMiniMap;
    }
}

function keyReleased() {
    moving = false;
}


// ==================== 绘制图形函数 / Drawing functions ====================

function drawPlayer() {
    drawSelectedCharacter(player, cam, dir, moving, elapsedTime);
}


// 绘制宝箱图片
function drawBox(x, y) {
    push();

    imageMode(CORNER);

    if (boxImg) {
        image(boxImg, x + 1, y + 1, blockSize - 2, blockSize - 2);
    } else {
        fill(139, 69, 19);
        noStroke();
        rect(x + 4, y + 12, 24, 16, 3);

        fill(160, 82, 45);
        rect(x + 4, y + 8, 24, 6, 3);

        fill(255, 215, 0);
        rect(x + 14, y + 16, 4, 8, 2);
        ellipse(x + 16, y + 18, 6, 6);
    }

    pop();
}


// 绘制弩箭图片
function drawCrossbow(x, y) {
    push();

    imageMode(CORNER);

    if (crossbowImg) {
        image(crossbowImg, x, y, blockSize, blockSize);
    } else {
        fill(120, 80, 40);
        noStroke();
        rect(x + 8, y + 12, 16, 6, 2);
        stroke(90, 60, 30);
        strokeWeight(2);
        line(x + 6, y + 10, x + 26, y + 10);
        line(x + 6, y + 22, x + 26, y + 22);
        line(x + 24, y + 10, x + 28, y + 16);
        line(x + 24, y + 22, x + 28, y + 16);
    }

    pop();
}


function hasWallAt(gridX, gridY) {
    return wallLookup.has(`${gridX},${gridY}`);
}


function drawRotatedImage(img, x, y, angle) {
    push();
    translate(x + blockSize / 2, y + blockSize / 2);
    rotate(angle);
    imageMode(CENTER);
    image(img, 0, 0, blockSize, blockSize);
    imageMode(CORNER);
    pop();
}


function drawWall(tile) {
    let x = tile.left - cam.x;
    let y = tile.top - cam.y;

    if (wallImg) {
        image(wallImg, x, y, blockSize, blockSize);
    } else {
        fill(80);
        noStroke();
        rect(x, y, blockSize, blockSize);
    }
}


function drawTerrain(tile) {
    push();

    let x = tile.left - cam.x;
    let y = tile.top - cam.y;

    let worldCol = floor(tile.left / blockSize);
    let worldRow = floor(tile.top / blockSize);
    let seed = abs(worldCol * 17 + worldRow * 23) % 20;

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
        image(img, x, y, blockSize, blockSize);
    } else {
        fill(180);
        noStroke();
        rect(x, y, blockSize, blockSize);
    }

    pop();
}


function drawExitPortal() {
    if (!exitTiles || exitTiles.length === 0) return;

    let minLeft = Infinity;
    let minTop = Infinity;

    for (let tile of exitTiles) {
        if (tile.left < minLeft) minLeft = tile.left;
        if (tile.top < minTop) minTop = tile.top;
    }

    let centerX = minLeft - cam.x + blockSize;
    let baseY = minTop - cam.y + blockSize;

    let floatOffset = sin(gTime * 2.2) * 3;
    let portalSize = blockSize * 1.65;

    push();

    noStroke();
    fill(0, 0, 0, 45);
    ellipse(centerX, baseY + 10, portalSize * 0.9, portalSize * 0.35);

    translate(centerX, baseY + floatOffset);

    let glow = 14 + sin(gTime * 3) * 5;
    drawingContext.shadowBlur = glow;
    drawingContext.shadowColor = 'rgba(255, 210, 80, 0.85)';

    imageMode(CENTER);

    if (exitPortalImg) {
        image(exitPortalImg, 0, 0, portalSize, portalSize);
    } else {
        noStroke();
        fill(255, 210, 80, 180);
        ellipse(0, 0, blockSize * 1.5, blockSize * 1.5);

        stroke(255, 240, 120);
        strokeWeight(3);
        noFill();
        ellipse(0, 0, blockSize * 1.25, blockSize * 1.25);
        ellipse(0, 0, blockSize * 0.9, blockSize * 0.9);
    }

    imageMode(CORNER);
    pop();
}


// ==================== 工具函数 / Utility functions ====================

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


// ==================== 类定义 / Class definitions ====================

class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    focus(x, y) {
        this.x = x - width / 2;
        this.y = y - height / 2;

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > worldWidth - width) {
            this.x = worldWidth - width;
        }

        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > worldHeight - height) {
            this.y = worldHeight - height;
        }
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

    get x() {
        return this.left + this.width / 2;
    }

    set x(value) {
        this.left = value - this.width / 2;
    }

    get y() {
        return this.top + this.height / 2;
    }

    set y(value) {
        this.top = value - this.height / 2;
    }

    get right() {
        return this.left + this.width;
    }

    set right(value) {
        this.left = value - this.width;
    }

    get bottom() {
        return this.top + this.height;
    }

    set bottom(value) {
        this.top = value - this.height;
    }

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

        for (let mh = 0; mh < h; mh++) {
            this.map[mh] = [];
            for (let mw = 0; mw < w; mw++) {
                this.map[mh][mw] = { N: 0, S: 0, E: 0, W: 0, V: 0 };
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

        for (let mh = 0; mh < (this.h * 3 + 1); mh++) {
            grid[mh] = [];
            for (let mw = 0; mw < (this.w * 3 + 1); mw++) {
                grid[mh][mw] = 0;
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
        this.gridW = grid.length;
        this.gridH = grid[0].length;
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


// ==================== 地图设置 / Map setup ====================

function setMap() {
    let col = 0, row = 0;

    for (col = 0; col < mazeMap.gridH; col++) {
        for (row = 0; row < mazeMap.gridW; row++) {
            if (mazeMap.gridMap[col][row] === 1) {
                terrain.push(
                    new Rect(col * blockSize, row * blockSize, blockSize, blockSize, true)
                );
            } else {
                wall.push(
                    new Rect(col * blockSize, row * blockSize, blockSize, blockSize, true, 0)
                );
                wallLookup.add(`${col},${row}`);
            }
        }
    }

    exitTiles.push(new Rect((col - 2) * blockSize, (row - 2) * blockSize, blockSize, blockSize, true, 1));
    exitTiles.push(new Rect((col - 2) * blockSize, (row - 3) * blockSize, blockSize, blockSize, true, 3));
    exitTiles.push(new Rect((col - 3) * blockSize, (row - 2) * blockSize, blockSize, blockSize, true, 0));
    exitTiles.push(new Rect((col - 3) * blockSize, (row - 3) * blockSize, blockSize, blockSize, true, 2));

    worldWidth = mazeMap.gridH * blockSize;
    worldHeight = mazeMap.gridW * blockSize;
}


// ==================== 界面绘制 / UI drawing ====================

function drawStart_L1() {
    let blink = floor(gTime * 3) % 2 === 1;
    drawUnifiedScreen('start',
        'Explorer Camp',
        ["Find the exit of the maze.",
         "Collect the chest to unlock the mini map,",
         "then find the crossbow."],
        "Press ENTER to start",
        blink
    );
}

function drawEnd_L1() {
    let blink = floor(gTime * 3) % 2 === 1;
    drawUnifiedScreen('end',
        'You Escaped!',
        ["Congratulations, you became an Explorer!"],
        "Press ESC to restart",
        blink
    );
}

function drawPause_L1() {
    let blink = floor(gTime * 3) % 2 === 1;
    drawUnifiedScreen('pause',
        'Paused',
        ["Press P to resume."],
        "Press P to resume",
        blink
    );
}

function drawGameOver_L1() {
    let blink = floor(gTime * 3) % 2 === 1;
    drawUnifiedScreen('gameover',
        'Game Over',
        [gameoverMsg, "Better luck next time."],
        "Press ESC to restart",
        blink
    );
}


function drawPopUp() {
    if (endTimePopUp > gTime) {  // ← elapsedTime 改 gTime
        drawUnifiedPopUp(popUpTitle, popUpMessage);
    }
}


function drawInformation() {
    let bx = width / 2 - 230;
    let by = 80;
    let bw = 460;
    let bh = 500;

    drawInstructionBox(bx, by, bw, bh);

    textAlign(CENTER);
    fill(248, 232, 190);
    textSize(17);
    textFont('Georgia');
    textStyle(BOLD);
    text('Instructions', width / 2, by + 60);
    textStyle(NORMAL);

    fill(230, 200, 150);
    textSize(12);
    textAlign(LEFT);

    let tx = bx + 65;
    let ty = by + 110;
    let gap = 20;

    text('To become an explorer, find the exit of the maze.', tx, ty);
    text('Collect the chest first to unlock the mini map.', tx, ty + gap);
    text('After that, search for the crossbow.', tx, ty + gap * 2);
    text('You need the crossbow before leaving the maze.', tx, ty + gap * 3);
    text('Be careful — your escape time is limited.', tx, ty + gap * 4);
    text('Use Arrow Keys or WASD to move.', tx, ty + gap * 5);
    text("Press 'M' to show/hide the mini map.", tx, ty + gap * 6);
    text("Press 'P' to pause the game.", tx, ty + gap * 7);

    textAlign(CENTER);
    textSize(10);
    stroke(255);
    strokeWeight(2);
    noFill();

    let kx = width / 2;
    let ky = by + gap * 13 + 60;

    drawKeyBox(kx - 22.5, ky + 5, 45, 45, 'Up');
    drawKeyBox(kx - 72.5, ky + 55, 45, 45, 'Left');
    drawKeyBox(kx - 22.5, ky + 55, 45, 45, 'Down');
    drawKeyBox(kx + 27.5, ky + 55, 45, 45, 'Right');

    push();
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    textStyle(NORMAL);
    textSize(12);
    fill(230, 200, 150);
    noStroke();

    if (floor(gTime * 3) % 2 === 1) {
        text("Press 'Enter' to continue", width / 2, ky + 130);
    }

    pop();

    textAlign(LEFT);
}

function drawKeyBox(x, y, w, h, label) {
    push();

    stroke(255);
    strokeWeight(2);
    noFill();
    rect(x, y, w, h, 10);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    textFont('Georgia');
    textStyle(BOLD);
    text(label, x + w / 2, y + h / 2);

    pop();
}


function drawMaze() {
    for (let t of terrain) {
        drawTerrain(t);
    }

    for (let w of wall) {
        drawWall(w);
    }

    drawExitPortal();
}


function drawMiniMap() {
    let frameW = 215;
    let frameH = 200;

    let frameX = -5;
    let frameY = height - frameH + 15;

    // ===== 内部区域 =====
    let innerX = frameX + 51;
    let innerY = frameY + 43.5;
    let innerW = 108;
    let innerH = 112;

    let scaleX = innerW / mazeMap.gridW;
    let scaleY = innerH / mazeMap.gridH;
    let scale = min(scaleX, scaleY);

    // ===== 背景（羊皮纸色）=====
    fill(230, 210, 160);
    noStroke();
    rect(innerX, innerY, innerW, innerH, 4);

    // ===== 墙 =====
    fill(60, 40, 20);
    for (let w of wall) {
        rect(
            (w.left / blockSize) * scale + innerX,
            (w.top / blockSize) * scale + innerY,
            scale,
            scale
        );
    }

    // ===== 出口 =====
    let exitTile = exitTiles[0];
    fill(0, 200, 0);
    rect(
        (exitTile.left / blockSize) * scale + innerX,
        (exitTile.top / blockSize) * scale + innerY,
        scale,
        scale
    );

    // ===== 弩箭 =====
    if (!hasCrossbow) {
        fill(120, 220, 255);
        circle(
            (crossbow.left / blockSize) * scale + innerX + 1,
            (crossbow.top / blockSize) * scale + innerY + 1,
            4
        );
    }

    // ===== 玩家 =====
    fill(200, 30, 30);
    circle(
        (player.left / blockSize) * scale + innerX + 1,
        (player.top / blockSize) * scale + innerY + 1,
        4
    );

    // ===== 金框盖上 =====
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


// ==================== 碰撞检测 / Collision detection ====================

function intersectsWall(object) {
    for (let w of wall) {
        if (object.intersects(w)) {
            return true;
        }
    }
    return false;
}


function checkItemCollisions(direction) {
    if (!hasMiniMap && player.intersects(box)) {
        boxIntersects();

        if (direction === 'up') player.top = box.bottom;
        if (direction === 'right') player.right = box.left;
        if (direction === 'down') player.bottom = box.top;
        if (direction === 'left') player.left = box.right;
    }

    if (!hasCrossbow && hasMiniMap && player.intersects(crossbow)) {
        crossbowIntersects();

        if (direction === 'up') player.top = crossbow.bottom;
        if (direction === 'right') player.right = crossbow.left;
        if (direction === 'down') player.bottom = crossbow.top;
        if (direction === 'left') player.left = crossbow.right;
    }

    exitIntersects();
}


// 宝箱碰撞逻辑
function boxIntersects() {
    triggerPopUp(
        "Mini Map found!",
        "You can show/hide the Map pressing 'M' \n \n Now, you should search for the crossbow",
        3
    );
    hasMiniMap = true;
}


// 弩箭碰撞逻辑
function crossbowIntersects() {
    triggerPopUp(
        "Crossbow found!",
        "Now, you should search the exit portal.",
        3
    );
    hasCrossbow = true;
}


// 出口碰撞逻辑
function exitIntersects() {
    let touchingExit = false;

    for (let tile of exitTiles) {
        if (player.intersects(tile)) {
            touchingExit = true;
            break;
        }
    }

    if (touchingExit) {
        if (hasCrossbow) {
            end = true;
            pause = true;
        } else {
            gameover = true;
            gameoverMsg = "You need the crossbow before leaving the maze!";
            pause = true;
        }
    }
}


function triggerPopUp(title, message, time) {
    endTimePopUp = gTime + time;
    popUpTitle = title;
    popUpMessage = message;
}


// ==================== 重置游戏 / Reset game ====================

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
    exitTiles = [];
    dir = 0;

    wallLookup = new Set();

    hasMiniMap = false;
    hasCrossbow = false;
    showMiniMap = true;
    endTimePopUp = 0;
    popUpTitle = '';
    popUpMessage = '';
    gameoverMsg = '';

    setup();
}
