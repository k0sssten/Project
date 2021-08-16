const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const { File } = require('../db/models');
const { User } = require('../db/models');

router.route('/') // ловим стартовый маршрут
  .get(async (req, res) => {
    if (req.query.err) {
      res.locals.err = "Не все поля заполнены"
    }
    res.locals.files = await File.findAll({where: {User_id: req.session.user.id}})
    res.render('standart') // рендерим страницу личного кабинета для обычного юзера
  });

router.route('./files')
.post (async (req, res) => {
  // console.log('----')
  const id = req.session.user.id;
  const createFile = await File.create({
    Title: req.file.filename,
    Path: req.file.path,
    User_id: id,
  })
  res.json(createFile)
})

module.exports = router
