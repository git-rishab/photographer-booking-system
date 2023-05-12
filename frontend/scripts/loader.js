function showLoader() {
    const loader = document.getElementById("loader");
    if(!loader){
        return;
    }
    loader.style.display = "flex";
}

// Hide the loader
function hideLoader() {
    const loader = document.getElementById("loader");
    if(!loader){
        return;
    }
    document.getElementById("loader").style.display = "none";
}

// Hide the loader when the image has finished loading
window.addEventListener("load", function () {
    hideLoader();
});
showLoader(); // Show the loader