const Card = require('../models/cards');
const {
  errorMassage, statusCodeName,
} = require('../utils/constants');
const NotFoundError = require('../middlewares/not-found-err');
const NoValidationError = require('../middlewares/no-validation-err');
const ForbiddenError = require('../middlewares/forbidden-err');

module.exports.showAllCards = (req, res, next) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      throw new Error(errorMassage.CARD_ERROR_LIST);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).populate(['owner', 'likes'])
    .catch((err) => {
      if (err.name === statusCodeName.noValidID) {
        throw new NoValidationError(errorMassage.CARD_ID_NOT_FOUND);
      }
      throw new Error(errorMassage.CARD_ERROR_DELETE);
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMassage.CARD_NOT_FOUND);
      }
      if (req.user._id !== card.owner._id.toString()) {
        throw new ForbiddenError(errorMassage.CARD_ERROR_CREDENTINAL);
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardData) => res.send(cardData));
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => Card.findById(card._id).populate(['owner']))
    .then((fullCard) => res.status(statusCodeName.CREATED).send(fullCard))
    .catch(() => {
      throw new Error(errorMassage.CARD_ERROR_CREATE);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true, // обработчик then получит на вход обновлённую запись
    },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMassage.CARD_NOT_FOUND);
      }
      res.send(card);
    })
    .catch(next)
    .catch(() => {
      throw new Error(errorMassage.CARD_ERROR_LIKE);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true, // обработчик then получит на вход обновлённую запись
    },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(errorMassage.CARD_NOT_FOUND);
      }
      res.send(card);
    })
    .catch(next)
    .catch(() => {
      throw new Error(errorMassage.CARD_ERROR_DISLIKE);
    })
    .catch(next);
  /* .catch((err) => {
      if (err.name === errorCodName.noValidID) {
        nonexistentID(res);
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: `${errorMassage.CARD_ERROR_DISLIKE}` });
    }); */
};
