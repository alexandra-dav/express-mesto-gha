// Тут описаны наименования основных ошибок
exports.errorCod = {
  noValidData: 'ValidationError',
  noValidID: 'CastError',
};
// Тут описаны коды ответов
exports.CREATED = 201;
exports.ERROR_UNAUTHORIZED = 401;
exports.ERROR_NOT_FOUND = 404;
exports.ERROR_VALIDATION = 400;
exports.ERROR_INTERNAL_SERVER = 500;
// Тут описаны тексты сообщений для клиента
exports.errorMassage = {
  USER_NOT_VALID: 'Данные пользователя не валидны.',
  USER_NOT_FOUND: 'Пользователь не найден.',
  USER_ID_NOT_FOUND: 'Невалидный ID пользователя.',
  USER_ERROR_LIST: 'Произошла ошибка при получении списка всех пользователей.',
  USER_ERROR_CREATE: 'Произошла ошибка при создании нового пользователя.',
  USER_ERROR_INFO: 'Произошла ошибка при получении данных пользователя.',
  USER_ERROR_UPDATE_DATE: 'Произошла ошибка при обновлении данных пользователя.',
  USER_ERROR_UPDATE_AVATAR: 'Произошла ошибка при обновлении аватара пользователя.',
  USER_ERROR_UNAUTHORIZED: 'Ошибка авторизации пользователя: проверьте логин и пароль.',
  CARD_NOT_VALID: 'Данные не валидны.',
  CARD_NOT_FOUND: 'Карточка не найдена.',
  CARD_ID_NOT_FOUND: 'Невалидный ID карточки.',
  CARD_ERROR_CREATE: 'Произошла ошибка при создании новой карточки.',
  CARD_ERROR_DELETE: 'Произошла ошибка при удалении карточки.',
  CARD_ERROR_LIST: 'Произошла ошибка при получении списка всех карточек',
  CARD_ERROR_LIKE: 'Произошла ошибка при добавлении отметки карточки лайком',
  CARD_ERROR_DISLIKE: 'Произошла ошибка при удалении отметки карточки лайком',
  PAGE_NOT_FOUND: 'Ошибка запроса: проверьте метод и эндпоинт.',
};
