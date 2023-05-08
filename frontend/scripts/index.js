const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


var signupLink = document.getElementById("signup-link");
var dropdownMenu = document.getElementById("dropdown-menu");

signupLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownMenu.style.display = (dropdownMenu.style.display === "none") ? "block" : "none";
});

var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
    navContents.classList.toggle("show-nav");
    console.log("clicked")
});


let occassion = document.getElementById("occassion")
let date = document.getElementById("date")
let duration = document.getElementById("duration")
let place = document.getElementById("location")

const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(occassion.value, date.value, duration.value, place.value);
})