const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  showAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9._]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=[\]]*)#?$/m;

router.get('/', showAllCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(24).required(),
    link: Joi.string().pattern(new RegExp(pattern)),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
