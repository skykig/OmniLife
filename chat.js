const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const newChatBtn = document.getElementById("newChatBtn");

// Load saved chat
const savedChat = localStorage.getItem("chatHistory");

if (savedChat) {
    messages.innerHTML = savedChat;
    messages.scrollTop = messages.scrollHeight;
}

// Send Message
function sendMessage() {

    const text = userInput.value.trim();

    if (text === "") return;

    // User Message
    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.textContent = text;

    messages.appendChild(userMsg);

    userInput.value = "";

    messages.scrollTop = messages.scrollHeight;

    localStorage.setItem("chatHistory", messages.innerHTML);

    // AI Reply
    setTimeout(() => {

        const aiMsg = document.createElement("div");
        aiMsg.className = "ai-message";

        aiMsg.textContent =
            "🤖 Omni AI\n\nYou said:\n" + text +
            "\n\nThis is a demo response. Real AI will be connected soon.";

        messages.appendChild(aiMsg);

        messages.scrollTop = messages.scrollHeight;

        localStorage.setItem("chatHistory", messages.innerHTML);

    }, 1000);

}

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});

// New Chat Button
if (newChatBtn) {

    newChatBtn.addEventListener("click", () => {

        if (confirm("Start a new chat?")) {

            messages.innerHTML = `
<div class="ai-message">
Hello 👋<br><br>
I am Omni AI.<br>
How can I help you today?
</div>`;

            localStorage.removeItem("chatHistory");

        }

    });

}
