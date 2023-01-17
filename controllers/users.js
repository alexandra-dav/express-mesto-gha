const bcrypt = require('bcryptjs');
// const validator = require('validator');
const jwt = require('jsonwebtoken');
const {
  errorCod, errorMassage,
  CREATED, ERROR_UNAUTHORIZED, ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER,
} = require('../utils/constants');
const User = require('../models/user');

function notFoundError(res) {
  res.status(ERROR_NOT_FOUND).send({ message: `${errorMassage.USER_NOT_FOUND}` });
}
function validationError(res) {
  res.status(ERROR_VALIDATION).send({ message: `${errorMassage.USER_NOT_VALID}` });
}
function nonexistentID(data) {
  data.status(ERROR_VALIDATION).send({ message: `${errorMassage.USER_ID_NOT_FOUND}` });
}

module.exports.showAllUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_LIST}`,
      });
    });
};

module.exports.createUser = (req, res) => {
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
        name, about, avatar, _id, email, password,
      } = user;
      res.status(CREATED).send({
        name,
        about,
        avatar,
        _id,
        email,
        password,
      });
    })
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        validationError(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_CREATE}`,
      });
    });
};

module.exports.showUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        notFoundError(res);
        return;
      }
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === errorCod.noValidID) {
        nonexistentID(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_INFO}`,
      });
    });
};

module.exports.updateUserData = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (user === null) {
        notFoundError(res);
        return;
      }
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        validationError(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_UPDATE_DATE}`,
      });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (user === null) {
        notFoundError(res);
        return;
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
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        validationError(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_UPDATE_AVATAR}`,
      });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return User.findUserByCredentials(email, password);
    })
    .then((userData) => {
      // аутентификация успешна
      const token = jwt.sign(
        { _id: userData._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );
      /*
      TODO:
      записывать JWT в httpOnly куку
      */
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(ERROR_UNAUTHORIZED)
        .send({ message: err.message });
    });
};

module.exports.showOwner = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        notFoundError(res);
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === errorCod.noValidID) {
        nonexistentID(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_INFO}`,
      });
    });
};
