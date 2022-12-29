/* eslint-disable no-undef */
const router = require('express').Router();
const {
  showAllUsers, createUser, showUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');

router.get('/', showAllUsers);
router.post('/', createUser);
router.get('/:userId', showUser);
router.patch('/me', updateUserData);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
