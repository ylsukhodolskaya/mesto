export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }


  //===========================================

// Получение информации о пользователе
getUserInfo() {
  return fetch(`${this._url}/users/me`, {
    headers: this._headers
  }).then(res => this._parseResponse(res));
}
// Редактирование информации о пользователе
editUserInfo(data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  }).then(res => this._parseResponse(res));
}

//============================================





// Получение карточек
getInitialCards() {
  return fetch(`${this._url}/cards`, {
    headers: this._headers
  }).then(res => this._parseResponse(res));
}
// Добавление новой карточки через попап
addCard(data) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  }).then(res => this._parseResponse(res));
}

}