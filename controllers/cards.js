const Card = require('../models/cards');
const {
  errorCod, errorMassage, CREATED, ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

function validationError(data) {
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
      res.send(data);
    })
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_LIST}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        notFoundError(res);
        return;
      }
      if (req.user._id !== card.owner._id.toString()) {
        res.status(400).send({ message: 'Вы не можете удалить эту карточку!' });
        return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardData) => res.send(cardData));
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
    .then((fullCard) => res.status(CREATED).send(fullCard))
    .catch((err) => {
      if (err.name === errorCod.noValidData) {
        validationError(res);
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
      res.send(card);
    })
    .catch((err) => {
      if (err.name === errorCod.noValidID) {
        nonexistentID(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_DISLIKE}` });
    });
};
