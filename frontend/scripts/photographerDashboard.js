const boxes = document.querySelectorAll(".box");
const cont = document.getElementById("cont");
boxes.forEach(box => {
    box.addEventListener("click", () => {
        boxes.forEach((box) => { box.style.backgroundColor = "#5184eb"; box.style.color = "white" })

        box.style.backgroundColor = "white"
        box.style.color = "black";
    })
});

const URL = `https://bookmyshoot-backend.onrender.com`;
const token = localStorage.getItem("token");
const id = localStorage.getItem("id");
const queueId = document.getElementById("queue");
// const acceptedId = document.getElementById("accepted");
const meetingId = document.getElementById("meeting");
const tbody = document.querySelector("tbody");
const thead = document.querySelector("thead");
let photographer;
let bookingId;

// Function calls
queue();
fetchData();

// document.getElementById("settings").addEventListener("click",()=>{
//     window.location.href = "./photographer_details.html"
// })

async function fetchData() {
    showLoader2();
    const request = await fetch(`${URL}/user/${id}`);
    const data = await request.json();
    photographer = data
    localStorage.setItem("approved",data.user.approved)
    // console.log(photographer);
    hideLoader2();
}

function createDom(data, status) {
    hideLoader2();
    if(!photographer.user.approved){
        thead.innerHTML = "<h2>Your Request is still Pending, please wait to be Approved.</h2>"
        return;
    }
    const noClient = document.getElementById("noClient");
    tbody.innerHTML = null;
    if(status == "pending"){
        thead.innerHTML = `<tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Acccept</th>
        <th>Reject</th>
      </tr>`
    } else if (status == "accepted"){
        thead.innerHTML = `<tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Arrange a Virtual Meet</th>
      </tr>`
    } else {
        thead.innerHTML = `<tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Message Sent</th>
        <th>Host the Meeting</th>
      </tr>
        `
    }
    
    if(noClient){
        cont.removeChild(noClient);
    }
    if (!data?.bookings?.length && status != "meeting") {
        const p = document.createElement("p");
        p.innerText = "No Clients To show";
        p.setAttribute("class","noClient");
        p.setAttribute("id","noClient")
        return cont.append(p);
    }

    if (status == "pending") {
        data?.bookings?.forEach((el, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${i + 1}</td>
            <td>${el.client.name}</td>
            <td>${el.client.email}</td>
            <td class="start">${formatTime(el.start_time)}</td>
            <td class="end">${formatTime(el.end_time)}</td>
            <td onclick="sendResponse('${el._id}','accepted')" class="accept"><div>Accept</div></td>
            <td onclick="sendResponse('${el._id}','rejected')" class="reject"><div>Reject</div></td>`
            tbody.append(tr);
        })
    } else if(status == "accepted"){
        data?.bookings?.forEach((el, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${i + 1}</td>
            <td>${el.client.name}</td>
            <td>${el.client.email}</td>
            <td class="start">${formatTime(el.start_time)}</td>
            <td class="end">${formatTime(el.end_time)}</td>
            <td onclick="meet('${el._id}','${el.client.name}')" class="meet"><div>Invite</div></td>`
            tbody.append(tr);
        })
    } else {
        data.data.meetings?.forEach((el,i)=>{
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${i + 1}</td>
            <td>${el.name}</td>
            <td class="message">${el.msg}</td>
            <td class="link"><a href='${el.link}'><div>Start Meet</div></a></td>`;
            tbody.append(tr);
        })
    }

}

async function queue() {
    showLoader2();
    const request = await fetch(`${URL}/book/requests/pending`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization": token
        },
    })
    const pendingRequests = await request.json();
    createDom(pendingRequests, "pending")
}

function formatTime(time) {
    const utcTime = new Date(time);
    const normalTime = utcTime.toLocaleString().split(",").join(" |");
    return normalTime;
}

async function accepted() {
    showLoader2();
    const request = await fetch(`${URL}/book/requests/accepted`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization": token
        },
    })
    const acceptedRequest = await request.json();
    createDom(acceptedRequest, "accepted")
}

function logout() {
    fetch(`${URL}/user/logout`,{
        method:"POST"
    })
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to Log Out?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'see you soon',
                '',
                'success'
                )
            localStorage.clear();
            window.location.href = "./index.html"
        }
    })
}

async function sendResponse(id, status) {

    let notification;
    if(status == "accepted"){
        notification = `${photographer.user.name} has accepted your request`
    } else {
        notification = `Sorry! ${photographer.user.name} won't be available at the given time interval`
    }

    const request = await fetch(`${URL}/book/requests/${id}`,{
        method:"POST",
        headers:{
            "Content-type": "application/json",
            "authorization": token
        },
        body:JSON.stringify({ status, notification })
    })
    queue();
}
async function meet(bookingId, name) {
    const room = Math.floor(Math.random() * 900) + 100;
    Swal.fire({
        title: 'Enter custom Message',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'Enter Your custom message',
            required: true,
            id: 'message',
            value:"Let's connect to Discuss more details at "
        },
        showCancelButton: true,
        confirmButtonText: 'Send',
        showLoaderOnConfirm: true,

        allowOutsideClick: () => !Swal.isLoading()
    })
    document.getElementsByClassName('swal2-confirm swal2-styled')[0].addEventListener("click", async() => {
        const msg = document.getElementById("message").value;
        const link = `https://bookmyshoot.netlify.app/meeting.html?id=${room}` // link to be changed after deployment
        const request = await fetch(`${URL}/book/meeting/create`,{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                "authorization": token
            },
            body:JSON.stringify({msg,photographer:photographer.user._id,link,name})
        })
        
        const request2 = await fetch(`${URL}/book/${bookingId}/notifications`,{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                "authorization": token
            },
            body:JSON.stringify({message:`${msg},${link},${photographer.user.name}`})
        })
    })
}

async function meeting(){
    showLoader2();
    const req = await fetch(`${URL}/book/${photographer.user._id}`,{
        method:"GET",
        headers:{
            "Content-type": "application/json",
            "authorization": token
        }
    })
    const res = await req.json();
    createDom(res,"meeting")
}

var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
    navContents.classList.toggle("show-nav");
    // console.log("clicked")
});

// username visible after logging in

let loginTag = document.getElementById("login")
let singupTag = document.getElementById("signup")

let isUserName = localStorage.getItem("userName")


loginTag.textContent = "Hi," + " " + isUserName
loginTag.style.color = "#dd4545"
loginTag.setAttribute("href","./userDashboard.html");

