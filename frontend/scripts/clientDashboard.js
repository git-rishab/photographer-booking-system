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
const tbody = document.querySelector("tbody");
const thead = document.querySelector("thead");
let photographer;
let bookingId;

// Function calls
fetchData();
allPhotographer();

async function fetchData() {
    showLoader2();
    const request = await fetch(`${URL}/user/${id}`);
    const data = await request.json();
    photographer = data
    document.getElementById("name").innerText = `Welcome Back! ${data.user.name}`
    hideLoader2();
}

function createDom(data, status) {
    hideLoader2();
    const noClient = document.getElementById("noClient");
    tbody.innerHTML = null;
    if (status == "all") {
        thead.innerHTML = `<tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Status</th>
      </tr>`
    } else {
        thead.innerHTML = `<tr>
        <th>S.No</th>
        <th>From</th>
        <th>Notification</th>
        <th>Join Meeting</th>
      </tr>`
    }

    if (noClient) {
        cont.removeChild(noClient);
    }
    if (!data?.bookings?.length && status != "notification") {
        const p = document.createElement("p");
        p.innerText = "No Bookings To show";
        p.setAttribute("class", "noClient");
        p.setAttribute("id", "noClient");
        return cont.append(p);
    }

    if (status == "all") {
        data?.bookings?.forEach((el, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${i + 1}</td>
            <td>${el.photographer.name}</td>
            <td>${el.photographer.email}</td>
            <td class="start">${formatTime(el.start_time)}</td>
            <td class="end">${formatTime(el.end_time)}</td>
            <td class='${el.status}'><div>${el.status}</div></td>`
            tbody.append(tr);
        })
    } else {
        data?.forEach((el, i) => {
            const tr = document.createElement("tr");
            let temp = el.split(",");
            let name = temp[temp.length-1];
            let link = temp[temp.length-2];
            temp.pop();
            temp.pop();
            let notification = temp.join(",");
            tr.innerHTML = `<td>${i + 1}</td>
            <td>${name}</td>
            <td class="message">${notification}</td>
            <td class="link"><a href='${link}'><div>Join Meet</div></a></td>`;
            tbody.append(tr);
        })
    }

}

function formatTime(time) {
    const utcTime = new Date(time);
    const normalTime = utcTime.toLocaleString().split(",").join(" |");
    return normalTime;
}

async function allPhotographer() {
    showLoader2();
    const req = await fetch(`${URL}/book/requests`, {
        method:"GET",
        headers: {
            "Content-type": "application/json",
            "authorization": token
        }
    });
    const res = await req.json();
    createDom(res, "all");
}

async function notification() {
    showLoader2();
    const req = await fetch(`${URL}/book/notifications`, {
        method:"GET",
        headers: {
            "Content-type": "application/json",
            "authorization": token
        }
    });
    const res = await req.json();    
    createDom(res.messages,"notification")
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