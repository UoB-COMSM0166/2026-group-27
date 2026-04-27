// ==================== 全局音频系统 ====================

// ⚠️ 避免和 main_menu.js 冲突
let sharedAudioCtx = null;
let sharedAudioUnlocked = false;

// 当前BGM
let currentBGM = null;
let currentBGMName = "";

// 所有音频
let sounds = {};


// ==================== 加载音频 ====================
function audioPreload() {
    sounds = {
        opening: new Audio("sounds/opening.mp3"),
        select: new Audio("sounds/select.mp3"),
        cutscene1: new Audio("sounds/cutscene1.mp3"),
        cutscene2: new Audio("sounds/cutscene2.mp3"),
        cutscene3: new Audio("sounds/cutscene3.mp3"),
        ending: new Audio("sounds/ending.mp3"),
        menu: new Audio("sounds/menu.mp3"),
        level1: new Audio("sounds/level1.mp3"),
        level2: new Audio("sounds/level2.mp3"),
        level3: new Audio("sounds/level3.mp3"),
        
        boss: new Audio("sounds/boss.mp3"),
        ghost: new Audio("sounds/little ghost.mp3"),
        portal: new Audio("sounds/portal.mp3"),
        cage: new Audio("sounds/cage.mp3")
    };

    // 设置循环
    for (let key in sounds) {
        sounds[key].loop = true;
        sounds[key].volume = 0.4;
    }
    
    sounds.opening.loop = true;
    sounds.select.loop = true;
    sounds.cutscene1.loop = true;
    sounds.cutscene2.loop = true;
    sounds.cutscene3.loop = true;
    sounds.ending.loop = true;
    sounds.menu.loop = true;
    sounds.level1.loop = true;
    sounds.level2.loop = true;
    sounds.level3.loop = true;
    sounds.boss.loop = true;
    sounds.ghost.loop = true;

    sounds.portal.loop = false;
    sounds.portal.volume = 0.65;
    sounds.cage.loop = false;
    sounds.cage.volume = 0.7;

    // 特殊音量
    sounds.ghost.volume = 0.0;
    sounds.boss.volume = 0.0;
}


// ==================== 解锁音频 ====================
function ensureAudio() {
    if (!sharedAudioCtx) {
        sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (sharedAudioCtx.state === "suspended") {
        sharedAudioCtx.resume();
    }

    sharedAudioUnlocked = true;

    // 如果BGM被浏览器暂停，恢复
    if (currentBGM && currentBGM.paused) {
        currentBGM.play().catch(() => {});
    }
}

function unlockAudio() {
    ensureAudio();
}


// ==================== 播放BGM ====================
function startBGM(name, volume = 0.2) {
    if (currentBGMName === name) return;

    stopBGM();

    let bgm = sounds[name];
    if (!bgm) return;

    bgm.currentTime = 0;
    bgm.volume = volume;

    bgm.play().catch(() => {});

    currentBGM = bgm;
    currentBGMName = name;
}


// ==================== 停止BGM ====================
function stopBGM() {
    if (currentBGM) {
        currentBGM.pause();
        currentBGM.currentTime = 0;
        currentBGM = null;
        currentBGMName = "";
    }
}


// ==================== UI音效（沿用menu风格） ====================
function playTone(freq, duration, type = "sine", volume = 0.03) {
    ensureAudio();
    if (!sharedAudioCtx) return;

    let osc = sharedAudioCtx.createOscillator();
    let gain = sharedAudioCtx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(sharedAudioCtx.destination);

    let now = sharedAudioCtx.currentTime;

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.start(now);
    osc.stop(now + duration);
}


// 点击
function playClickTone() {
    playTone(520, 0.06, "square", 0.1);
}

// hover
function playHoverTone() {
    playTone(700, 0.05, "triangle", 0.1);
}

// 选择
function playEquipTone() {
    playTone(480, 0.07, "square", 0.1);
    setTimeout(() => playTone(760, 0.08, "triangle", 0.1), 60);
}


// ==================== 距离音效（鬼 / boss） ====================
function updateSpatialSound(playerX, playerY, sourceX, sourceY, audio, maxDist = 300) {
    if (!audio) return;

    let dx = playerX - sourceX;
    let dy = playerY - sourceY;
    let dist = Math.sqrt(dx * dx + dy * dy);

    let volume = 1 - dist / maxDist;
    volume = constrain(volume, 0, 1);

    audio.volume = volume * 0.6;

    // 🔥 关键：自动播放（只触发一次）
    if (volume > 0.01 && audio.paused && sharedAudioUnlocked) {
        audio.play().catch(() => {});
    }
}

function playPickupTone() {
    playTone(620, 0.06, "sine", 0.05);
    setTimeout(() => playTone(880, 0.08, "triangle", 0.04), 55);
}

function playArrowTone() {
    playTone(180, 0.05, "square", 0.06);  // 低频“嗖”
    setTimeout(() => playTone(420, 0.04, "triangle", 0.03), 30); // 尾音
}

function playMagicTone() {
    playTone(523, 0.08, "sine", 0.035);
    setTimeout(() => playTone(659, 0.09, "sine", 0.032), 45);
    setTimeout(() => playTone(784, 0.12, "triangle", 0.028), 95);
}

function playHitTone() {
    playTone(260, 0.045, "square", 0.045);
    setTimeout(() => playTone(180, 0.04, "triangle", 0.025), 35);
}

function playKillTone() {
    playTone(180, 0.07, "square", 0.055);
    setTimeout(() => playTone(320, 0.06, "triangle", 0.04), 55);
    setTimeout(() => playTone(520, 0.08, "sine", 0.035), 105);
}

function playBossHitTone() {
    playTone(120, 0.08, "sawtooth", 0.055);
    setTimeout(() => playTone(90, 0.08, "square", 0.04), 60);
}

function playBossStunTone() {
    playTone(100, 0.12, "sawtooth", 0.065);
    setTimeout(() => playTone(520, 0.15, "triangle", 0.045), 100);
    setTimeout(() => playTone(760, 0.18, "sine", 0.04), 210);
}

function playTeleportTone() {
    ensureAudio();

    let s = sounds.portal;
    if (!s) return;

    s.loop = false;
    s.pause();
    s.currentTime = 0;
    s.volume = 0.65;
    s.play().catch(() => {});
}

function playCageSound() {
    ensureAudio();

    let s = sounds.cage;
    if (!s) return;

    s.pause();
    s.currentTime = 0;
    s.volume = 0.7;
    s.play().catch(() => {});
}