
//  ALL DIVs
// dashborad div
let boxDiv = document.querySelector(".box-info");

// all registered users div
let allRegistrationDiv = document.querySelector("#all-users-div");
allRegistrationDiv.style.display = "none";

// all new requests div
let newRequestDiv = document.querySelector("#new-request-div");
newRequestDiv.style.display = "none";

//all BOOKING div
let bookingDiv = document.querySelector("#all-booking-div");
bookingDiv.style.display = "none";

// admin logout
let logout = document.querySelector("#admin-logout");
logout.addEventListener("click", async (e) => {

	await fetch(`http://localhost:3000/user/logout`, {
		method: "POST",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0NzM4MDIsImV4cCI6MTY4MzQ3NzQwMn0.xGdiD_XZNmKc_mtGqo--Ljxy_jCme0SwqmDgUehX0xE"
		},
		body: JSON.stringify({})
	})
		.then((res) => res.json())
		.then((data) => {
			alert("Loging out");
			// ********** windows.location.href
		})
		.catch((err) => console.log(err));
})


let allUserData = [];


// --------------------------------------------------
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i => {
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
	if (window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if (searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})


if (window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if (this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if (this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})







// ------------------------new code----------------------------------

let ds = document.querySelectorAll(".sdbtn")
ds.forEach((ele) => {
	ele.addEventListener("click", (e) => {
		if (e.target.innerText === "All Registrations") {
			fetchAllRegistration();
		}
		else if (e.target.innerText === "New Requests") {
			fetchNewRequest();
		}
		else if (e.target.innerText === "Clients") {
			fetchAllClients();
		}
		else if (e.target.innerText === "Photographers") {
			fetchAllPhotographers();
		}
		else if (e.target.innerText === "Booking Orders") {
			fetchAllBooking();
		}
	})
})


// fetch all registrations / users
async function fetchAllRegistration() {
	await fetch(`http://localhost:3000/user/`, {
		method: "GET",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0NzM4MDIsImV4cCI6MTY4MzQ3NzQwMn0.xGdiD_XZNmKc_mtGqo--Ljxy_jCme0SwqmDgUehX0xE"
		}
	})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			allUserData = data;
			showAllRegistration(data);
		})
		.catch((err) => console.log(err));

}
// show all registrations / users
function showAllRegistration(data) {
	boxDiv.style.display = "none";
	newRequestDiv.style.display = "none";
	allRegistrationDiv.style.display = "block";
	bookingDiv.style.display = "none";

	let tableParent = document.querySelector("#all-users-div>.order");

	tableParent.innerHTML = null;

	let table = document.createElement("table");

	//creating thead
	let thead = document.createElement("thead");

	//creating table row for thead
	let theadtr = document.createElement("tr");

	//creating table heading for thead
	let th1 = document.createElement("th");
	th1.textContent = "Name";
	let th2 = document.createElement("th");
	th2.textContent = "Email";
	let th3 = document.createElement("th");
	th3.textContent = "Role";
	let th4 = document.createElement("th");
	th4.textContent = "Action";
	theadtr.append(th1, th2, th3, th4);
	thead.append(theadtr);


	//creating tbody for table
	let tbody = document.createElement("tbody");
	data.forEach((ele) => {
		// creating table row for tbody
		let btr = document.createElement("tr");

		// creating table cell td for data
		let td1 = document.createElement("td");
		td1.textContent = ele.name;
		let td2 = document.createElement("td");
		td2.textContent = ele.email;
		let td3 = document.createElement("td");
		td3.textContent = ele.role;
		if (ele.role === "client") {
			btr.setAttribute("class", "status client");
		}
		else if (ele.role === "photographer") {
			btr.setAttribute("class", "photographer");
		}
		else if (ele.role === "admin") {
			btr.setAttribute("class", "admin");
		}
		let td4 = document.createElement("td");
		let removebtn = document.createElement("button")
		removebtn.textContent = "Remove";
		removebtn.style.backgroundColor = "red";
		removebtn.style.color = "white";
		removebtn.style.fontSize = "16px"
		removebtn.style.borderRadius = "40px";
		removebtn.style.padding = "10px 25px"
		removebtn.style.border = "none";
		td4.append(removebtn);

		btr.append(td1, td2, td3, td4);

		tbody.append(btr);
	})
	table.append(thead, tbody);

	tableParent.append(table);
}


