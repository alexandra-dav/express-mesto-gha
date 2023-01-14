const Router = require('express');
const cors = require('cors');
const authorization = require('../middlewares/auth');
const {
  errorMassage, ERROR_NOT_FOUND,
} = require('../utils/constants');
const {
  login, createUser,
} = require('../controllers/users');

const router = Router();

router.use(cors());
router.post('/signin', login);
router.post('/signup', createUser);

// защищаем роуты
router.use('/users', authorization, require('./users'));
router.use('/cards', authorization, require('./cards'));

router.use('*', (req, res) => (res.status(ERROR_NOT_FOUND).send({ message: errorMassage.PAGE_NOT_FOUND })));

module.exports = router;
