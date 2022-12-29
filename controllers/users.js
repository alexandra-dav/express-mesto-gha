/* eslint-disable no-undef */
const User = require('../models/user');

function notFoundError(res) {
  res.status(404).send({ message: `Пользователь не найден.`});
}
function ValidationError(res){
  res.status(400).send({ message: `Данные пользователя не валидны.`});
}

module.exports.showAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send(user))
    .catch((err) => {
      if(err.name === 'Error 404' || err.name === 'CastError'){
        notFoundError(res);
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка при получении списка всех пользователей.' })
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch((err) => {
      if(err.name === 'ValidationError'){
        ValidationError(res);
        return;
      }
      res.status(500).send({ message: `Произошла ошибка при создании нового пользователя.`});
    });
};

module.exports.showUser =  (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch((err) => {
      if(err.name === 'Error 404' || err.name === 'CastError'){
        notFoundError(res);
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка при получении данных пользователя.' })
  });
};

module.exports.updateUserData =  (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send(user))
    .catch((err) => {
      if(err.name === 'ValidationError'){
        ValidationError(res);
        return;
      }
      if(err.name === 'Error 404' || err.name === 'CastError'){
        notFoundError(res);
        return;
      }
      res.status(500).send({ message: `Произошла ошибка при обновлении данных пользователя. ${err.name}` })
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send(user))
    .catch((err) => {
      if(err.name === 'ValidationError'){
        ValidationError(res);
        return;
      }
      if(err.name === 'Error 404' || err.name === 'CastError'){
        notFoundError(res);
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка при обновлении аватара пользователя.' })
  });
};