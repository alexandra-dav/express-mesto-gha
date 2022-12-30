const User = require('../models/user');

function notFoundError(res) {
  res.status(404).send({ message: 'Пользователь не найден.' });
}
function ValidationError(res) {
  res.status(400).send({ message: 'Данные пользователя не валидны.' });
}

module.exports.showAllUsers = (req, res) => {
  User.find({})
    .then((data) => {
      const dataFormat = [];
      data.forEach((user) => {
        const {
          name, about, avatar, _id,
        } = user;
        dataFormat.push({
          name, about, avatar, _id,
        });
      });
      res.send(dataFormat);
    })
    .catch((err) => {
      if (err.name === 'Error 404' || err.name === 'CastError') {
        notFoundError(res);
        return;
      }
      res
        .status(500)
        .send({
          message: 'Произошла ошибка при получении списка всех пользователей.',
        });
    });
};

module.exports.createUser = (req, res) => {
  /* const { name, about, avatar } = req.body; */
  User.create({ ...req.body })
    .then((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        ValidationError(res);
        return;
      }
      res
        .status(500)
        .send({
          message: 'Произошла ошибка при создании нового пользователя.',
        });
    });
};

module.exports.showUser = (req, res) => {
  if (req.params.userId.length !== 24) {
    ValidationError(res);
  } else {
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
      .catch(() => {
        res.status(500).send({ message: 'Произошла ошибка при получении данных пользователя.' });
      });
  }
};

module.exports.updateUserData = (req, res) => {
  /* const { name, about } = req.body; */
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
      if (err.name === 'ValidationError') {
        ValidationError(res);
        return;
      }
      if (err.name === 'Error 404' || err.name === 'CastError') {
        notFoundError(res);
        return;
      }
      res
        .status(500)
        .send({
          message: `Произошла ошибка при обновлении данных пользователя. ${err.name}`,
        });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  /* const { avatar } = req.body; */
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
      if (err.name === 'ValidationError') {
        ValidationError(res);
        return;
      }
      if (err.name === 'Error 404' || err.name === 'CastError') {
        notFoundError(res);
        return;
      }
      res
        .status(500)
        .send({
          message: 'Произошла ошибка при обновлении аватара пользователя.',
        });
    });
};
