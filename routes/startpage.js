const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.route('/')
  .get((req, res) => {
    if (req.query.err) {
      res.locals.err = 'Не найден логин или пароль'
    }
    res.render('startpage')
  })
router.route('/login')
  .post(async (req, res) => {
    const { Login, Password } = req.body;
    if (Login && Password) {// если введен логин и пароль на фронте
      const { Role } = await User.findOne({ where: { Login } });
      const currentUser = await User.findOne({ where: { Login } });// находим по совпадающему Логину в таблице
      if (Role === 'Admin') { // ..и если логин админский 
        if (currentUser && (Password === currentUser.Password)) {// .. и если пароли совпадают 
          req.session.user = { id: currentUser.id, name: currentUser.Login, isAdmin: true }
          return res.redirect('/account')
        } else {
          return res.redirect('/startpage/?err=true')
        }
      } else if (Role === 'User') { //  а если обычный юзер
        if (currentUser && (await bcrypt.compare(Password, currentUser.Password))) { 
        // if (currentUser && (Password === currentUser.Password)) { // для теста пароль не хэшируется*
          req.session.user = { id: currentUser.id, name: currentUser.Login, isAdmin: false }
          return res.redirect('/standart')// +!
        } else {
          return res.redirect('/startpage/?err=true')
        }
      }
    } else { // в случае если не введен логин или пароль
      return res.redirect('/startpage/?err=true')
    }
  })

router.route('/logout')
  .get((req, res) => {
    req.session.destroy()
    res.clearCookie('sId').redirect('/')
  })

module.exports = router