// fetch all clients
async function fetchAllClients() {
	if (allUserData.length > 1) {
		let allclients = allUserData.filter((ele, index) => {
			return ele.role == "client";
		})
		showClients(allclients);
	}
	else {
		let allclients = [];
		await fetch(`http://localhost:3000/user/`, {
			method: "GET",
			headers: {
				"Content-type": "application/json;charset=UTF-8",
				"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0NzM4MDIsImV4cCI6MTY4MzQ3NzQwMn0.xGdiD_XZNmKc_mtGqo--Ljxy_jCme0SwqmDgUehX0xE"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				allclients = data.filter((ele, index) => {
					return ele.role == "client";
				});
				showClients(allclients);
			})
			.catch((err) => console.log(err));
	}
}
//show al clients
function showClients(data) {
	boxDiv.style.display = "none";
	newRequestDiv.style.display = "none";
	allRegistrationDiv.style.display = "block";
	bookingDiv.style.display = "none";

	let tableParent = document.querySelector("#all-users-div>.order");

	tableParent.innerHTML = null;

	let table = document.createElement("table");

	//creating thead
	let thead = document.createElement("thead");

	//creating table row for thead
	let theadtr = document.createElement("tr");

	//creating table heading for thead
	let th1 = document.createElement("th");
	th1.textContent = "Name";
	let th2 = document.createElement("th");
	th2.textContent = "Email";
	let th3 = document.createElement("th");
	th3.textContent = "Role";
	let th4 = document.createElement("th");
	th4.textContent = "Action";
	theadtr.append(th1, th2, th3, th4);
	thead.append(theadtr);


	//creating tbody for table
	let tbody = document.createElement("tbody");
	data.forEach((ele) => {
		// creating table row for tbody
		let btr = document.createElement("tr");
		btr.setAttribute("class", "client");
		// creating table cell td for data
		let td1 = document.createElement("td");
		td1.textContent = ele.name;
		let td2 = document.createElement("td");
		td2.textContent = ele.email;
		let td3 = document.createElement("td");
		td3.textContent = ele.role;
		let td4 = document.createElement("td");
		let removebtn = document.createElement("button")
		removebtn.textContent = "Remove";
		removebtn.style.backgroundColor = "red";
		removebtn.style.color = "white";
		removebtn.style.fontSize = "16px"
		removebtn.style.borderRadius = "40px";
		removebtn.style.padding = "10px 25px"
		removebtn.style.border = "none";
		td4.append(removebtn);

		btr.append(td1, td2, td3, td4);

		tbody.append(btr);
	})
	table.append(thead, tbody);

	tableParent.append(table);
}


// fetch all photographer
async function fetchAllPhotographers() {
	if (allUserData.length > 1) {
		let allphotographers = allUserData.filter((ele, index) => {
			return (ele.role == "photographer" && ele.approved == true);
		})
		showPhotographers(allphotographers);
		// console.log(allphotographers)
	}
	else {
		let allphotographers = [];
		await fetch(`http://localhost:3000/user/`, {
			method: "GET",
			headers: {
				"Content-type": "application/json;charset=UTF-8",
				"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0NzM4MDIsImV4cCI6MTY4MzQ3NzQwMn0.xGdiD_XZNmKc_mtGqo--Ljxy_jCme0SwqmDgUehX0xE"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				allphotographers = data.filter((ele, index) => {
					return (ele.role == "photographer" && ele.approved == true);
				});
				showPhotographers(allphotographers);
				// console.log(allphotographers)
			})
			.catch((err) => console.log(err));
	}
}
//show all photographers
function showPhotographers(data) {
	boxDiv.style.display = "none";
	newRequestDiv.style.display = "none";
	allRegistrationDiv.style.display = "block";
	bookingDiv.style.display = "none";

	let tableParent = document.querySelector("#all-users-div>.order");

	tableParent.innerHTML = null;

	let table = document.createElement("table");

	//creating thead
	let thead = document.createElement("thead");

	//creating table row for thead
	let theadtr = document.createElement("tr");

	//creating table heading for thead
	let th1 = document.createElement("th");
	th1.textContent = "Name";
	let th2 = document.createElement("th");
	th2.textContent = "Email";
	let th3 = document.createElement("th");
	th3.textContent = "Address";
	let th4 = document.createElement("th");
	th4.textContent = "Camera";
	let th5 = document.createElement("th");
	th5.textContent = "Expertise";
	let th6 = document.createElement("th");
	th6.textContent = "Action";
	theadtr.append(th1, th2, th3, th4, th5, th6);
	thead.append(theadtr);


	//creating tbody for table
	let tbody = document.createElement("tbody");
	data.forEach((ele) => {
		// creating table row for tbody
		let btr = document.createElement("tr");
		btr.setAttribute("class", "photographer");

		// creating table cell td for data
		let td1 = document.createElement("td");
		td1.textContent = ele.name;
		let td2 = document.createElement("td");
		td2.textContent = ele.email;
		let td3 = document.createElement("td");
		td3.textContent = ele.address;
		let td4 = document.createElement("td");
		td4.textContent = ele.camera;
		let td5 = document.createElement("td");
		td5.textContent = ele.expertise;
		let td6 = document.createElement("td");
		let removebtn = document.createElement("button")
		removebtn.textContent = "Remove";
		removebtn.style.backgroundColor = "red";
		removebtn.style.color = "white";
		removebtn.style.fontSize = "16px"
		removebtn.style.borderRadius = "40px";
		removebtn.style.padding = "10px 25px"
		removebtn.style.border = "none";
		td6.append(removebtn);

		btr.append(td1, td2, td3, td4, td5, td6);

		tbody.append(btr);
	})
	table.append(thead, tbody);

	tableParent.append(table);
	// console.log(data)
}


//fetch pending / new request
async function fetchNewRequest() {
	await fetch(`http://localhost:3000/user/pending`, {
		method: "GET",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0OTQ5NTEsImV4cCI6MTY4MzQ5ODU1MX0.EiyQJVIPaGGF0bLYCziCb-h1VZdUx101ALjB9RIIkkc"
		}
	})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			showNewRequest(data);
		})
		.catch((err) => console.log(err));
}
//show pending / new request
function showNewRequest(data) {
	allRegistrationDiv.style.display = "none";
	boxDiv.style.display = "none";
	newRequestDiv.style.display = "block";
	bookingDiv.style.display = "none";

	let tableParent = document.querySelector("#new-request-div>.order");

	tableParent.innerHTML = null;

	let table = document.createElement("table");

	//creating thead
	let thead = document.createElement("thead");

	//creating table row for thead
	let theadtr = document.createElement("tr");

	//creating table heading for thead
	let th1 = document.createElement("th");
	th1.textContent = "Name";
	let th2 = document.createElement("th");
	th2.textContent = "Email";
	let th3 = document.createElement("th");
	th3.textContent = "Address";
	let th4 = document.createElement("th");
	th4.textContent = "Camera";
	let th5 = document.createElement("th");
	th5.textContent = "Expertise";
	let th6 = document.createElement("th");
	th6.textContent = "Action";
	theadtr.append(th1, th2, th3, th4, th5, th6);
	thead.append(theadtr);


	//creating tbody for table
	let tbody = document.createElement("tbody");
	data.forEach((ele) => {
		// creating table row for tbody
		let btr = document.createElement("tr");

		// creating table cell td for data
		let td1 = document.createElement("td");
		td1.textContent = ele.name;
		let td2 = document.createElement("td");
		td2.textContent = ele.email;
		let td3 = document.createElement("td");
		td3.textContent = ele.address;
		let td4 = document.createElement("td");
		td4.textContent = ele.camera;
		let td5 = document.createElement("td");
		td5.textContent = ele.expertise;
		let td6 = document.createElement("td");
		let yesbtn = document.createElement("button");
		yesbtn.textContent = "Approve";
		yesbtn.style.backgroundColor = "#81C784"
		yesbtn.style.border = "none";
		yesbtn.style.width = "50%";
		yesbtn.style.padding = "5px";
		yesbtn.style.color = "white";
		yesbtn.addEventListener("click", () => {
			approveRequest(ele);
		})
		let nobtn = document.createElement("button");
		nobtn.textContent = "Reject";
		nobtn.style.backgroundColor = "#FF7043"
		nobtn.style.border = "none";
		nobtn.style.width = "50%";
		nobtn.style.padding = "5px";
		nobtn.style.color = "white";
		nobtn.addEventListener("click", () => {
			rejectRequest(ele);
		})

		td6.append(yesbtn, nobtn);

		btr.append(td1, td2, td3, td4, td5, td6);

		tbody.append(btr);
	})
	table.append(thead, tbody);

	tableParent.append(table);

}


