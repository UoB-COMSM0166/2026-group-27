// ===== Game Flow Manager =====

const LEVEL_ROUTES = {
  1: "level1.html",
  2: "level2.html",
  3: "level3.html",
  end: "end.html"
};

// 跳转下一关
function goToNextLevel(currentLevel) {
  stopBGM();

  if (currentLevel === 1) {
    window.location.href = "opening.html?scene=after1";
  } else if (currentLevel === 2) {
    window.location.href = "opening.html?scene=after2";
  } else if (currentLevel === 3) {
    window.location.href = "opening.html?scene=ending";
  }
}