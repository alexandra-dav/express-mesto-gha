const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  showAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
// pattern(/^https?:\/\/[www.]?[a-zA-Z0-9._-~:/?#[]@!\$&'\(\)\*\+,;=]{}#?/)
router.get('/', showAllCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(24).required(),
    link: Joi.string().required(),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
