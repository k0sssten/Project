const getFileForm = document.querySelector("#getFileForm")
const fileField = document.querySelector('input[type="file"]')
const list = document.querySelector('.list-group');
getFileForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = new FormData();
  const file = event.target.file
  console.log(file);
  formData.append('myFile', fileField.files[0])
  const response =  await fetch('/account/files', {
    method: "POST",
    body: formData
  })
  const result = await response.json()
  console.log(result);
  const ul = document.createElement('ul');
  const li = `<li class="list-group-item">Название файла: <a href='/filescard/${result.id}'>${result.Title}</a>`;
  list.insertAdjacentHTML('beforeend', li)
})
