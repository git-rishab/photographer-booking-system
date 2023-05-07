let container = document.getElementById('gallery')
// Fetch the images data from the server

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/user/images');
        const data = await response.json();
        Display(data.images, data.photographers);
    } catch (error) {
        console.error(error);
    }
}

fetchData();

let count= document.getElementById("count_div")

function Display(images, photographers) {
    container.innerHTML = null;
    count.innerHTML = null;
    let count_title= document.createElement("h4")
    count_title.innerText= +photographers.length+ " Photographers😍";
    count.append(count_title)
    photographers.forEach((photographer) => {
        let photographer_div = document.createElement("div");
        let photographer_details = document.createElement("div");
        let photographer_images = document.createElement("div");
        photographer_details.setAttribute("class", "details_div")
        photographer_images.setAttribute("class", "images_div")
        photographer_div.setAttribute("id", `${photographer._id}`)
        photographer_div.setAttribute("class", "photographer_div")
        let images_data;
        for (let i = 0; i < images.length; i++) {
            if (images[i]._id == photographer._id) {
                images_data = images[i];
                console.log(images_data)
                let name_div = document.createElement("div");
                name_div.setAttribute("class", "name_div");
                let book_div = document.createElement("div");
                book_div.setAttribute("class", "book_div");
                let view_profile = document.createElement("button");
                view_profile.setAttribute("id", "view_profile")
                view_profile.innerText = "View Profile"
                let name = document.createElement("p");
                name.innerText = photographer.name;
                name.setAttribute("id", "name")
                let price = document.createElement("p");
                price.setAttribute("id", "price")
                price.innerText = '\u20B9' + `${photographer.price} /hr`;
                let location = document.createElement("p");
                location.innerText = `\ud83d\udccd${photographer.address}`;
                name_div.append(name, location)
                book_div.append(price, view_profile)
                photographer_details.append(name_div, book_div);
                for (let i = 0; i < images_data.images.length; i++) {
                    const img = new Image();
                    img.src = `data:image/png;base64,${images_data.images[i]._id}`
                    photographer_images.appendChild(img);
                    photographer_div.append(photographer_images, photographer_details)
                }
                container.append(photographer_div)
                // break;

            }
        }

    })
}

/********************************************* Sorting ***************************************************/


const price_sort = document.getElementById("form-select")
let sortvalue;
let location_sort = document.getElementById("location")
let locationValue;


price_sort.addEventListener("change", async() => {
    sortvalue = price_sort.value
    locationValue= location_sort.value;
    await fetch(`http://localhost:3000/user/SortByPrice?Sortby=${sortvalue}&location=${locationValue}`)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            Display(data.images,data.photographers)
        })
        .catch(err => console.log(err));
})

location_sort.addEventListener("change", async() => {
    sortvalue = price_
    sort.value
    locationValue= location_sort.value;
    await fetch(`http://localhost:3000/user/SortByPrice?Sortby=${sortvalue}&location=${locationValue}`)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            Display(data.images,data.photographers)
            if(!data.photographers.length){
                Swal.fire('Oops, Photographers not found at this location ☹')
                setTimeout(()=>{
                    window.location.href="./photographers.html"
                }, 2500)
            }
        })
        .catch(err => console.log(err));
})

