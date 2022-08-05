import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._description = this._popup.querySelector('.popup__picture-title');
    this._image = this._popup.querySelector('.popup__picture');
  }

  open( name, link ) {
    this._image.src = link;
    this._image.alt = name;
    this._description.textContent = name;
    super.open();
  }
}