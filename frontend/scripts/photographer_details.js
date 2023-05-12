const dropZone = document.getElementById('dropZone');
const uploadForm = document.getElementById('uploadForm');
const detailsForm = document.getElementById('details_Form');
const url = "https://bookmyshoot-backend.onrender.com"
// prevent default drag behaviors
if (dropZone) {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  // highlight drop zone when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('dragover');
    }, false);
  });

  // remove highlight when item is dragged out of the drop zone
  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('dragover');
    }, false);
  });

  // handle file drop
  dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    console.log("hi");
    console.log(files);
    handleFiles(files);
  }, false);
}


//   // handle file selection from input
//   document.getElementById('image').addEventListener('change', (e) => {
//     handleFiles(e.target.files);
//   }, false);

// handle files and add them to FormData object
async function handleFiles(files) {
  const formData = new FormData(uploadForm);
  for (let i = 0; i < files.length; i++) {
    formData.append('image', files[i]);
  }
  // send formData using fetch API
  await fetch(`${url}/user/upload`, {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem("token")
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error(error);
    });
}

detailsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    camera: detailsForm.camera.value,
    expertise: detailsForm.expertise.value,
    address: detailsForm.address.value,
    price: detailsForm.price.value
  }

  const request = await fetch(`${url}/user/submit_photographer_details`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(formData)
  });

  const response = await request.json();

  if (response) {
    Swal.fire(
      "Your Registration is Successfull",
      'Please wait for the Admin to review your Application',
      'success'
    )
    setTimeout(() => {
      window.location.href = "./photographerDashboard.html";
    }, 2500)
  }
})

// username visible after logging in

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

if(isUserName){
    singupTag.style.display = "none"
    loginTag.textContent = "Hi," + " " + isUserName
    loginTag.style.color = "#dd4545"
    loginTag.setAttribute("href","./userDashboard.html");
}else{
    singupTag.style.display = "block"
    loginTag.textContent = "Login"
}
