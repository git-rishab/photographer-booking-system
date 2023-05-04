const URL = "http://localhost:3000"
const form = document.querySelector("form");

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const formData = {
        email:form.email.value,
        pass:form.pwd.value
    }
    
    const request = await fetch(`${URL}/user/login`, {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(formData)
    });
    const response = await request.json();
    
    if(response.ok){
        Swal.fire(
            response.msg,
            '',
            'success'
        )
        setTimeout(()=>{
            window.location.href = "./login.html";
        },2500)
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.msg,
            footer: `<b><u><a href="./signup.html">Register Here!</a></u></b>`
        });
    }
    form.email.value = "";
    form.pwd.value = "";
})