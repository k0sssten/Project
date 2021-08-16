
(async function graphConfig () {
  let response = await fetch ('/Chart'); 
  config = await response.json();
  console.log(document.getElementById('myChart'))
  const myChart = new Chart(document.getElementById('myChart'), config);  
})();




