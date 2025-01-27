const chatBox = document.getElementById("chat-box");
const optionsBox = document.getElementById("options");
const playerInput = document.getElementById("player-input");

let affection = 0; // 好感度

const dialogues = [
    { 
        text: "嗨，我是马特·默多克。你是谁？", 
        options: [
            { text: "我是你的粉丝！", effect: +10 },
            { text: "路过的陌生人。", effect: 0 },
            { text: "谁在乎呢？", effect: -5 }
        ] 
    },
    { 
        text: "你喜欢纽约吗？", 
        options: [
            { text: "当然！这里很棒。", effect: +5 },
            { text: "还行吧。", effect: 0 },
            { text: "不喜欢，人太多了。", effect: -5 }
        ] 
    }
];

let dialogueIndex = 0;

function addMessage(text, isPlayer = false) {
    const message = document.createElement("div");
    message.textContent = text;
    message.style.textAlign = isPlayer ? "right" : "left";
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showDialogue() {
    optionsBox.innerHTML = "";
    const dialogue = dialogues[dialogueIndex];

    addMessage(dialogue.text);

    dialogue.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => {
            affection += option.effect;
            addMessage(option.text, true);
            dialogueIndex++;
            if (dialogueIndex < dialogues.length) {
                setTimeout(showDialogue, 500);
            } else {
                addMessage("游戏结束！你的好感度：" + affection);
                optionsBox.innerHTML = "";
            }
        };
        optionsBox.appendChild(button);
    });

    optionsBox.classList.remove("hidden");
}

window.onload = () => {
    showDialogue();
};