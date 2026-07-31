// OmniLife Demo AI Chat Mode
// No Backend Required

document.addEventListener("DOMContentLoaded", () => {

    const chatBox = document.getElementById("chatBox");
    const input = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    let chats = JSON.parse(localStorage.getItem("omnilife_chats")) || [];


    // Load Previous Chat
    chats.forEach(chat => {
        addMessage(chat.text, chat.sender, false);
    });


    sendBtn.addEventListener("click", sendMessage);

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });


    function sendMessage(){

        let message = input.value.trim();

        if(!message) return;


        addMessage(message,"user");

        input.value="";


        saveChat(message,"user");


        showTyping();


        setTimeout(()=>{

            removeTyping();

            let reply = generateAIReply(message);

            addMessage(reply,"ai");

            saveChat(reply,"ai");


        },800);

    }



    function addMessage(text,type,save=true){

        let div=document.createElement("div");

        div.className =
        type==="user" 
        ? "message user-message"
        : "message ai-message";


        div.innerHTML=text;


        chatBox.appendChild(div);

        chatBox.scrollTop=chatBox.scrollHeight;


        if(save){
            saveChat(text,type);
        }

    }




    function saveChat(text,sender){

        chats.push({
            text:text,
            sender:sender,
            time:new Date().toISOString()
        });


        localStorage.setItem(
            "omnilife_chats",
            JSON.stringify(chats)
        );

    }





    function generateAIReply(message){

        let msg=message.toLowerCase();


        if(msg.includes("hello") || msg.includes("hi")){
            return "Hello 👋 I am Nova, your OmniLife AI assistant. How can I help you today?";
        }


        if(msg.includes("who are you")){
            return "I am Nova AI, the personal intelligence system inside OmniLife.";
        }


        if(msg.includes("weather")){
            return "I can help you with weather information. In full version I will connect with live weather services.";
        }


        if(msg.includes("idea")){
            return "Great! Tell me your idea. I can help you plan, design and improve it.";
        }


        if(msg.includes("code") || msg.includes("app")){
            return "I can help you build apps, debug code and design software architecture.";
        }


        if(msg.includes("instagram")){
            return "I can help you create captions, hashtags, content ideas and growth strategies.";
        }


        if(msg.includes("travel")){
            return "I can help you plan trips, find destinations and create travel content.";
        }


        if(msg.includes("thank")){
            return "You're welcome 😊 I am always here to help.";
        }


        return "I understand. Tell me more about it, and I will help you with the best possible solution.";
    }





    function showTyping(){

        let typing=document.createElement("div");

        typing.id="typing";

        typing.className="message ai-message";

        typing.innerHTML="Nova is thinking... 🤖";


        chatBox.appendChild(typing);

        chatBox.scrollTop=chatBox.scrollHeight;

    }



    function removeTyping(){

        let typing=document.getElementById("typing");

        if(typing){
            typing.remove();
        }

    }


});
