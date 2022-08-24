import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {
    handleFormSubmit
  }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._saveButton = this._popupForm.querySelector('.popup__save-button');
    this._saveButtonText = this._saveButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  //=============================================



  loading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...'
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }
}