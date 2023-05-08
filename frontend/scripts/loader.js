function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

// Hide the loader
function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

// Hide the loader when the image has finished loading
window.addEventListener("load", function () {
    hideLoader();
});
showLoader(); // Show the loader