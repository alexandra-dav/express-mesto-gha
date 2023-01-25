const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const {
  errorCodName, statusCodeName, errorMassage,
} = require('../utils/constants');
const User = require('../models/user');
const NotFoundError = require('../middlewares/not-found-err');
const ConflictError = require('../middlewares/conflict-err');
const NoValidationError = require('../middlewares/no-validation-err');
const UnauthorizedError = require('../middlewares/unauthorized-err');

module.exports.showAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      throw new Error(errorMassage.USER_ERROR_LIST);
    })
    .catch(next);
};

module.exports.showOwner = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(errorMassage.USER_NOT_FOUND);
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === errorCodName.noValidID) {
        throw new NoValidationError(errorMassage.USER_NOT_VALID);
      }
      throw new Error(errorMassage.USER_ERROR_INFO);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  /* Метод принимает на вход два параметра:
  пароль и длину так называемой «соли» —
  случайной строки, которую метод добавит
  к паролю перед хешированем. */
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      ...req.body,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      const {
        name, about, avatar, _id, email,
      } = user;
      res.status(statusCodeName.CREATED).send({
        name,
        about,
        avatar,
        _id,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError(errorMassage.USER_ERROR_CONFLICT);
      }
      if (err.name === errorCodName.noValidData) {
        throw new NoValidationError(errorMassage.USER_NOT_VALID);
      }
      throw new Error(errorMassage.USER_ERROR_CREATE);
    })
    .catch(next);
};

module.exports.updateUserData = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMassage.USER_NOT_FOUND);
      }
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch(next)
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError(errorMassage.USER_ERROR_CONFLICT);
      }
      if (err.name === errorCodName.noValidData) {
        throw new NoValidationError(errorMassage.USER_NOT_VALID);
      }
      throw new Error(errorMassage.USER_ERROR_CREATE);
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMassage.USER_NOT_FOUND);
      }
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch(next)
    .catch((err) => {
      if (err.name === errorCodName.noValidData) {
        throw new NoValidationError(errorMassage.USER_NOT_VALID);
      }
      throw new Error(errorMassage.USER_ERROR_UPDATE_AVATAR);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errorMassage.USER_ERROR_UNAUTHORIZED));
      }
      return User.findUserByCredentials(email, password);
    })
    .then((userData) => {
      // аутентификация успешна
      try {
        const token = jwt.sign(
          { _id: userData._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        );
        /*
        TODO:
        записывать JWT в httpOnly куку
        */
        res.send({ token });
      } catch (e) {
        throw new UnauthorizedError(errorMassage.USER_ERROR_MUST_AUTHORIZED);
      }
    })
    .catch(next);
};
