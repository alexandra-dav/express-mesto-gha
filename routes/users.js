const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  showAllUsers, showOwner, updateUserData, updateUserAvatar,
} = require('../controllers/users');

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
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

module.exports = router;
