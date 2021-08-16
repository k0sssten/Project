const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const {User, File } = require('../db/models');
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
// const upload = multer({ storage: storage })
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    
      cb(null, "./public/uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});

const upload = multer({storage:storageConfig}).single("myFile")
//const { User } = require('../db/models');

router.route('/') // ловим стартовый маршрут
  .get(async (req, res) => {
    if (req.query.err) {
      res.locals.err = "Не все поля заполнены"
    }
    res.locals.users = await User.findAll()
    res.render('account') // рендерим страницу личного кабинета для суперюзера
  })
  .post(async (req, res) => { // ловим введенные данные с формы (method='POST')
    const { Login, Password, FullName, Team_id, Role } = req.body; // вытаскиваем поля с формы
    if (Login && Password && FullName && Team_id && Role) { // если форма вся заполнена
      const pass = await bcrypt.hash(Password, 10) // хэшируем пароль
      const createUser = await User.create({ Login, FullName, Team_id, Role, Password: pass }, { returning: true, plain: true })
      return res.json(createUser)// добавляем в таблицу нового юзера с полями 
    } else {
      return res.redirect('/account/?err=field')
    } // пока происходит редирект, а нужен фетч без перезагрузки страницы и добавление созданного юзера в хбску ниже
  })

router.route('/files') 
.post ( async (req, res) => {
  // console.log('-----', req.file)
  // console.log(req.body)
  console.log('+====', req.session.user.id)
  const id = req.session.user.id;
  const createFile = await File.create({
    Title: req.file.filename,
    Path: req.file.path,
    User_id: id,
  })
  console.log(createFile)
  res.json(createFile)
})



module.exports = router
