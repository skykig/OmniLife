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

        alert("Welcome to OmniLife!");

        // Next step me Dashboard banayenge
        // window.location.href = "dashboard.html";

        loginBtn.innerText = "Login";
        loginBtn.disabled = false;

    }, 1500);

});
