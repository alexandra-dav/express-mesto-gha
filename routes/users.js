const router = require('express').Router();
const {
  showAllUsers, createUser, showUser, showOwner, updateUserData, updateUserAvatar,
} = require('../controllers/users');

router.get('/', showAllUsers);
router.post('/', createUser);
router.get('/:userId', showUser);
router.get('/me', showOwner);
router.patch('/me', updateUserData);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
