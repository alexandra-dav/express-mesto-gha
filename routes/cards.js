/* eslint-disable no-undef */
const router = require('express').Router();
const {
  showAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', showAllCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
