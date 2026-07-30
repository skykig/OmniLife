const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");

function sendMessage() {

    const text = userInput.value.trim();

    if (text === "") return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.textContent = text;

    messages.appendChild(userMsg);

    userInput.value = "";

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {

        const aiMsg = document.createElement("div");
        aiMsg.className = "ai-message";

        aiMsg.textContent =
        "I received: \"" + text + "\"\n\nThis is a demo AI response. In the next version we'll connect a real AI.";

        messages.appendChild(aiMsg);

        messages.scrollTop = messages.scrollHeight;

    },1000);

}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});
