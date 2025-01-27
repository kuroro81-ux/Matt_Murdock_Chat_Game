// 角色头像
const NPC_AVATAR = './assets/daredevil-avatar.png';
const PLAYER_AVATAR = './assets/merc-avatar.png';

// 完整对话剧情
const story = [
    {
        npc: "马特·默多克",
        text: "（从阴影中出现）雇佣兵小姐，这三周你在地狱厨房的活跃…不像普通接案。",
        options: [
            { text: "接点私活而已，律师先生也要管？", effect: -5 },
            { text: "清理些垃圾，需要向你报备吗？", effect: +10 },
            { text: "（亮出袖剑）你跟踪我？", effect: -15 }
        ]
    },
    {
        npc: "马特",
        text: "你身上有黑市军火商的硝烟味…和血腥味。",
        options: [
            { text: "只是帮某位『朋友』处理过期库存", effect: +5 },
            { text: "总比某些人用教堂告解室藏武器好", effect: +20 },
            { text: "关你屁事！", effect: -20 }
        ]
    },
    {
        npc: "夜魔侠",
        text: "金并正在找用日本刀的亚洲女人…你玩太大了。",
        options: [
            { text: "（擦刀）那胖子该操心自己的脑袋", effect: +15 },
            { text: "需要我帮你解决那个死胖子吗？", effect: +30 },
            { text: "（甩开他）我的事自己处理", effect: -10 }
        ]
    },
    {
        npc: "马特·默多克",
        text: "（突然将你推到墙上）最后一个问题——你认识「手合会」吗？",
        options: [
            { text: "（冷笑）比你知道的多得多", effect: +25 },
            { text: "什么破名字？儿童漫画组织？", effect: -30 },
            { text: "（用刀尖抵住他胸口）让开", effect: +5 }
        ]
    }
];

let currentChapter = 0;
let affection = 0;
let endingTriggered = false;

// 获取 HTML 元素
const chatMessages = document.getElementById('chat-messages');
const optionsContainer = document.getElementById('options');

// 创建消息行
function createMessageRow(speaker, text, isPlayer) {
    const row = document.createElement('div');
    row.className = `message-row ${isPlayer ? 'player-row' : 'npc-row'}`;

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = isPlayer ? PLAYER_AVATAR : NPC_AVATAR;

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const speakerTag = document.createElement('div');
    speakerTag.className = 'speaker';
    speakerTag.textContent = speaker;

    const bubble = document.createElement('div');
    bubble.className = `bubble ${isPlayer ? 'player-bubble' : 'npc-bubble'}`;
    bubble.innerHTML = text.replace(/（(.*?)）/g, '<em>（$1）</em>');

    messageContainer.append(speakerTag, bubble);
    row.append(avatar, messageContainer);
    return row;
}

// 显示选项
function showOptions(options) {
    optionsContainer.innerHTML = "";
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.onclick = () => handleChoice(index);
        optionsContainer.appendChild(button);
    });
}

// 处理玩家选择
function handleChoice(choiceIndex) {
    if (endingTriggered) return;

    const currentDialogue = story[currentChapter];
    const choice = currentDialogue.options[choiceIndex];

    // 添加玩家的选择
    chatMessages.appendChild(createMessageRow("你", choice.text, true));

    affection += choice.effect;

    currentChapter++;

    if (currentChapter >= story.length) {
        showEnding();
        endingTriggered = true;
    } else {
        setTimeout(showNextDialogue, 1000);
    }
}

// 显示 NPC 对话
function showNextDialogue() {
    if (currentChapter < story.length) {
        const dialogue = story[currentChapter];
        chatMessages.appendChild(createMessageRow(dialogue.npc, dialogue.text, false));
        setTimeout(() => showOptions(dialogue.options), 800);
    }
}

// 显示结局
function showEnding() {
    let endingText = '';
    if (affection >= 50) {
        endingText = "马特：（摘下头套）我需要个搭档…（扔给你夜魔面罩）别弄脏了";
    } else if (affection >= 20) {
        endingText = "马特：（擦着血迹）每周三教堂告解室，别迟到（扔来钥匙）";
    } else if (affection <= -20) {
        endingText = "（手机震动）未知号码：黎明前离开纽约，这是最后警告";
    } else {
        endingText = "马特：（消失在屋顶）记住，在地狱厨房…（风声吞没了后半句）";
    }

    chatMessages.appendChild(createMessageRow("结局", `${endingText}<br>好感度：${affection}`, false));

    const restartBtn = document.createElement('button');
    restartBtn.textContent = '重新开始';
    restartBtn.onclick = () => location.reload();
    optionsContainer.appendChild(restartBtn);
}

// 启动游戏
function startGame() {
    document.getElementById("start-button").style.display = "none";
    showNextDialogue();
}
