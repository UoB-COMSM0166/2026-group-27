// ==================== 游戏常量 / Game constants ====================

// 暂停键和小地图键 / Pause key and mini-map key
const KEY_PAUSE = 80, KEY_M = 77;

// 单个方块大小 / Single tile size
const blockSize = 32;

// 小地图缩放比例 / Mini-map scale
const miniMapScale = 3;

// 迷宫逻辑宽高 / Maze logical width and height
const mazeW = 16;
const mazeH = 16;

// 时间限制（分钟） / Time limit (minutes)
const timeLimit = 5; // 5分钟时间限制 / 5-minute time limit


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


// ==================== 游戏对象 / Game objects ====================

// 迷宫对象 / Maze object
let mazeMap;

// 相机对象 / Camera object
let cam;

// 墙体数组 / Wall tiles
let wall = [];

// 地面数组 / Terrain tiles
let terrain = [];

// 水域数组 / Water tiles
let water = [];

// 宝箱 / Chest
let box;

// 脚蹼 / Flipper
let flipper;

// 呼吸管 / Snorkel
let snorkel;

// 玩家 / Player
let player;

// 玩家朝向 / Player direction
let dir = 0;


// ==================== 道具状态 / Item states ====================

// 是否拿到小地图 / Whether the mini-map has been collected
let hasMiniMap = false;

// 是否拿到脚蹼 / Whether the flipper has been collected
let hasFlipper = false;

// 是否拿到呼吸管 / Whether the snorkel has been collected
let hasSnorkel = false;

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

// 说明面板结束时间 / Instruction panel end time
let endTimeInformation = 0;


// ==================== 初始化 / Setup ====================

function setup() {
    createCanvas(800, 600);

    // 创建迷宫 / Create maze
    mazeMap = new Maze(mazeW, mazeH, 'random', 1, 1);

    // 创建玩家 / Create player
    player = new Rect(32, 32, 32, 48, true);

    // 创建相机 / Create camera
    cam = new Camera();

    // 设置地图 / Set map
    setMap();

    // 创建宝箱（随机位置） / Create chest (random position)
    let x = floor(random(64, width - blockSize));
    let y = floor(random(96, height - blockSize));
    box = new Rect(x, y, blockSize, blockSize, true);

    while (x % blockSize !== 0 || y % blockSize !== 0 || intersectsWall(box)) {
        x = floor(random(64, width - blockSize));
        y = floor(random(96, height - blockSize));
        box = new Rect(x, y, blockSize, blockSize, true);
    }

    // 创建呼吸管 / Create snorkel
    x = floor(random(64, (mazeMap.gridH - 4) * blockSize));
    y = floor(random(96, (mazeMap.gridW - 4) * blockSize));
    snorkel = new Rect(x, y, blockSize, blockSize, true);

    while (
        x % blockSize !== 0 ||
        y % blockSize !== 0 ||
        intersectsWall(snorkel) ||
        snorkel.intersects(box)
    ) {
        x = floor(random(64, (mazeMap.gridH - 4) * blockSize));
        y = floor(random(96, (mazeMap.gridW - 4) * blockSize));
        snorkel = new Rect(x, y, blockSize, blockSize, true);
    }

    // 创建脚蹼 / Create flipper
    x = floor(random(64, (mazeMap.gridH - 4) * blockSize));
    y = floor(random(96, (mazeMap.gridW - 4) * blockSize));
    flipper = new Rect(x, y, blockSize, blockSize, true);

    while (
        x % blockSize !== 0 ||
        y % blockSize !== 0 ||
        intersectsWall(flipper) ||
        flipper.intersects(box) ||
        flipper.intersects(snorkel)
    ) {
        x = floor(random(64, (mazeMap.gridH - 4) * blockSize));
        y = floor(random(96, (mazeMap.gridW - 4) * blockSize));
        flipper = new Rect(x, y, blockSize, blockSize, true);
    }
}


