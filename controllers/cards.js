const Card = require('../models/cards');

function ValidationError(data) {
  data.status(400).send({ message: 'Данные не валидны.' });
}
function notFoundError(data) {
  data.status(404).send({ message: 'Карточка не найдена.' });
}
function nonexistentID(data) {
  data.status(404).send({ message: 'Невалидный ID карточки.' });
}

module.exports.showAllCards = (req, res) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((data) => {
      /* const dataFormat = [];
      data.forEach((card) => {
        const {
          likes, _id, name, link, owner, createdAt,
        } = card;
        dataFormat.push({
          likes, _id, name, link, owner, createdAt,
        });
      }); */
      res.send(data);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении списка всех карточек' }));
};

module.exports.deleteCard = (req, res, err) => {
  if (req.params.cardId.length !== 24 || req.params.cardId === null) {
    res.status(400).send({ message: 'Данные не валидны.' });
    return;
  }
  if (err.name === 'CastError') {
    nonexistentID(res);
    return;
  }
  Card.findByIdAndRemove(req.params.cardId).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        notFoundError(res);
        return;
      }
      res.status(200).send(card);
    })
    .catch(() => {
      res.status(500).send({ message: `Произошла ошибка при удалении карточки ${err.name}` });
    });
};

module.exports.createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => Card.findById(card._id).populate(['owner']))
    .then((fullCard) => res.status(201).send(fullCard))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании новой карточки.' }));
};

module.exports.likeCard = (req, res) => {
  if (req.params.cardId.length !== 24 || req.params.cardId === null) {
    ValidationError(res);
    return;
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true, // обработчик then получит на вход обновлённую запись
    },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена.' });
        return;
      }
      res.send(card);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка при добавлении отметки карточки лайком' });
    });
};

module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId.length !== 24 || req.params.cardId === null) {
    ValidationError(res);
    return;
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true, // обработчик then получит на вход обновлённую запись
    },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена.' });
        return;
      }
      const {
        likes, _id, name, link, owner, createdAt,
      } = card;
      res.send({
        likes, _id, name, link, owner, createdAt,
      });
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка при удалении отметки карточки лайком' });
    });
};
