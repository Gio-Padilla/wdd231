// responsive navigation
const menuToggle = document.getElementById("menu-button");
const navMenu = document.getElementById("main-menu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open");
});