// ==================== 主循环 / Main loop ====================

function draw() {
    // p5.js 自带 deltaTime 是毫秒 / p5.js built-in deltaTime is in milliseconds
    let dt = window.deltaTime / 1000;

    // 防止切屏后时间突变 / Prevent huge time jumps after tab switching
    if (dt > 1) dt = 0;

    act(dt);
    drawGame();
}


// ==================== 游戏绘制 / Game rendering ====================

function drawGame() {
    // 黑色背景 / Black background
    background(0);

    // 绘制地图 / Draw map
    drawMaze();

    // 绘制玩家 / Draw player
    drawPlayer();

    // 绘制宝箱 / Draw chest
    if (!hasMiniMap) {
        drawBox(box.left - cam.x, box.top - cam.y);
    }

    // 绘制呼吸管 / Draw snorkel
    if (!hasSnorkel && hasMiniMap) {
        drawSnorkel(snorkel.left - cam.x, snorkel.top - cam.y);
    }

    // 绘制脚蹼 / Draw flipper
    if (!hasFlipper && hasMiniMap) {
        drawFlipper(flipper.left - cam.x, flipper.top - cam.y);
    }

    // 绘制说明面板 / Draw instruction panel
    if (endTimeInformation > elapsedTime) {
        drawInformation();
    }

    // 绘制弹窗 / Draw popup
    if (endTimePopUp > elapsedTime) {
        drawPopUp();
    }

    // 绘制小地图 / Draw mini-map
    if (hasMiniMap && showMiniMap) {
        drawMiniMap();
    }

    // 绘制开始/暂停/胜利/失败界面 / Draw start/pause/win/game over screen
    if (pause) {
        if (start) {
            drawStart();
        } else if (end) {
            drawEnd();
        } else if (gameover) {
            drawGameOver();
        } else {
            drawPause();
        }
    }

    // 绘制计时器 / Draw timer
    drawElapsedTime();
}


// ==================== 游戏逻辑 / Game logic ====================

function act(deltaTime) {
    gTime += deltaTime;

    if (!pause) {
        // 检查时间限制 / Check time limit
        if (elapsedTime > timeLimit * 60) {
            gameover = true;
            gameoverMsg = "You have run out of time!";
            pause = true;
        }

        // 增加经过时间 / Increase elapsed time
        elapsedTime += deltaTime;

        // 向上移动 / Move up
        if (keyIsDown(UP_ARROW)) {
            dir = 2;
            moving = true;
            player.top -= 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.top = w.bottom;
                }
            }

            if (!hasMiniMap && player.intersects(box)) {
                boxIntersects();
                player.top = box.bottom;
            }

            if (!hasSnorkel && hasMiniMap && player.intersects(snorkel)) {
                snorkelIntersects();
                player.top = snorkel.bottom;
            }

            if (!hasFlipper && hasMiniMap && player.intersects(flipper)) {
                flipperIntersects();
                player.top = flipper.bottom;
            }

            waterIntersects();
        }

        // 向右移动 / Move right
        if (keyIsDown(RIGHT_ARROW)) {
            dir = 1;
            moving = true;
            player.left += 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.right = w.left;
                }
            }

            if (!hasMiniMap && player.intersects(box)) {
                boxIntersects();
                player.right = box.left;
            }

            if (!hasSnorkel && hasMiniMap && player.intersects(snorkel)) {
                snorkelIntersects();
                player.right = snorkel.left;
            }

            if (!hasFlipper && hasMiniMap && player.intersects(flipper)) {
                flipperIntersects();
                player.right = flipper.left;
            }

            waterIntersects();
        }

        // 向下移动 / Move down
        if (keyIsDown(DOWN_ARROW)) {
            dir = 0;
            moving = true;
            player.top += 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.bottom = w.top;
                }
            }

            if (!hasMiniMap && player.intersects(box)) {
                boxIntersects();
                player.bottom = box.top;
            }

            if (!hasSnorkel && hasMiniMap && player.intersects(snorkel)) {
                snorkelIntersects();
                player.bottom = snorkel.top;
            }

            if (!hasFlipper && hasMiniMap && player.intersects(flipper)) {
                flipperIntersects();
                player.bottom = flipper.top;
            }

            waterIntersects();
        }

        // 向左移动 / Move left
        if (keyIsDown(LEFT_ARROW)) {
            dir = 3;
            moving = true;
            player.left -= 120 * deltaTime;

            for (let w of wall) {
                if (player.intersects(w)) {
                    player.left = w.right;
                }
            }

            if (!hasMiniMap && player.intersects(box)) {
                boxIntersects();
                player.left = box.right;
            }

            if (!hasSnorkel && hasMiniMap && player.intersects(snorkel)) {
                snorkelIntersects();
                player.left = snorkel.right;
            }

            if (!hasFlipper && hasMiniMap && player.intersects(flipper)) {
                flipperIntersects();
                player.left = flipper.right;
            }

            waterIntersects();
        }

        // 如果没有按移动键，恢复静止状态 / If no movement key is pressed, stop moving animation
        if (
            !keyIsDown(UP_ARROW) &&
            !keyIsDown(RIGHT_ARROW) &&
            !keyIsDown(DOWN_ARROW) &&
            !keyIsDown(LEFT_ARROW)
        ) {
            moving = false;
        }

        // 相机跟随玩家 / Focus camera on player
        cam.focus(player.left, player.top);
    }
}


