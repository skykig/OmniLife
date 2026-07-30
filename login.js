const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const button = document.getElementById("startBtn");

setTimeout(() => {
    title.textContent = "I'm Omni";
    subtitle.textContent = "Your Personal AI Life OS";
}, 2500);

button.addEventListener("click", () => {

    button.textContent = "Loading...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);

});
