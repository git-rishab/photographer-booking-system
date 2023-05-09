function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

// Hide the loader
function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

// Hide the loader when the image has finished loading
window.addEventListener("load", function () {
    // hideLoader();
});

// Example usage
showLoader(); // Show the loader
  // Load your content here

// Assuming the URL is https://example.com/?name=John&age=25

// Get the current URL
const currentUrl = window.location.href;

// Create a URL object from the current URL
const url = new URL(currentUrl);

// Get the search parameters from the URL
const searchParams = url.searchParams;

// Get specific query parameters
const token = searchParams.get('token');
const id = searchParams.get('id');
const role = searchParams.get('role');
const approved = searchParams.get('approved')

localStorage.setItem("token",token);
localStorage.setItem("id",id);

if(role == "photographer" && approved == "true"){
    window.location.href = "./photographerDashboard.html"
} else if(role == "photographer"){
    window.location.href = "./photographer_details.html"
} else {
    window.location.href = "./clientDashboard.html";
}