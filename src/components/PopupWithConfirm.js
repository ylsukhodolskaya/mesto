import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
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