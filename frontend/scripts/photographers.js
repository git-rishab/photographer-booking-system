let container = document.getElementById('gallery')
// Fetch the images data from the server
fetch('http:localhost:3000/user/images')
    .then(response => response.json())
    .then(data => {
        Display(data.images,data.photographers)
    });

function Display(images,photographers) {
    container.innerHTML = null;
    images.forEach((image) => {
        let photographer_div=document.createElement("div");
        let photographer_details= document.createElement("div");
        let photographer_images=document.createElement("div");
        photographer_details.setAttribute("class","details_div")
        photographer_images.setAttribute("class","images_div")
        photographer_div.setAttribute("id",`${image._id}`)
        let photographer;
        for(let i=0;i<photographers.length;i++){
            if(photographers[i]._id==image._id){
                photographer=photographers[i];
                let name_div=document.createElement("div");
                name_div.setAttribute("class","name_div");
                let book_div=document.createElement("div");
                book_div.setAttribute("class","book_div")
                let name= document.createElement("h3");
                name.innerText=photographer.name;
                let price= document.createElement("p");
                price.innerText=`₹${photographer.price}`;
                let location= document.createElement("p");
                location.innerText=`📍${photographer.address}`;
                let book= document.createElement("button");
                book.innerText="Book";
                name_div.append(name,location)
                book_div.append(price,book)
                photographer_details.append(name_div,book_div);
                break;
            }
        }
        for (let i = 0; i < image.images.length; i++) {
            const img = new Image();
            img.src = `data:image/png;base64,${image.images[i]._id}`
            photographer_images.appendChild(img);
            photographer_div.append(photographer_images,photographer_details)
        }
        container.append(photographer_div)

    })

}
