const Router = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const authorization = require('../middlewares/auth');
const {
  errorMassage, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER,
} = require('../utils/constants');
const {
  login, createUser,
} = require('../controllers/users');

const router = Router();
// const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

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
    avatar: Joi.string().pattern(/^https?:\/\/[www.]?[a-zA-Z0-9._-~:/?#[]@!\$&'()\*\+,;=]+#?/),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  }),
}), createUser);

// защищаем роуты
router.use('/users', authorization, require('./users'));
router.use('/cards', authorization, require('./cards'));

router.use('*', (req, res) => (res.status(ERROR_NOT_FOUND).send({ message: errorMassage.PAGE_NOT_FOUND })));

router.use(errors()); // обработчик ошибок celebrate

router.use((err, req, res, next) => {
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err;
  console.log(err.statusCode, message);
  /* TODO обрабатывать ошибки errors() кастомно
  if (res.message === 'Validation failed') {
    res.status(400).send({ message: errorMassage.CARD_ID_NOT_FOUND });
  } */
  res.status(statusCode).send({ message });
  next();
});

module.exports = router;
