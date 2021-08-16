const router = require('express').Router();
const xlsx = require('node-xlsx').default;
const path = require('path');

router.get('/', (req, res) => {
  console.log('imHire')
  const work = xlsx.parse(path.join(__dirname, '../base.xlsx'))[0].data;
  // Отчищаю таблицу от пустых строк и получаю массив строк таблицы
  let result = [];
  work.forEach((el) => {
    if (el.length) result.push(el);
  });
  // Обрезаю заголовки столбцов вынося их в отдельный массив
  const labels = result.splice(0, 1).flat();
  
  // после чего заношу значения таблицы без тайтлов в массив
  const tableBase = result;
  
  // отчищаю резулт, для дальнейшей работы с ним
  result = [];
  
  // Определяем столбец по которому хотим вывести график
  const index = labels.indexOf('Модель');
  
  // пушу в наш пустой массив значения выбранного столбца
  tableBase.forEach((el) => result.push(el[index]));
  
  // создаю объект по которому будет строиться график (где ключ будет значение из ячейки столбца, а value количество этих значений во всём столбце )
  const graph = {};
  result.forEach((el) => {
    if(el) {
      if (!graph[el]) {
        graph[el] = 1
      }
      graph[el] += 1
    }
  });
  
  // const array = Object.entries(graph);
  const data = [];
  const titles = [];
  
  // Object.entries(graph).forEach((el) => {
  //   titles.push(el[0]);
  //   data.push(el[1])
  // });
  const order = Object.entries(graph).sort((a, b) => {
    return (+a[1] - (+b[1]))
  })
  order.forEach((el) => {
    titles.push(el[0]);
    data.push(el[1]);
  });


  
  
  const config = {
    type: 'bar',
    data: {
      labels: titles,
      datasets: [
        {
          // order: 10,
          maxBarThickness: 20,
          label: 'My First Dataset',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 3,
          // hoverOffset: 4
        },
      ],
    },
    options: {
        indexAxis: 'y',
    },
  };

  res.json(config);
})

module.exports = router;
