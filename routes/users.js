const router = require('express').Router();
const {
  showAllUsers, showUser, showOwner, updateUserData, updateUserAvatar,
} = require('../controllers/users');

router.get('/', showAllUsers);
router.get('/:userId', showUser);
router.get('/me', showOwner);
router.patch('/me', updateUserData);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
