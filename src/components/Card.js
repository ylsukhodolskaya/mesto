export default class Card {
  constructor(config, data, isDelete, handler) {
    this._config = config;
    this._onClickImageHandler = handler.onClick;
    this._onLikeHandler = handler.onLike;
    this._onDeleteHandler = handler.onDelete;
    this._data = data;
    this._isDelete = isDelete;
        // console.log('/////isDelete////', isDelete);


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

    this._deleteBtn = this._cardElement.querySelector(this._config.buttonDeleteSelector);
    this._isOwnerCard();
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

  // //метод isOwner я или не я
  // проверить владельца карточки и убирать кнопку Delete
  _isOwnerCard() {
    if (!this._isDelete) {
      this._deleteBtn.remove();
    }
  }

  //метод isLiked проверяет наличие лайка
  isLiked() {
    return this._data.likes.some((item) => {
      return item._id === this._data.currentUser._id
    })
  }

  // метод слушателя лайка
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
    this._deleteBtn.addEventListener('click', () => {
      this._onDeleteHandler(this._data, () => {
        this._handleDeleteCard();
      });
    });

    // попапы с полноразмерными фотографиями
    this._cardElement.querySelector(this._config.imageSelector).addEventListener('click', () => {
      this._onClickImageHandler()
    });
  }


}