//fetch all bookings
async function fetchAllBooking() {
	await fetch(`http://localhost:3000/book/`, {
		method: "GET",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0NzM4MDIsImV4cCI6MTY4MzQ3NzQwMn0.xGdiD_XZNmKc_mtGqo--Ljxy_jCme0SwqmDgUehX0xE"
		}
	})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			showBooking(data)
		})
		.catch((err) => console.log(err));
}
//show all bookings
function showBooking(data) {
	allRegistrationDiv.style.display = "none";
	boxDiv.style.display = "none";
	newRequestDiv.style.display = "none";
	bookingDiv.style.display = "block";

	let tableParent = document.querySelector("#all-booking-div>.order");

	tableParent.innerHTML = null;

	let table = document.createElement("table");

	//creating thead
	let thead = document.createElement("thead");

	//creating table row for thead
	let theadtr = document.createElement("tr");

	//creating table heading for thead
	let th1 = document.createElement("th");
	th1.textContent = "Client";
	let th2 = document.createElement("th");
	th2.textContent = "Photographer";
	let th3 = document.createElement("th");
	th3.textContent = "Created At";
	let th4 = document.createElement("th");
	th4.textContent = "Start Time";
	let th5 = document.createElement("th");
	th5.textContent = "End Time";
	let th6 = document.createElement("th");
	th6.textContent = "Status";
	theadtr.append(th1, th2, th3, th4, th5, th6);
	thead.append(theadtr);

	// creating tbody to append booking data
	let tbody = document.createElement("tbody");
	data.forEach((ele) => {
		// creating table row for tbody
		let btr = document.createElement("tr");
		btr.setAttribute("class", "trbooking")

		// creating table cell td for data
		let td1 = document.createElement("td");
		td1.textContent = ele.client;
		// td1.setAttribute("class","tdbooking");
		let td2 = document.createElement("td");
		td2.textContent = ele.photographer;
		// td2.setAttribute("class","tdbooking");
		let td3 = document.createElement("td");
		td3.textContent = ele.createdAt;
		// td3.setAttribute("class","tdbooking");
		let td4 = document.createElement("td");
		td4.textContent = ele.start_time;
		// td4.setAttribute("class","tdbooking");
		let td5 = document.createElement("td");
		td5.textContent = ele.end_time;
		// td5.setAttribute("class","tdbooking");
		let td6 = document.createElement("td");
		td6.textContent = ele.status;
		// td6.setAttribute("class","tdbooking");

		if (ele.status === "accepted") {
			btr.setAttribute("class", "accepted");
		}
		else if (ele.status === "pending") {
			btr.setAttribute("class", "pending");
		}
		else if (ele.status === "rejected") {
			btr.setAttribute("class", "rejected");
		}

		btr.append(td1, td2, td3, td4, td5, td6);

		tbody.append(btr);
	})

	table.append(thead, tbody);

	tableParent.append(table);
}




// ----------approving photographer request
async function approveRequest(user) {
	user.approved = true;
	await fetch(`http://localhost:3000/user/applications/${user.email}`, {
		method: "PUT",
		body: JSON.stringify(user),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0OTYyMDksImV4cCI6MTY4MzQ5OTgwOX0.iRvQ5QX8z1rGz0a6IwezkxusLTnkn-rCUeD7BI8f_us"
		}
	})
		.then(response => response.json())
		.then(json => alert(json.message))
		.catch((err) => console.log(err))
		.finally(() => {
			fetchNewRequest();
		})
}

// ----------rejecting photographer request
async function rejectRequest(user) {
	user.approved = false;
	await fetch(`http://localhost:3000/user/applications/${user.email}`, {
		method: "PUT",
		body: JSON.stringify(user),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OTZlZmZkNTcyMTYyNjgxNWNjY2YiLCJpYXQiOjE2ODM0OTYyMDksImV4cCI6MTY4MzQ5OTgwOX0.iRvQ5QX8z1rGz0a6IwezkxusLTnkn-rCUeD7BI8f_us"
		}
	})
		.then(response => response.json())
		.then(json => alert(json.message))
		.catch((err) => console.log(err))
		.finally(() => {
			fetchNewRequest();
		})
}