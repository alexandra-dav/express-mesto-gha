const Router = require('express');
const cors = require('cors');
const {
  errorMassage, ERROR_NOT_FOUND,
} = require('../utils/constants');

const router = Router();

router.use(cors());
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res) => (res.status(ERROR_NOT_FOUND).send({ message: errorMassage.PAGE_NOT_FOUND })));

module.exports = router;
