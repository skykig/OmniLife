const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");
const history = document.getElementById("history");
const newChatBtn = document.getElementById("newChatBtn");

const API_URL = "https://omnilife-1.onrender.com/chat";

let chats = JSON.parse(localStorage.getItem("omnilife_chats")) || [];

loadHistory();

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

newChatBtn.onclick = () => {
    chatBox.innerHTML = `
        <div class="message ai">
            <div class="avatar">🤖</div>
            <div class="bubble">
                <strong>Hello 👋</strong><br><br>
                I am Nova AI.<br>
                How can I help you today?
            </div>
        </div>
    `;
};

function addMessage(text, sender) {

    const msg = document.createElement("div");
    msg.className = `message ${sender}`;

    msg.innerHTML = `
        <div class="avatar">
            ${sender === "user" ? "🧑" : "🤖"}
        </div>
        <div class="bubble">
            ${escapeHtml(text).replace(/\n/g, "<br>")}
        </div>
    `;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (sender === "user") {
        chats.push(text);
        localStorage.setItem("omnilife_chats", JSON.stringify(chats));
        loadHistory();
    }
}

function loadHistory() {
    history.innerHTML = "";

    chats.slice().reverse().forEach(chat => {
        const item = document.createElement("div");
        item.className = "history-item";
        item.innerText = chat.length > 30 ? chat.substring(0, 30) + "..." : chat;
        history.appendChild(item);
    });
}

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    typing.classList.remove("hidden");

    try {

        console.log("Calling:", API_URL);

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await res.json();

        typing.classList.add("hidden");

        addMessage(data.reply || "No reply received.", "ai");

    } catch (err) {

        console.error(err);

        typing.classList.add("hidden");

        addMessage("❌ Backend connection failed.", "ai");
    }
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = text;
    return div.innerHTML;
}
