const form = document.querySelector('#fileUploadForm');


form.addEventListener('submit', async(event) => {
  event.preventDefault();

  const fileInput = document.querySelector('input[type=file]');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);

  await fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Error uploading file');
      }
    })
    .catch((error) => {
      console.error('Error uploading file', error);
    });
});

const img = document.getElementById('myImage');
const imgId = '564525acced920983f988bba3'; // Replace this with the ID of your image
const url = `http://localhost:3000/${imgId}`;

fetch(url)
  .then(res => res.text())
  .then(data => {
    console.log(data)
    img.src = `data:image/png;base64,${data}`;
  });
