const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    loginBtn.innerText = "Logging in...";
    loginBtn.disabled = true;

    setTimeout(() => {

        window.location.href = "dashboard.html";

    }, 1500);

});
