const CHARACTER_STORAGE_KEY = "selectedCharacter";

const CHARACTER_CONFIG = {
    fox: {
        id: "fox",
        name: "Fox",
        type: "static4",
        basePath: "assets/characters/fox/",
        sprites: {
            front: "fox_front.png",
            back: "fox_back.png",
            left: "fox_left.png",
            right: "fox_right.png"
        }
    },

    fernando: {
        id: "fernando",
        name: "Fernando",
        type: "animated12",
        basePath: "assets/characters/Fernando/",
        sprites: {
            front: ["F-front1.png", "F-front2.png", "F-front3.png"],
            back: ["F-back1.png", "F-back2.png", "F-back3.png"],
            left: ["F-left1.png", "F-left2.png", "F-left3.png"],
            right: ["F-right1.png", "F-right2.png", "F-right3.png"]
        }
    },

    eliza: {
        id: "eliza",
        name: "Eliza",
        type: "animated12",
        basePath: "assets/characters/Eliza/",
        sprites: {
            front: ["E-front1.png", "E-front2.png", "E-front3.png"],
            back: ["E-back1.png", "E-back2.png", "E-back3.png"],
            left: ["E-left1.png", "E-left2.png", "E-left3.png"],
            right: ["E-right1.png", "E-right2.png", "E-right3.png"]
        }
    }
};

function saveSelectedCharacter(characterId) {
    if (CHARACTER_CONFIG[characterId]) {
        localStorage.setItem(CHARACTER_STORAGE_KEY, characterId);
    }
}

function getSelectedCharacterId() {
    const saved = localStorage.getItem(CHARACTER_STORAGE_KEY);
    if (saved && CHARACTER_CONFIG[saved]) {
        return saved;
    }
    return "fox";
}

function getSelectedCharacterConfig() {
    return CHARACTER_CONFIG[getSelectedCharacterId()];
}

function getAllCharacters() {
    return Object.values(CHARACTER_CONFIG);
}

function isCharacterSelected(characterId) {
    return getSelectedCharacterId() === characterId;
}
