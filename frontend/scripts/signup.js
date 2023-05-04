const form = document.querySelector("form");
const URL = "http://localhost:3000"

form.addEventListener("submit", async(e)=>{
    const checkedValue = document.querySelector('input[type=radio]:checked').value;
    e.preventDefault();
    const formData = {
        name:form.name.value,
        email:form.email.value,
        pass:form.pass.value,
        role:checkedValue
    }
    
    const request = await fetch(`${URL}/user/register`, {
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
            footer: `<b><u><a href="./login.html">Login Here!</a></u></b>`
        });
    }
})