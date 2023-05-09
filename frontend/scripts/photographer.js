const swiper = new Swiper('.swiper', {
    // loop: true,
    autoplayDisableOnInteraction: true,
    effect: 'slide',
    // autoplay: {
    //     delay: 1000
    // }
    slidesPerView: 2
});

const photographer = localStorage.getItem("photographerId");
const photographerName = document.getElementById("name")
const photographerPlace = document.getElementById("place")
const photographerCamera  = document.getElementById("camera")
const photographerPrice = document.getElementById("price")
const photographerExpertise = document.getElementById("expertise")
const titleName = document.querySelector("title")

fetch(`http://localhost:3000/user/${photographer}`)
.then((res) => res.json())
.then((data) => {
    console.log(data.user)
    photographerName.textContent = data.user.name
    photographerPlace.textContent = data.user.address
    photographerCamera.textContent = data.user.camera
    photographerPrice.textContent = data.user.price
    photographerExpertise.textContent = data.user.expertise
    titleName.textContent += " " + data.user.name
})

function getTime() {
    const datetimeInput = document.getElementById('datetimeInput');
    const now = new Date();
    const minTime = now.toISOString().slice(0, 16);
    datetimeInput.setAttribute('min', minTime);

    const datetimeValue = datetimeInput.value;
    const selectedTime = new Date(datetimeValue);
    const currentTime = new Date();

    if (selectedTime < currentTime) {
        datetimeInput.value = ''; // Clear the input value if it's in the past
        return;
    }

    const utcTime = selectedTime.toISOString();
    console.log(utcTime); // Output: UTC format of selected time
}

var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
    navContents.classList.toggle("show-nav");
    console.log("clicked")
});
