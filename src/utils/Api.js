class Api {
  constructor(config) {
  // тело конструктора
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }
  
  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._getResponseData);
    /* Результат запроса: 
  [
    {
      "likes": [],
      "_id": "5d1f0611d321eb4bdcd707dd",
      "name": "Байкал",
      "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      "owner": {
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        "_id": "ef5f7423f7f5e22bef4ad607",
        "cohort": "local"
      },
      "createdAt": "2019-07-05T08:10:57.741Z"
    },
    {
      "likes": [],
      "_id": "5d1f064ed321eb4bdcd707de",
      "name": "Архыз",
      "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      "owner": {
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        "_id": "ef5f7423f7f5e22bef4ad607",
        "cohort": "local"
      },
      "createdAt": "2019-07-05T08:11:58.324Z"
    }
  ] */
  }

  // Добавление новой карточки
  postCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
    .then(this._getResponseData);
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  // поставить или удалить лайк
  changeLikeCardStatus (cardId, flag) {
    if(flag){
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._getResponseData);
    }
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData);

  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {       
    return fetch(`${this._url}/users/me`, {
        headers: this._headers
    })
    .then(this._getResponseData);
  
  /*  Результат запроса: 
  {
    "name": "Jacques Cousteau",
    "about": "Sailor, researcher",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
    "_id": "e20537ed11237f86bbb20ccb",
    "cohort": "cohort0"
  } 
  Свойство _id — это идентификатор пользователя
  */
  }

  // Редактирование профиля
  patchUserInfo(UserDataProfile) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: UserDataProfile.name,
        about: UserDataProfile.about
      })
    })
    .then(this._getResponseData);
  /* Если обновление прошло успешно, в теле ответа от сервера вы получите обновлённые данные пользователя:
  {
    "name": "Marie Skłodowska Curie",
    "about": "Physicist and Chemist",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
    "_id": "e20537ed11237f86bbb20ccb",
    "cohort": "cohort0",
  } */
  }

    // Обновление аватара пользователя
  patchUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._getResponseData);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '9b04affb-1b35-4c82-b9cf-6dde041a3e27',
    'Content-Type': 'application/json'
  }
});