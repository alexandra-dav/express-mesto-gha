const {
  errorCod, errorMassage, ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER,
} = require('../utils/constants');
const User = require('../models/user');

function notFoundError(res) {
  res.status(ERROR_NOT_FOUND).send({ message: `${errorMassage.USER_NOT_FOUND}` });
}
function ValidationError(res) {
  res.status(ERROR_VALIDATION).send({ message: `${errorMassage.USER_NOT_VALID}` });
}
function nonexistentID(data) {
  data.status(ERROR_VALIDATION).send({ message: `${errorMassage.USER_ID_NOT_FOUND}` });
}

module.exports.showAllUsers = (req, res) => {
  User.find({})
    .then((data) => {
      /* const arr = data.map((user) => {
        const {
          name, about, avatar, _id,
        } = user;

        return {
          name, about, avatar, _id,
        };
      }); */
      res.send(data); // нужно ли исключить поле __v?
    })
    .catch(() => {
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_LIST}`,
      });
    });
};

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      res.status(201).send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        ValidationError(res);
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
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        ValidationError(res);
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
        ValidationError(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({
        message: `${errorMassage.USER_ERROR_UPDATE_AVATAR}`,
      });
    });
};
