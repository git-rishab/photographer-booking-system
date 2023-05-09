function showLoader2() {
    document.getElementById("loader2").style.display = "flex";
}

// Hide the loader
function hideLoader2() {
    console.log(document.querySelectorAll(".loader2"));
    document.getElementById("loader2").style.display = "none";
}
// hideLoader2();
// Hide the loader when the image has finished loading
// window.addEventListener("load", function () {
//     hideLoader2();
// });
//showLoader2(); // Show the loader