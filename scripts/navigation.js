// responsive navigation
const menuToggle = document.getElementById("menu-button");
const navMenu = document.querySelector("nav");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("show");
});