// ==================== 键盘事件 / Keyboard events ====================

function keyPressed() {
    lastKeyPress = keyCode;

    // 暂停/继续 / Pause/Resume
    if (!start && keyCode === KEY_PAUSE) {
        pause = !pause;
    }

    // 开始游戏 / Start game
    if (keyCode === ENTER) {
        pause = false;
        start = false;
        triggerInformation(1);
    }

    // 重新开始 / Restart game
    if (keyCode === ESCAPE && (end || gameover)) {
        resetGame();
    }

    // 显示/隐藏小地图 / Show/Hide mini-map
    if (keyCode === KEY_M) {
        showMiniMap = !showMiniMap;
    }
}

function keyReleased() {
    moving = false;
}


// ==================== 绘制图形函数 / Drawing functions ====================

// 绘制玩家 / Draw player
function drawPlayer() {
    push();

    // 先处理移动动画偏移，再画角色 / Apply movement bobbing before drawing the player
    let bob = 0;
    if (moving) {
        bob = sin(elapsedTime * 10) * 2;
    }

    translate(player.left - cam.x, player.top - cam.y + bob);

    // 身体 / Body
    fill(50, 150, 255);
    noStroke();
    ellipse(blockSize / 2, 24, 28, 36);

    // 头部 / Head
    fill(255, 220, 177);
    ellipse(blockSize / 2, 12, 20, 20);

    // 眼睛 / Eyes
    fill(0);
    ellipse(blockSize / 2 - 4, 10, 3, 3);
    ellipse(blockSize / 2 + 4, 10, 3, 3);

    // 朝向标记 / Direction indicator
    fill(255);
    if (dir === 0) {
        ellipse(blockSize / 2, 16, 2, 4); // 下 / Down
    } else if (dir === 1) {
        ellipse(blockSize / 2 + 2, 12, 4, 2); // 右 / Right
    } else if (dir === 2) {
        ellipse(blockSize / 2, 8, 2, 4); // 上 / Up
    } else {
        ellipse(blockSize / 2 - 2, 12, 4, 2); // 左 / Left
    }

    pop();
}


// 绘制宝箱 / Draw chest
function drawBox(x, y) {
    push();

    // 箱体 / Chest body
    fill(139, 69, 19);
    rect(x + 4, y + 12, 24, 16, 3);

    // 箱盖 / Chest lid
    fill(160, 82, 45);
    rect(x + 4, y + 8, 24, 6, 3);

    // 锁 / Lock
    fill(255, 215, 0);
    rect(x + 14, y + 16, 4, 8, 2);
    ellipse(x + 16, y + 18, 6, 6);

    pop();
}


