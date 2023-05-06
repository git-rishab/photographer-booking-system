const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
    box.addEventListener("click", ()=>{
        boxes.forEach((box)=> {box.style.backgroundColor = "#5184eb"; box.style.color = "white"})

        box.style.backgroundColor = "white"
        box.style.color = "black";
    })
});
