const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


let occassion = document.getElementById("occassion")
let date = document.getElementById("date")
let duration = document.getElementById("duration")
let place = document.getElementById("location")

const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(occassion.value,date.value,duration.value,place.value);
})