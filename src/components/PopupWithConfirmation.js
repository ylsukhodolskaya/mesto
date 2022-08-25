import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popupForm = this._popupSelector.querySelector('.popup__form-delete');
    this._confirmAction = () => {}
  }



  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._confirmAction();
    });
  }

  setConfirmAction(action) {
    this._confirmAction = action;
  }

}