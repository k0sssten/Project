require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let RedisClient = redis.createClient();


// routes

const indexRouter = require('./routes/index');
const startRouter = require('./routes/startpage');
const accRouter = require('./routes/account');
const standartRouter = require('./routes/standart');
const editRouter = require('./routes/edit');
const usercardRouter = require('./routes/usercard');
const filescardRouter = require('./routes/filescard');
const usersfilesRouter = require('./routes/usersfiles')
const authCheck = require('./middleware/authCheck');
const chartRouter = require('./routes/chart')

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

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

app.use(multer({storage:storageConfig}).single("myFile"))

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    name: 'sId',
    store: new RedisStore({client: RedisClient}),
    saveUninitialized: false,
    secret: 'abrakadabra',
    resave: false,
  })
);
app.use(authCheck);

app.use('/', indexRouter);
app.use('/startpage', startRouter);
app.use('/account', accRouter);
//app.use('/useraccount', userAccount);
app.use('/standart', standartRouter);
app.use('/edit', editRouter);
app.use('/usercard', usercardRouter);
app.use('/filescard', filescardRouter);
app.use('/usersfiles', usersfilesRouter);
app.use('/chart', chartRouter);


app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

//HTTP запрос с ошибкой и отправляем на него ответ

app.use(function (err, req, res, next) {
  // Текущий режим приложения
  const appMode = req.app.get('env');
  // создаем объект в котором храним ошибку
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В ином случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }
  // Записываем инфу об ошибке  и саму объект ошибки в спец переменные, доступные на на сервере глобально, но только в рамках одного запроса
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём ответ об статусе ошибки. Берём его из объекта ошибки, если он существует. Если его нет записываем в статус ошибки 500 (универсальная вещь)
  res.status(err.status || 500);
  // Формируем HTML текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server started PORT: ${PORT}`)
});
