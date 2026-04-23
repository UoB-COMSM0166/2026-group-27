let currentCharacterConfig = null;

let playerSprites = {
    front: [],
    back: [],
    left: [],
    right: []
};

function preloadSelectedCharacterSprites() {
    currentCharacterConfig = getSelectedCharacterConfig();

    playerSprites = {
        front: [],
        back: [],
        left: [],
        right: []
    };

    if (!currentCharacterConfig) return;

    const basePath = currentCharacterConfig.basePath;
    const sprites = currentCharacterConfig.sprites;

    if (currentCharacterConfig.type === "static4") {
        playerSprites.front.push(loadImage(basePath + sprites.front));
        playerSprites.back.push(loadImage(basePath + sprites.back));
        playerSprites.left.push(loadImage(basePath + sprites.left));
        playerSprites.right.push(loadImage(basePath + sprites.right));
    }

    if (currentCharacterConfig.type === "animated12") {
        for (let file of sprites.front) {
            playerSprites.front.push(loadImage(basePath + file));
        }
        for (let file of sprites.back) {
            playerSprites.back.push(loadImage(basePath + file));
        }
        for (let file of sprites.left) {
            playerSprites.left.push(loadImage(basePath + file));
        }
        for (let file of sprites.right) {
            playerSprites.right.push(loadImage(basePath + file));
        }
    }
}

function getDirectionKey(dir) {
    // 你的项目里方向定义：
    // 0 = down(front)
    // 1 = right
    // 2 = up(back)
    // 3 = left
    if (dir === 0) return "front";
    if (dir === 1) return "right";
    if (dir === 2) return "back";
    return "left";
}

function getCurrentAnimationFrame(dir, moving, elapsedTime) {

    const directionKey = getDirectionKey(dir);
    const frames = playerSprites[directionKey];

    if (!frames || frames.length === 0) return null;

    // fox 只有一帧
    if (frames.length === 1) {
        return frames[0];
    }

    // 静止时用中间帧
    if (!moving) {
        return frames[1] || frames[0];
    }

    // 更顺滑动画
    const frameIndex = floor(elapsedTime * 10) % frames.length;

    return frames[frameIndex];
}

function drawSelectedCharacter(player, cam, dir, moving, elapsedTime) {

    push();

    let bob = 0;
    if (moving) {
        bob = sin(elapsedTime * 10) * 1.5;
    }

    const sprite = getCurrentAnimationFrame(dir, moving, elapsedTime);

    if (!sprite) {
        pop();
        return;
    }

    let drawW = player.width;
    let drawH = player.height;

    // fox 比例修正
    if (currentCharacterConfig.id === "fox") {
        drawW = player.width * 1.6;
        drawH = player.height * 1.1;
    }

    // 水平居中
    let drawX = player.left - cam.x - (drawW - player.width) / 2;

    // 脚底对齐
    let drawY = player.top - cam.y + player.height - drawH + bob;

    // ===== 脚下阴影 =====
    let shadowX = player.left - cam.x + player.width / 2;
    let shadowY = player.top - cam.y + player.height - 3;

    noStroke();
    fill(0, 0, 0, 70);

    ellipse(
        shadowX,
        shadowY,
        player.width * 0.9,
        player.width * 0.35
    );

    // ===== 画角色 =====
    imageMode(CORNER);

    image(
        sprite,
        drawX,
        drawY,
        drawW,
        drawH
    );

    pop();
}

function getSelectedCharacterName() {
    if (!currentCharacterConfig) {
        currentCharacterConfig = getSelectedCharacterConfig();
    }
    return currentCharacterConfig ? currentCharacterConfig.name : "Fox";
}
