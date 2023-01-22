const jwt = require('jsonwebtoken');
const { errorMassage } = require('../utils/constants');
const UnauthorizedError = require('./unauthorized-err');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization) {
    throw new UnauthorizedError(errorMassage.USER_ERROR_MUST_AUTHORIZED);
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
    throw new UnauthorizedError(errorMassage.USER_ERROR_MUST_AUTHORIZED);
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
