/* eslint-disable no-undef */
const Card = require('../models/cards');
const { showUser } = require('./users');


module.exports.showAllCards = (req, res) => {
  Card.find({})
    .then(data => {
      const dataFormat = [];
      data.forEach(card => {
        const { likes, _id, name, link, owner, createdAt } = card;
        dataFormat.push({ likes, _id, name, link, owner, createdAt });
      });
      res.send(dataFormat);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении списка всех карточек' }));
};

module.exports.deleteCard = (req, res) => {
  if (req.params.cardId.length != 24) {
    res.status(400).send({ message: `Данные не валидны.`});
    return;
  }
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if(card === null){
        res.status(404).send({ message: `Карточка не найдена.`});
        return;
      }
      res.status(200).send({"message":"Пост удалён"});
    })
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

  Card.create({ name, link, owner: req.user})
    .then(card => {
      const { likes, _id, name, link, owner, createdAt } = card;
      res.status(200).send({ likes, _id, name, link, owner, createdAt });
    })
    .catch((err) => {
      if(err.name === 'ValidationError'){
        res.status(400).send({ message: `Данные пользователя не валидны.`});
        return;
      }
      res.status(500).send({ message: `Произошла ошибка при создании новой карточки ${err.name}` })
    });
};

module.exports.likeCard = (req, res) => {
  if (req.params.cardId.length != 24) {
    res.status(400).send({ message: `Данные не валидны.`});
    return;
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true, // обработчик then получит на вход обновлённую запись
    })
    .then(card => {
      if(card === null){
        res.status(404).send({ message: `Карточка не найдена.`});
        return;
      }
      const { likes, _id, name, link, owner, createdAt } = card;
      res.send({ likes, _id, name, link, owner, createdAt });
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка при добавлении отметки карточки лайком' })
  });
};

module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId.length != 24) {
    res.status(400).send({ message: `Данные не валидны.`});
    return;
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true, // обработчик then получит на вход обновлённую запись
    })
    .then(card => {
      if(card === null){
        res.status(404).send({ message: `Карточка не найдена.`});
        return;
      }
      const { likes, _id, name, link, owner, createdAt } = card;
      res.send({ likes, _id, name, link, owner, createdAt });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка при удалении отметки карточки лайком' })
  });
};