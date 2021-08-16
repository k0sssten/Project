const buttonCreate = document.querySelector('[data-createUser]');
const myDiv = document.querySelector('.form-div');
const createdUsersBar = document.querySelector('[data-createdusersbars]')
const formCreateUser = document.forms.formCreateUser;



buttonCreate.addEventListener('click', (event) => {
  myDiv.style.display = 'block';
})


myDiv.addEventListener('submit', async (event) => {
  event.preventDefault()
  console.log(event.target)
  const dataForBack = await Object.fromEntries(new FormData(formCreateUser))
  console.log(dataForBack);
  let response = await fetch('/account', {
    method: ('POST'),
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataForBack)
  })
  const dataFromBack = await response.json()
  myDiv.style.display = 'none'; // скрывает форму заполнения юзера по нажатию на Создать
  const ul = document.querySelector('ul');
  ul.insertAdjacentHTML('beforeend', addNewAdd(dataFromBack))
  function addNewAdd(data) {
    return `<li class="list-group-item">Имя: <a href='/usercard/${data.id}'>${data.FullName}</a> Логин: ${data.Login} Команда: ${data.Team_id}    <a href="/edit/del/${data.id}">Удалить</a></li>`
  }
})



