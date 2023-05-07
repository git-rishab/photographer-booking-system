
//  ALL DIVs
// dashborad div
let boxDiv = document.querySelector(".box-info");

// all registered users div
let allRegistrationDiv = document.querySelector("#all-users-div");
allRegistrationDiv.style.display = "none";

// all new requests div
let newRequestDiv = document.querySelector("#new-request-div");
newRequestDiv.style.display = "none";





// --------------------------------------------------
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
// const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

// menuBar.addEventListener('click', function () {
// 	sidebar.classList.toggle('hide');
// })



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})


if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})







// ------------------------new code----------------------------------

let ds = document.querySelectorAll(".sdbtn")
ds.forEach((ele)=>{	
	ele.addEventListener("click",(e)=>{
		console.log(e.target.innerText);
		if(e.target.innerText === "All Registrations"){
			fetchAllRegistration();
		}
		else if(e.target.innerText === "New Requests"){
			fetchNewRequest();
		}
	})
})

// all registrations
async function fetchAllRegistration(){
	await fetch(`https://bookmyshoot-backend.onrender.com/user/`,{
		method: "GET",
  			headers: {"Content-type": "application/json;charset=UTF-8",
					  "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0NjQ5MjMsImV4cCI6MTY4MzQ2ODUyM30.-plpffEXjq1LSnolK6MjTaqGJC2_6TzaDXQfO7qFvZg"
					}
	 	})
			.then((res)=>res.json())
			.then((data)=>{
				console.log(data);
				// showAllRegistration(data);
			})
			.catch((err)=>console.log(err));
	
}

function showAllRegistration(){
	allRegistrationDiv.style.display = "block";
	boxDiv.style.display = "none";
	newRequestDiv.style.display = "none";
	
}


// pending request
async function fetchNewRequest(){
	 await fetch(`https://bookmyshoot-backend.onrender.com/user/pending`,{
		method: "GET",
  			headers: {"Content-type": "application/json;charset=UTF-8",
					  "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0NjU3NDMsImV4cCI6MTY4MzQ2OTM0M30.Ypur-lTa41bFGO_pCB_8Y8GsFVgMDQHJZXGvtJAwFYw"
					}
	 	})
			.then((res)=>res.json())
			.then((data)=>{
				console.log(data);
				showNewRequest(data);
			})
			.catch((err)=>console.log(err));
}

function showNewRequest(data){
	boxDiv.style.display = "none";
	newRequestDiv.style.display = "block";
	allRegistrationDiv.style.display = "none";
	let table = document.querySelector("#new-request-div table");
	table.innerHTML = null;
	let thead = document.createElement("thead");
	let theadtr = document.createElement("tr");
	let th1 = document.createElement("th");
	th1.textContent = "Name";
	let th2 = document.createElement("th");
	th2.textContent = "Email";
	let th3 = document.createElement("th");
	th3.textContent = "Location";
	let th4 = document.createElement("th");
	th4.textContent = "Camera";
	let th5 = document.createElement("th");
	th5.textContent = "Expertise";
	theadtr.append(th1,th2,th3,th4,th5);
	thead.append(theadtr);
	table.append(thead);
	// data.forEach((ele)=>{
	// 	let td = document.createElement("td");
	// 	td.textContent = ele
	// })
}