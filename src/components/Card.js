export default class Card {
  constructor(config, data, handler) {
    this._config = config;
    this._onClickImageHandler = handler.onClick;
    this._onLikeHandler = handler.onLike;
    this._data = data;

    //===============
    
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(this._config.titleSelector).textContent = this._data.name;
    this._image = this._cardElement.querySelector(this._config.imageSelector);
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    const classNameLiked = this._config.likeClass;
    if (this.isLiked()) {
      this._cardElement.querySelector(this._config.buttonLikeSelector).classList.add(classNameLiked);
    } else {
      this._cardElement.querySelector(this._config.buttonLikeSelector).classList.remove(classNameLiked);
    };
    this._cardElement.querySelector(this._config.likeCounter).textContent = this._data.likes.length;
    this._setEventListeners();
  }

  _getTemplate() {
    return document
      .querySelector(this._config.templateSelector)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true);
  }

  getCardElement() {
    return this._cardElement;
  }

  //метод isOwner я или не я


  //метод isLiked проверяет наличие лайка
  isLiked() {
    return this._data.likes.some((item) => {
      return item._id === this._data.currentUser._id
    })
  }

  _handleLikeCard() {
    // вызов колбека, который пришёл снаружи
    this._onLikeHandler(
      this._data,
      // колбек внутри колбека, этот код вызовется в index.js
      (updatedLikes) => {
        this._data.likes = updatedLikes;
        const classNameLiked = this._config.likeClass;
        if (this.isLiked()) {
          this._cardElement.querySelector(this._config.buttonLikeSelector).classList.add(classNameLiked);
        } else {
          this._cardElement.querySelector(this._config.buttonLikeSelector).classList.remove(classNameLiked);
        }
        this._cardElement.querySelector(this._config.likeCounter).textContent = this._data.likes.length;
    });
  }

  // // метод слушателя лайка
  // _handleLikeCard() {
  //   this._cardElement.querySelector(this._config.buttonLikeSelector).classList.toggle(this._config.likeClass);
  // }

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
      this._onClickImageHandler()
    });
  }


}