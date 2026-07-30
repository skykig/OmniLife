const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const button = document.getElementById("startBtn");
const orb = document.querySelector(".orb");

setTimeout(() => {
    title.innerHTML = "I'm Omni";
    subtitle.innerHTML = "Your Personal AI Life OS";
}, 2500);

button.addEventListener("click", () => {

    button.innerHTML = "Loading...";

    orb.style.transform = "scale(1.3)";

    setTimeout(() => {

        document.body.style.background = "#020617";

        title.innerHTML = "Welcome Back ❤️";

        subtitle.innerHTML = "Let's build the future together.";

        button.innerHTML = "Continue";

        orb.style.transform = "scale(1)";

    },1500);

});