// 绘制呼吸管 / Draw snorkel
function drawSnorkel(x, y) {
    push();

    // 管子 / Tube
    stroke(255, 200, 0);
    strokeWeight(3);
    noFill();
    arc(x + 16, y + 20, 12, 20, PI, TWO_PI);
    line(x + 22, y + 20, x + 22, y + 8);

    // 顶端 / Top piece
    fill(255, 200, 0);
    noStroke();
    ellipse(x + 22, y + 8, 6, 6);

    // 咬嘴 / Mouthpiece
    fill(255, 100, 100);
    ellipse(x + 10, y + 20, 8, 6);

    pop();
}


// 绘制脚蹼 / Draw flipper
function drawFlipper(x, y) {
    push();

    fill(0, 200, 200);
    noStroke();

    // 左脚蹼 / Left flipper
    ellipse(x + 12, y + 20, 10, 20);
    triangle(x + 7, y + 28, x + 17, y + 28, x + 12, y + 32);

    // 右脚蹼 / Right flipper
    ellipse(x + 20, y + 20, 10, 20);
    triangle(x + 15, y + 28, x + 25, y + 28, x + 20, y + 32);

    pop();
}


// 绘制水域 / Draw water
function drawWater(x, y) {
    push();

    // 水面底色 / Water base color
    fill(30, 144, 255, 150);
    noStroke();
    rect(x, y, blockSize, blockSize);

    // 水波纹 / Water ripples
    stroke(100, 200, 255, 100);
    strokeWeight(2);
    noFill();

    let offset = (frameCount * 0.1) % 10;

    for (let i = 0; i < 3; i++) {
        let waveY = y + 10 + i * 8 + offset;
        bezier(
            x, waveY,
            x + 8, waveY - 3,
            x + 16, waveY + 3,
            x + 24, waveY
        );
    }

    pop();
}


// 绘制墙壁（已去闪烁并美化） / Draw wall (de-flickered and beautified)
function drawWall(x, y) {
    push();

    // 树篱底色 / Hedge base color
    fill(52, 130, 62);
    noStroke();
    rect(x, y, blockSize, blockSize);

    // 边缘阴影 / Edge shading
    fill(38, 105, 47);
    rect(x, y + blockSize - 5, blockSize, 5);
    rect(x + blockSize - 5, y, 5, blockSize);

    // 左上高光 / Top-left highlight
    fill(88, 165, 92, 120);
    rect(x + 2, y + 2, blockSize - 8, 5, 2);

    // 固定叶片装饰（不使用 random，避免闪烁） / Fixed leaf decoration (no random, no flicker)
    fill(72, 156, 74, 170);
    ellipse(x + 8,  y + 10, 7, 5);
    ellipse(x + 20, y + 8,  8, 5);
    ellipse(x + 12, y + 20, 8, 6);
    ellipse(x + 24, y + 21, 7, 5);
    ellipse(x + 7,  y + 26, 6, 4);

    // 柔和叶脉线条 / Soft leaf vein lines
    stroke(102, 185, 106, 120);
    strokeWeight(1);
    line(x + 6,  y + 11, x + 10, y + 9);
    line(x + 18, y + 8,  x + 23, y + 9);
    line(x + 10, y + 21, x + 15, y + 19);
    line(x + 21, y + 22, x + 26, y + 20);

    pop();
}


