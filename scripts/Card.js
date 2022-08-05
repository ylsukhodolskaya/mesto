export default class Card {
  constructor(config, name, link, { handlerClickImage }) {
    this._config = config;
    this._handlerClickImage = handlerClickImage;
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    return document
      .querySelector(this._config.templateSelector)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true);
  }

  getCardElement() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(this._config.titleSelector).textContent = this._name;
    this._image = this._cardElement.querySelector(this._config.imageSelector);
    this._image.src = this._link;
    this._image.alt = this._name;
    return this._cardElement;
  }

  // метод слушателя лайка
  _handleLikeCard() {
    this._cardElement.querySelector(this._config.buttonLikeSelector).classList.toggle(this._config.likeClass);
  }

  // метод слушателя кнопки удалить
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  

  //cлушатели
  _setEventListeners() {
    // кнопки like
    this._cardElement.querySelector(this._config.buttonLikeSelector).addEventListener('click', () => {
      this._handleLikeCard();
    });

    // кнопки delete
    this._cardElement.querySelector(this._config.buttonDeleteSelector).addEventListener('click', () => {
      this._handleDeleteCard();
    });

    // попапы с полноразмерными фотографиями
    this._cardElement.querySelector(this._config.imageSelector).addEventListener('click', () => {
      this._handlerClickImage()
    });
  }


}