const chatBox = document.getElementById("chat-box");

// 角色头像
const playerAvatar = "./assets/player-avatar.png";
const npcAvatar = "./assets/npc-avatar.png";

let affection = 0; // 初始好感度
let dialogueIndex = 0;

const dialogues = [
    { 
        text: "马特：你最近在地狱厨房到底想做什么？", 
        options: [
            { text: "找点活干，赚点钱。", effect: +5 },
            { text: "看看有没有麻烦可解决。", effect: +10 },
            { text: "我只是路过，别多问。", effect: -5 }
        ] 
    },
    { 
        text: "马特：这里可不是安全的地方，你知道吧？",
        options: [
            { text: "我一直都知道，放心吧。", effect: +5 },
            { text: "我有足够的能力保护自己。", effect: +10 },
            { text: "关你什么事？", effect: -10 }
        ] 
    },
    {
        text: "马特：如果你需要帮忙，可以随时来找我。",
        options: [
            { text: "谢谢，我会记住的。", effect: +10 },
            { text: "可能吧，看看情况。", effect: 0 },
            { text: "不需要，我自己能搞定。", effect: -5 }
        ]
    }
];

// ** 添加消息到聊天框 **
function addMessage(text, isPlayer = false) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");

    const messageBubble = document.createElement("div");
    messageBubble.textContent = text;

    if (isPlayer) {
        avatar.src = playerAvatar;
        messageBubble.classList.add("player-message");
        messageContainer.appendChild(messageBubble);
        messageContainer.appendChild(avatar);
    } else {
        avatar.src = npcAvatar;
        messageBubble.classList.add("npc-message");
        messageContainer.appendChild(avatar);
        messageContainer.appendChild(messageBubble);
    }

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ** 显示对话 **
function showDialogue() {
    if (dialogueIndex >= dialogues.length) {
        addMessage("对话结束，你的好感度：" + affection);
        return;
    }

    const dialogue = dialogues[dialogueIndex];
    addMessage(dialogue.text);

    // 清除旧选项
    const optionsBox = document.createElement("div");
    optionsBox.classList.add("options");
    chatBox.appendChild(optionsBox);

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
}

// ** 触发开始对话 **
function startDialogue() {
    chatBox.innerHTML = ""; // 清空之前内容
    dialogueIndex = 0; // 重置对话进程
    showDialogue();
}

// ** 初始化按钮事件 **
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("input-container").innerHTML = 
        `<button onclick="startDialogue()">开始对话</button>`;
});
