const Card = require('../models/cards');
const {
  errorCod, errorMassage, ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

function ValidationError(data) {
  data.status(ERROR_VALIDATION).send({ message: `${errorMassage.CARD_NOT_VALID}` });
}
function notFoundError(data) {
  data.status(ERROR_NOT_FOUND).send({ message: `${errorMassage.CARD_NOT_FOUND}` });
}
function nonexistentID(data) {
  data.status(ERROR_VALIDATION).send({ message: `${errorMassage.CARD_ID_NOT_FOUND}` });
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
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_LIST}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        notFoundError(res);
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === errorCod.noValidID) {
        nonexistentID(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_DELETE}` });
    });
};

module.exports.createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => Card.findById(card._id).populate(['owner']))
    .then((fullCard) => res.status(201).send(fullCard))
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        ValidationError(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_CREATE}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true, // обработчик then получит на вход обновлённую запись
    },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        notFoundError(res);
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        ValidationError(res);
        return;
      }
      if (err.name === errorCod.noValidID) {
        nonexistentID(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_LIKE}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true, // обработчик then получит на вход обновлённую запись
    },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        notFoundError(res);
        return;
      }
      /* const {
        likes, _id, name, link, owner, createdAt,
      } = card;
      res.send({
        likes, _id, name, link, owner, createdAt,
      }); */
      res.send(card);
    })
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        ValidationError(res);
        return;
      }
      if (err.name === errorCod.noValidID) {
        nonexistentID(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_DISLIKE}` });
    });
};
