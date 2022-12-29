/* eslint-disable no-undef */
const Card = require('../models/cards');

module.exports.showAllCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении списка всех карточек' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send(card))
    .catch((err) =>{
    if(err.name === 'Error 404' || err.name === 'CastError'){
      res.status(404).send({ message: `Карточка для удаления не найдена.`});
      return;
    }
    res.status(500).send({ message: `Произошла ошибка при удалении карточки ${err.name}` })
  });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create(
    {
      name,
      link
    },
    {
      new: true,
      runValidators: true
    })
    .then(card => res.send(card))
    .catch((err) => {
      if(err.name === 'ValidationError'){
        res.status(400).send({ message: `Данные пользователя не валидны.`});
        return;
      }
      res.status(500).send({ message: `Произошла ошибка при создании новой карточки ${err.name}` })
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true, // обработчик then получит на вход обновлённую запись
    })
    .then(card => res.send(card))
    .catch((err) => {
      if(err.name === 'Error 404' || err.name === 'CastError'){
        res.status(404).send({ message: `Карточка не найдена.`});
        return;
      }
      if(err.name === 'ValidationError'){
        res.status(400).send({ message: `Данные пользователя не валидны.`});
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка при добавлении отметки карточки лайком' })
  });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true, // обработчик then получит на вход обновлённую запись
    })
    .then(card => res.send(card))
    .catch((err) => {
      if(err.name === 'Error 404' || err.name === 'CastError'){
        res.status(404).send({ message: `Карточка не найдена.`});
        return;
      }
      if(err.name === 'ValidationError'){
        res.status(400).send({ message: `Данные пользователя не валидны.`});
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка при удалении отметки карточки лайком' })
  });
};