const { Router } = require('express');
const router = Router();
const { File } = require('../db/models');
const xlsx = require('node-xlsx').default;
const path = require('path');

router.get('/:id', async (req, res, next) => {
  const filescard = await File.findOne({ where: { id: req.params.id}})

// console.log(filescard.Path)
  const work = xlsx.parse(path.join(__dirname, `../${filescard.Path}`))[0].data;

  let result = [];
  work.forEach((el) => {
    if (el.length) result.push(el);
  });
  // Обрезаю заголовки столбцов вынося их в отдельный массив
  const labels = result.splice(0, 1).flat();
  labels.splice(0, 1);
  labels.splice(1, 3);
  // console.log(labels);
  filescard.labels = labels;
  // console.log(filescard.labels)

  res.locals.options = filescard.labels;
  res.locals.fileId = filescard.id;
  console.log(filescard);
  return res.render('filescard', {filescard, dateCond: (filescard.createdAt == filescard.updatedAt)})
})


module.exports = router;
