// Dashboard Loaded
console.log("OmniLife Dashboard Loaded");

// All Dashboard Cards
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });

});

// Sidebar Items
const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach((item) => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

    });

});

// Welcome Message
setTimeout(() => {
    console.log("Welcome to OmniLife 🚀");
}, 500);
