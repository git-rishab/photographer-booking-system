const boxes = document.querySelectorAll(".box");
const cont = document.getElementById("cont");
boxes.forEach(box => {
    box.addEventListener("click", ()=>{
        boxes.forEach((box)=> {box.style.backgroundColor = "#5184eb"; box.style.color = "white"})
        
        box.style.backgroundColor = "white"
        box.style.color = "black";
    })
});