// 绘制地面（已去闪烁） / Draw terrain (de-flickered)
function drawTerrain(x, y) {
    push();

    // 地面底色 / Ground base color
    fill(214, 190, 147);
    noStroke();
    rect(x, y, blockSize, blockSize);

    // 柔和明暗分层 / Soft light and shadow layers
    fill(225, 202, 162, 140);
    rect(x + 1, y + 1, blockSize - 2, 10);

    fill(195, 168, 128, 100);
    rect(x, y + blockSize - 6, blockSize, 6);

    // 固定纹理线条（基于格子规律，不闪烁） / Fixed texture lines based on tile pattern, no flicker
    stroke(188, 160, 120, 80);
    strokeWeight(1);
    line(x + 5,  y + 8,  x + 11, y + 13);
    line(x + 18, y + 7,  x + 24, y + 12);
    line(x + 9,  y + 22, x + 15, y + 18);
    line(x + 20, y + 24, x + 26, y + 20);

    pop();
}


// ==================== 工具函数 / Utility functions ====================

// 时间转为 mm:ss / Convert time to mm:ss
function convertTime(time) {
    let seconds = floor(time % 60);
    let minutes = floor((time / 60) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}


// 多行文本绘制 / Draw multi-line text
function fillTextMultiLine(txt, x, y) {
    let lineHeight = 16;
    let lines = txt.split("\n");

    for (let i = 0; i < lines.length; i++) {
        text(lines[i], x, y);
        y += lineHeight;
    }
}


// ==================== 类定义 / Class definitions ====================

// 相机类 / Camera class
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


// 矩形类 / Rectangle class
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


// 迷宫类 / Maze class
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

function checkRowColLimits(row, col) {
    return (
        col > 1 &&
        col < mazeMap.gridH - 1 &&
        row > 1 &&
        row < mazeMap.gridW - 1
    );
}

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
            }
        }
    }

    // 右下角湖泊出口 / Bottom-right lake exit
    water.push(new Rect((col - 2) * blockSize, (row - 2) * blockSize, blockSize, blockSize, true, 1));
    water.push(new Rect((col - 2) * blockSize, (row - 3) * blockSize, blockSize, blockSize, true, 3));
    water.push(new Rect((col - 3) * blockSize, (row - 2) * blockSize, blockSize, blockSize, true, 0));
    water.push(new Rect((col - 3) * blockSize, (row - 3) * blockSize, blockSize, blockSize, true, 2));

    worldWidth = mazeMap.gridH * blockSize;
    worldHeight = mazeMap.gridW * blockSize;
}


// ==================== 界面绘制 / UI drawing ====================

function drawStart() {
    fill(162, 44, 41);
    noStroke();
    rect(width / 2 - 150, height / 2 - 50, 290, 100, 10);

    textAlign(CENTER);
    fill(255);
    textSize(32);
    textFont('Impact');
    text('Explorer Camp', width / 2, height / 2);

    if (floor(gTime * 3) % 2 === 1) {
        textSize(12);
        textFont('Verdana');
        text("Press 'Enter' to start the game", width / 2, height / 2 + 20);
    }

    textAlign(LEFT);
}

function drawEnd() {
    // 胜利使用绿色面板 / Use green panel for victory
    fill(46, 160, 85);
    noStroke();
    rect(width / 2 - 150, height / 2 - 60, 300, 120, 12);

    textAlign(CENTER);
    fill(255);
    textSize(20);
    textFont('Impact');
    text('WIN', width / 2, height / 2 - 30);

    textSize(10);
    textFont('Verdana');
    text("Congratulations, you have become an Explorer!", width / 2, height / 2 - 10);

    if (floor(gTime * 3) % 2 === 1) {
        textSize(12);
        text("Press 'ESC' to restart the game", width / 2, height / 2 + 20);
    }

    textAlign(LEFT);
}

function drawPause() {
    fill(162, 44, 41);
    noStroke();
    rect(width / 2 - 150, height / 2 - 50, 290, 100, 10);

    textAlign(CENTER);
    fill(255);
    textSize(20);
    textFont('Impact');
    text('PAUSE', width / 2, height / 2);

    if (floor(gTime * 3) % 2 === 1) {
        textSize(12);
        textFont('Verdana');
        text("Press 'P' to pause/resume the game", width / 2, height / 2 + 20);
    }

    textAlign(LEFT);
}

