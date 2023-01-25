const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  showAllUsers, showOwner, updateUserData, updateUserAvatar,
} = require('../controllers/users');

const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9._]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=[\]]*)#?$/m;

router.get('/', showAllUsers);
router.get('/me', showOwner);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserData);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(pattern)).required(),
  }),
}), updateUserAvatar);

module.exports = router;
