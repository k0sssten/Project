const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const { File } = require('../db/models');
const { User } = require('../db/models');

router.route('/:id') // ловим стартовый маршрут
  .get(async (req, res) => {
    if (req.query.err) {
      res.locals.err = "Не все поля заполнены"
    }
    const usercard = await User.findOne({ where: { id: req.params.id}})
    res.locals.files = await File.findAll({where: {User_id: req.params.id}})
    res.render('usersfiles', {usercard}) // рендерим страницу с файлами выбранного юзера
  })
  
module.exports = router
