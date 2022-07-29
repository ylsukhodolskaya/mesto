export class Card {
  constructor(config, item, handlerClickImage) {
    this._config = config;
    this._handlerClickImage = handlerClickImage;
    this._item = item;
    this._cardElement = this._getTemplate();
    this._buttonsLike = this._cardElement.querySelector(config.buttonLikeSelector);
    this._buttonsDelete = this._cardElement.querySelector(config.buttonDeleteSelector);
    this._elementImage = this._cardElement.querySelector(config.imageSelector);
    this._cardElement.querySelector(config.titleSelector).textContent = item.name;
    this._elementImage.src = item.link;
    this._elementImage.alt = item.name;
  }

  _getTemplate() {
    return document
      .querySelector(this._config.templateSelector)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true);
  }

  getCardElement() {
    this._setEventListeners();
    return this._cardElement;
  }

  // метод слушателя лайка
  _handleLikeCard() {
    this._buttonsLike.classList.toggle(this._config.likeClass);
  }

  // метод слушателя кнопки удалить
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null; // При удалении экземпляра класса его дополнительно после удаления  нужно занулять. Метод remove удаляет только разметку из html, но объект карточки остается в памяти приложения и потребляет ресурсы.
  }

  //cлушатели
  _setEventListeners() {
    // кнопки like
    this._buttonsLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    // кнопки delete
    this._buttonsDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    // попапы с полноразмерными фотографиями
    this._elementImage.addEventListener('click', () => this._handlerClickImage(this._item));
  }

}