const cors = require('cors');
const Router = require('express');

const router = Router();

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', cors(), (req, res, next) => next(res.status(404).send({ message: 'Ошибка запроса: проверьте метод и эндпоинт.' })));

module.exports = router;
