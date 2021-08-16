
const getFileForm = document.querySelector("#optionsForm")
const fileOptions = document.forms.optionsForm;
let tableId = document.querySelector('[data-id]');
console.log(getFileForm);
console.log(fileOptions);
getFileForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = Object.fromEntries(new FormData(getFileForm));
  console.log(formData);
  // window.location =`/chart/${tableId.dataset.id}/?col=${formData.column}&seq=${formData.contactBy}`;
  let  response = await fetch (`/chart/${tableId.dataset.id}/?col=${formData.column}&seq=${formData.contactBy}`);
  let config = await response.json();
  let chart = document.getElementById('myChart')
  if(chart){
    chart.remove();
    const Graph = document.querySelector('.Graph');
    Graph.insertAdjacentHTML('beforeend', '<canvas id="myChart"></canvas>')
    const myChart = new Chart(document.getElementById('myChart'), config);  
  }

})
