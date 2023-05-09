const swiper = new Swiper('.swiper', {
    loop: true,
    autoplayDisableOnInteraction: true,
    effect: 'slide',
    autoplay: {
        delay: 1000
    },
    slidesPerView: 2
});
const URL = "https://bookmyshoot-backend.onrender.com";
const form = document.querySelector("form")
const photographer = localStorage.getItem("photographerId");
const photographerName = document.getElementById("name")
const photographerPlace = document.getElementById("place")
const photographerCamera  = document.getElementById("camera")
const photographerPrice = document.getElementById("price")
const photographerExpertise = document.getElementById("expertise")
const titleName = document.querySelector("title")
const token = localStorage.getItem("token") || null;
let userData;
fetch(`${URL}/user/${photographer}`)
.then((res) => res.json())
.then((data) => {
    userData = data.user;
    photographerName.textContent = data.user.name
    photographerPlace.textContent = data.user.address
    photographerCamera.textContent = data.user.camera
    photographerPrice.textContent = data.user.price
    photographerExpertise.textContent = data.user.expertise
    titleName.textContent += " " + data.user.name
})

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const start = document.getElementById("start");
    const end = document.getElementById('end');
    const now = new Date();
    const minTime = now.toISOString().slice(0, 16);
    start.setAttribute('min', minTime);
    end.setAttribute('min',minTime)

    const datetimeValue = start.value;
    const datetimeValue2 = end.value;
    const selectedTime = new Date(datetimeValue);
    const selectedTime2 = new Date(datetimeValue2);
    const currentTime = new Date();
    
    if (selectedTime < currentTime || !datetimeValue2) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Date could not be in the past",
            footer: ``
        });
        start.value = ''; // Clear the input value if it's in the past
        end.value = '';
        return;
    }
    
    const utcTime = selectedTime.toISOString();
    const utcTime2 = selectedTime2.toISOString();

    if(!token){
        Swal.fire({
            icon: "error",
            title: "",
            text: "Please Login First",
            footer: `<a href="./login.html">Login here</a>`
        });
        return
    }

    const req = await fetch(`${URL}/book/book`,{
        method:"POST",
        headers:{
            "Content-type": "application/json",
            "authorization": token
        },
        body:JSON.stringify({photographerId:userData._id, startTime:utcTime, endTime:utcTime2})
    })
    const res = await req.json();
    if(res.ok){
        Swal.fire(
            response.msg,
            '',
            'success'
        )
        // window.location.href = "./payment.html"
    } else {
        Swal.fire({
            icon: "error",
            title: "",
            text: res.message,
            footer: ``
        });
    }
    // console.log(utcTime,utcTime2); // Output: UTC format of selected time
})


var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
    navContents.classList.toggle("show-nav");
    console.log("clicked")
});

// username visible after logging in

let loginTag = document.getElementById("login")
let singupTag = document.getElementById("signup")

let isUserName = localStorage.getItem("userName")

if(isUserName){
    singupTag.style.display = "none"
    loginTag.textContent = "Hi," + " " + isUserName
    loginTag.style.color = "#dd4545"
}else{
    singupTag.style.display = "block"
    loginTag.textContent = "Login"
}