function drawGameOver() {
    // 失败使用红色面板 / Use red panel for failure
    fill(182, 52, 52);
    noStroke();
    rect(width / 2 - 150, height / 2 - 60, 300, 120, 12);

    textAlign(CENTER);
    fill(255);
    textSize(20);
    textFont('Impact');
    text('GAME OVER', width / 2, height / 2 - 30);

    textSize(10);
    textFont('Verdana');
    text(gameoverMsg, width / 2, height / 2 - 10);

    if (floor(gTime * 3) % 2 === 1) {
        textSize(12);
        text("Press 'ESC' to restart the game", width / 2, height / 2 + 20);
    }

    textAlign(LEFT);
}

function drawPopUp() {
    fill(128, 161, 193);
    noStroke();
    rect(width / 2 - 145, 75, 290, 120, 10);

    textAlign(CENTER);
    fill(255);
    textSize(16);
    textFont('Verdana');
    text(popUpTitle, width / 2, 100);

    textSize(12);
    fillTextMultiLine(popUpMessage, width / 2, 130);

    textAlign(LEFT);
}

function drawInformation() {
    fill(128, 161, 193);
    noStroke();
    rect(width / 2 - 200, 75, 400, 350, 10);

    textAlign(CENTER);
    fill(255);
    textSize(16);
    textFont('Verdana');
    text('Instructions', width / 2, 100);

    textAlign(LEFT);
    textSize(12);
    text('To become an explorer you should find the exit of the maze,',
         width / 2 - 185, 140);
    text('but before you should search some objects that will help',
         width / 2 - 185, 157);
    text('you to escape.',
         width / 2 - 185, 174);

    text('Be careful! You are lost in a big maze and have a limited',
         width / 2 - 185, 208);
    text('time to escape.',
         width / 2 - 185, 225);

    text("Use arrow keys to move around, and press 'P' to pause.",
         width / 2 - 185, 260);

    textAlign(CENTER);
    textSize(10);
    stroke(255);
    strokeWeight(2);
    noFill();

    text('Up', width / 2, 305);
    rect(width / 2 - 22.5, 280, 45, 45, 10);

    text('Left', width / 2 - 50, 356);
    rect(width / 2 - 72.5, 330, 45, 45, 10);

    text('Down', width / 2, 356);
    rect(width / 2 - 22.5, 330, 45, 45, 10);

    text('Right', width / 2 + 50, 356);
    rect(width / 2 + 27.5, 330, 45, 45, 10);

    textAlign(LEFT);
}


// 绘制地图 / Draw maze
function drawMaze() {
    // 绘制地面 / Draw terrain
    for (let t of terrain) {
        drawTerrain(t.left - cam.x, t.top - cam.y);
    }

    // 绘制墙壁 / Draw walls
    for (let w of wall) {
        drawWall(w.left - cam.x, w.top - cam.y);
    }

    // 绘制湖泊 / Draw water
    for (let w of water) {
        drawWater(w.left - cam.x, w.top - cam.y);
    }
}


