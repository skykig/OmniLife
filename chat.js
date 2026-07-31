const API_URL = "http://localhost:3000/chat";

const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    addTyping();

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        removeTyping();

        addMessage(data.reply, "ai");

    } catch (error) {

        removeTyping();

        addMessage("⚠️ Server not running.", "ai");

    }

}

function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = type === "user"
        ? "user-message"
        : "ai-message";

    div.innerHTML = text.replace(/\n/g, "<br>");

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

function addTyping() {

    const div = document.createElement("div");

    div.className = "ai-message";

    div.id = "typing";

    div.innerHTML = "⏳ Omni AI is typing...";

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}
