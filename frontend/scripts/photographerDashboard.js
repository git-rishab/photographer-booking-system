const boxes = document.querySelectorAll(".box");
const cont = document.getElementById("cont");
boxes.forEach(box => {
    box.addEventListener("click", ()=>{
        boxes.forEach((box)=> {box.style.backgroundColor = "#5184eb"; box.style.color = "white"})
        
        box.style.backgroundColor = "white"
        box.style.color = "black";
    })
});

const URL = `http://localhost:3000`;
const token = localStorage.getItem("token");
const id = localStorage.getItem("id");

(async function fetchData(){
    const request = await fetch(`${URL}/user/${id}`);
    const data = await request.json();
    document.getElementById("name").innerText = `Welcome Back! ${data.user.name}`

    const request2 = await fetch(`${URL}/book/requests/accepted`,{
        method:"GET",
        headers:{
            "Content-type": "application/json",
            "authorization":token
        },
    })
    const pendingRequests = await request2.json();
    const tbody = document.querySelector("tbody");

    pendingRequests.bookings.forEach((el,i)=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${i+1}</td>
        <td>${el.name}</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td class="accept"><div>Accept</div></td>
        <td class="reject"><div>Reject</div></td>`
    })
}())