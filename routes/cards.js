/* eslint-disable no-undef */

const router = require('express').Router();
const Card = require('../models/cards');

router.get('/', (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении списка всех карточек' }));
});

router.delete('/:cardId', (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при удалении карточки' }));
});

router.post('/', (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании новой карточки' }));
});

module.exports = router;