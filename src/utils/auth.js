export const BASE_URL = "https://auth.nomoreparties.co";

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Регистрация
export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
    .then((res) => getResponseData(res));
};

// Авторизация в сервисе 
export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
/*     .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      }
    }) */
    .then((res) => getResponseData(res));
};

// Получение e-mail авторизованного пользователя
export const userEmail = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    })
      .then((res) => getResponseData(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
}
