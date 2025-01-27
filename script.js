const chatBox = document.getElementById("chat-box");
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
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");

    const messageBubble = document.createElement("div");
    messageBubble.textContent = text;

    if (isPlayer) {
        avatar.src = "assets/player-avatar.png"; // 你的玩家头像
        messageBubble.classList.add("player-message");
        messageContainer.appendChild(messageBubble);
        messageContainer.appendChild(avatar);
    } else {
        avatar.src = "assets/npc-avatar.png"; // 你的 NPC 头像
        messageBubble.classList.add("npc-message");
        messageContainer.appendChild(avatar);
        messageContainer.appendChild(messageBubble);
    }

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showDialogue() {
    if (dialogueIndex >= dialogues.length) {
        addMessage("游戏结束！你的好感度：" + affection);
        return;
    }

    const dialogue = dialogues[dialogueIndex];
    addMessage(dialogue.text);

    const optionsBox = document.createElement("div");
    optionsBox.classList.add("options");

    dialogue.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => {
            affection += option.effect;
            addMessage(option.text, true);
            dialogueIndex++;
            setTimeout(showDialogue, 500);
        };
        optionsBox.appendChild(button);
    });

    chatBox.appendChild(optionsBox);
}

window.onload = () => {
    showDialogue();
};
