const Router = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const authorization = require('../middlewares/auth');
const {
  errorMassage, statusCodeName,
} = require('../utils/constants');
const {
  login, createUser,
} = require('../controllers/users');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../middlewares/not-found-err');

const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9._]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=[\]]*)#?$/m;
// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://http://your.best.mesto.nomoredomainsclub.ru/',
  'http://http://your.best.mesto.nomoredomainsclub.ru/',
  'localhost:3000',
];

const router = Router();

router.use(requestLogger); // подключаем логгер запросов

router.use(cors());
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(pattern)),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  }),
}), createUser);

// защищаем роуты
router.use('/users', authorization, require('./users'));
router.use('/cards', authorization, require('./cards'));

router.use('*', (req, res, next) => (next(new NotFoundError(errorMassage.PAGE_NOT_FOUND))));

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

router.use((err, req, res, next) => {
  const { statusCode = statusCodeName.ERROR_INTERNAL_SERVER, message } = err;
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.status(statusCode).send({ message });
  next();
});

module.exports = router;
