const API_URL = "http://localhost:3000/chat";

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const newChatBtn = document.getElementById("newChatBtn");

// Load Saved Chat
const savedChat = localStorage.getItem("omni_chat");

if (savedChat) {
    messages.innerHTML = savedChat;
    messages.scrollTop = messages.scrollHeight;
}

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();

    }

});

// Send Message
async function sendMessage() {

    const text = userInput.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    userInput.value = "";

    saveChat();

    showTyping();

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

        saveChat();

    } catch (error) {

        removeTyping();

        addMessage(
           addMessage(
    "🤖 OmniLife AI\n\nHello! I'm currently running in Demo Mode.\n\nMy real AI brain will be connected soon. 😊",
    "ai"
);

        saveChat();

    }

}

// Add Message
function addMessage(text, type) {

    const div = document.createElement("div");

    div.className =
        type === "user"
            ? "user-message"
            : "ai-message";

    div.innerHTML = text.replace(/\n/g, "<br>");

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

// Typing
function showTyping() {

    const typing = document.createElement("div");

    typing.className = "ai-message";

    typing.id = "typing";

    typing.innerHTML = "🤖 OmniLife AI is thinking...";

    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}

// Save Chat
function saveChat() {

    localStorage.setItem(

        "omni_chat",

        messages.innerHTML

    );

}

// New Chat
if (newChatBtn) {

    newChatBtn.addEventListener("click", () => {

        if (confirm("Start a new chat?")) {

            localStorage.removeItem("omni_chat");

            messages.innerHTML = `

<div class="ai-message">

Hello 👋<br><br>

I'm OmniLife AI.<br>

How can I help you today?

</div>

`;

        }

    });

}
