// ======================================
// OmniLife Nova AI - Chat Engine v2
// Demo Mode (Backend Ready)
// ======================================

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// ------------------------------
// Load Chat History
// ------------------------------
let chatHistory = JSON.parse(localStorage.getItem("nova_history")) || [];

// ------------------------------
// Demo AI Replies
// ------------------------------
const aiReplies = [
    "I'm here to help you. Tell me more.",
    "That's an interesting question.",
    "I understand. Let me explain.",
    "Here's what I think about it.",
    "Can you provide a little more detail?",
    "Absolutely! Let's solve it together.",
    "Nova AI is thinking like a professional assistant.",
    "Great question. Here's a simple answer.",
    "I'm always ready to help.",
    "Let's find the best possible solution."
];

// ------------------------------
// Save Chat
// ------------------------------
function saveChat() {
    localStorage.setItem(
        "nova_history",
        JSON.stringify(chatHistory)
    );
}

// ------------------------------
// Auto Scroll
// ------------------------------
function scrollBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ------------------------------
// Time
// ------------------------------
function getTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}
