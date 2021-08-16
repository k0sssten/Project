// require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const redis = require('redis');
// const session = require('express-session');
// let RedisStore = require('connect-redis')(session);
// let RedisClient = redis.createClient();


// routes
const indexRouter = require('./routes/index');
const ChartRouter = require('./routes/Chart');

const app = express();
const PORT = 3000;

app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// app.use(
//   session({
//     name: 'sId',
//     store: new RedisStore({client: RedisClient}),
//     saveUninitialized: false,
//     secret: 'abrakadabra',
//     resave: false,
//   })
// );


// app.use((req, res, next) => {
//   const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
//   next(error);
// });

// //HTTP запрос с ошибкой и отправляем на него ответ

// app.use(function(err, req, res, next) {
//   // Текущий режим приложения
//   const appMode = req.app.get('env');
//   // создаем объект в котором храним ошибку
//   let error;

//   // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В ином случае отправим пустой объект.
//   if (appMode === 'development') {
//     error = err;
//   } else {
//     error = {};
//   }
// // Записываем инфу об ошибке  и саму объект ошибки в спец переменные, доступные на на сервере глобально, но только в рамках одного запроса
//   res.locals.message = err.message;
//   res.locals.error = error;

//   // Задаём ответ об статусе ошибки. Берём его из объекта ошибки, если он существует. Если его нет записываем в статус ошибки 500 (универсальная вещь)
//   res.status(err.status || 500);
//   // Формируем HTML текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа
//   res.render('error');
// });
app.use('/', indexRouter);
app.use('/Chart', ChartRouter);
app.listen(PORT, () => {
  console.log(`Server started PORT: ${PORT}`)
});
