const jwt = require('jsonwebtoken');
const { ERROR_UNAUTHORIZED } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация!' });
  }

  // извлечём токен
  const token = authorization;
  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
