// Тут описаны наименования основных ошибок
exports.errorCod = {
  noValidData: 'ValidationError',
  noValidID: 'CastError',
};
// Тут описаны коды ответов
exports.ERROR_NOT_FOUND = 404;
exports.ERROR_VALIDATION = 400;
exports.ERROR_INTERNAL_SERVER = 500;
// Тут описаны тексты сообщений для клиента
exports.errorMassage = {
  userNotValid: 'Данные пользователя не валидны.',
  notFoundUser: 'Пользователь не найден.',
  notFoundUserID: 'Невалидный ID пользователя.',
  errorShowAllUsers: 'Произошла ошибка при получении списка всех пользователей.',
  errorCreateUser: 'Произошла ошибка при создании нового пользователя.',
  errorShowUser: 'Произошла ошибка при получении данных пользователя.',
  errorUpdateUserData: 'Произошла ошибка при обновлении данных пользователя.',
  errorUpdateUserAvatar: 'Произошла ошибка при обновлении аватара пользователя.',
  cardNotValid: 'Данные не валидны.',
  notFoundCard: 'Карточка не найдена.',
  notFoundCardID: 'Невалидный ID карточки.',
  errorCardCreate: 'Произошла ошибка при создании новой карточки.',
  errorCardDelete: 'Произошла ошибка при удалении карточки.',
  errorShowAllCards: 'Произошла ошибка при получении списка всех карточек',
  errorLikeCard: 'Произошла ошибка при добавлении отметки карточки лайком',
  errorDeleteLikeCard: 'Произошла ошибка при удалении отметки карточки лайком',
};