// 绘制小地图 / Draw mini-map
function drawMiniMap() {
    let miniMapBorder = 5;
    let miniMapLeft = 10;
    let miniMapTop = height - mazeMap.gridW * miniMapScale - 10 - miniMapBorder;

    // 小地图外框 / Mini-map border
    fill(255);
    noStroke();
    rect(
        miniMapLeft,
        miniMapTop,
        mazeMap.gridH * miniMapScale + 10,
        mazeMap.gridW * miniMapScale + 10,
        6
    );

    // 小地图底色 / Mini-map background
    fill(232, 224, 160);
    rect(
        miniMapLeft + miniMapBorder,
        miniMapTop + miniMapBorder,
        mazeMap.gridH * miniMapScale,
        mazeMap.gridW * miniMapScale
    );

    // 墙体 / Walls
    fill(0);
    for (let w of wall) {
        rect(
            (w.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder,
            (w.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder,
            miniMapScale,
            miniMapScale
        );
    }

    // 出口标记（绿色） / Exit marker (green)
    let exitTile = water[0];
    fill(0, 200, 80);
    circle(
        (exitTile.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
        (exitTile.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
        5
    );

    // 玩家（红色） / Player (red)
    fill(255, 0, 0);
    noStroke();
    circle(
        (player.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
        (player.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
        4
    );

    // 呼吸管（蓝色，拿到后消失） / Snorkel (blue, disappears after collection)
    if (!hasSnorkel) {
        fill(60, 140, 255);
        circle(
            (snorkel.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
            (snorkel.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
            4
        );
    }

    // 脚蹼（蓝色，拿到后消失） / Flipper (blue, disappears after collection)
    if (!hasFlipper) {
        fill(60, 140, 255);
        circle(
            (flipper.left / blockSize) * miniMapScale + miniMapLeft + miniMapBorder + 1,
            (flipper.top / blockSize) * miniMapScale + miniMapTop + miniMapBorder + 1,
            4
        );
    }
}


// 绘制时间 / Draw elapsed time
function drawElapsedTime() {
    fill(0);
    noStroke();
    rect(width / 2 - 37, 5, 74, 42, 6);

    fill(255);
    rect(width / 2 - 32, 10, 64, 32, 4);

    fill(0);
    textAlign(CENTER);
    textSize(20);
    textFont('Arial');
    text(convertTime(elapsedTime), width / 2, 32);
    textAlign(LEFT);
}


// ==================== 碰撞检测 / Collision detection ====================

// 检查是否碰墙 / Check whether an object intersects a wall
function intersectsWall(object) {
    for (let w of wall) {
        if (object.intersects(w)) {
            return true;
        }
    }
    return false;
}


// 宝箱碰撞逻辑 / Chest collision logic
function boxIntersects() {
    triggerPopUp(
        "Mini Map found!",
        "You can show/hide the Map pressing 'M' \n \n Now, you should search a snorkel and a flipper",
        3
    );
    hasMiniMap = true;
}


// 呼吸管碰撞逻辑 / Snorkel collision logic
function snorkelIntersects() {
    let msg = "Now, you should search the exit, a small lake.";
    if (!hasFlipper) {
        msg = "Now, you should search a flipper.";
    }

    triggerPopUp("Snorkel found!", msg, 3);
    hasSnorkel = true;
}


// 脚蹼碰撞逻辑 / Flipper collision logic
function flipperIntersects() {
    let msg = "Now, you should search the exit, a small lake.";
    if (!hasSnorkel) {
        msg = "Now, you should search a snorkel.";
    }

    triggerPopUp("Flipper found!", msg, 3);
    hasFlipper = true;
}


// 水域碰撞逻辑 / Water collision logic
function waterIntersects() {
    // 只检测主出口块 / Only check the main exit tile
    if (player.intersects(water[0])) {
        if (hasSnorkel && hasFlipper) {
            end = true;
            pause = true;
        } else {
            gameover = true;
            gameoverMsg = "You need a snorkel and a flipper, to become an Explorer!";
            pause = true;
        }
    }
}


// 触发说明面板 / Trigger instruction panel
function triggerInformation(time) {
    endTimeInformation = elapsedTime + time;
}


// 触发弹窗 / Trigger popup
function triggerPopUp(title, message, time) {
    endTimePopUp = elapsedTime + time;
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

    wall = [];
    terrain = [];
    water = [];
    dir = 0;

    hasMiniMap = false;
    hasFlipper = false;
    hasSnorkel = false;
    showMiniMap = true;
    endTimePopUp = 0;
    popUpTitle = '';
    popUpMessage = '';
    gameoverMsg = '';
    endTimeInformation = 0;

    setup();
}