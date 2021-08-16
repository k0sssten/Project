// const xlsx = require('node-xlsx').default;
let xlsx = await  import ('node-xlsx');

// распарсил таблицу
const work = xlsx.parse(`base.xlsx`)[0].data;
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
Object.entries(graph).forEach((el) => {
  titles.push(el[0]);
  data.push(el[1])
});
console.log(data, titles);

// module.exports = {data, title}

// === include 'setup' then 'config' above ===

// const labels = Utils.months({count: 7});
// console.log(work.length)
// let result = [];
// work.forEach((el) => result.push(el))
// console.log(result[75]);
