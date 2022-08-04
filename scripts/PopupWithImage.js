import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._description = this._popup.querySelector('.popup__picture-title');
    this._image = this._popup.querySelector('.popup__picture');
  }

  open( item ) {
    this._image.src = item.link;
    this._image.alt = item.name;
    this._description.textContent = item.name;
    super.open();
  }
}