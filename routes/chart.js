const { Router } = require('express');
const router = Router();
const { File } = require('../db/models');
const xlsx = require('node-xlsx').default;
const path = require('path');

router.get('/:id', async (req, res) => {
  const filescard = await File.findOne({ where: { id: req.params.id}})
  const work = xlsx.parse(path.join(__dirname, `../${filescard.Path}`))[0].data;

  let result = [];

  work.forEach((el) => {
    if (el.length) result.push(el);
  });

  const labels = result.splice(0, 1).flat();
  labels.splice(0, 1);
  labels.splice(1, 2);

  result.forEach((el) => {
    el.splice(0, 1);
    el.splice(1, 2);
  });

  const tableBase = result;
  result = [];

  const index = labels.indexOf(req.query.col);

  tableBase.forEach((el) => {
    result.push(el[index]);
  })

  const graph = {};

  result.forEach((el) => {
    if(el) {
      if (!graph[el]) {
        graph[el] = 1
      }
      graph[el] += 1
    }
  });

  const data = [];
  const titles = [];

  const order = Object.entries(graph).sort((a, b) => {
    return (+a[1] - (+b[1]))
  })

  order.forEach((el) => {
    titles.push(el[0]);
    data.push(el[1]);
  });

  console.log(req.query);

  const config = {
    type: req.query.seq,
    data: {
      labels: titles,
      datasets: [
        {
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

  // result.splice(0, 1);
  // result.splice(1, 3);
  // console.log(req.params)
  // console.log(req.query);
  // console.log(labels);
  // console.log(index);

  res.json(config);
})

module.exports = router;
