export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  }

  // Функция, которая добавляет класс с ошибкой
  _showError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage; // Сообщение с ошибкой на переданный параметр
  };

  // Функция, которая удаляет класс с ошибкой
  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = ''; // Очистим ошибку
  };

  // Функция, которая проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideError(inputElement);
    }
  };


  // Функция hasInvalidInput обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
  // Функция принимает массив полей
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  disabledButton() {
    this._buttonElement.setAttribute('disabled', 'true');
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  enableButton() {
    this._buttonElement.removeAttribute('disabled', 'true');
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }


  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this.disabledButton();
    } else {
      // иначе сделай кнопку активной
      this.enableButton();
    }
  };

  // Вызовем функцию isValid на каждый ввод символа
  //formInput.addEventListener('input', isValid);
  //взамен ей напишем слушатель на каждое поле ввода

  _setEventListeners() {
    // Вызовите функцию toggleButtonState после определения константы buttonElement. Это проверит состояние кнопки при первой загрузке страницы. Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
    // this.toggleButtonState();

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        // Вызовите функцию toggleButtonState в теле обработчика события input. Передайте ей массив полей формы и элемент кнопки. Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
        this.toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

  resetValidation() {
    this._inputList.forEach(inputElement => this._hideError(inputElement));
    this.toggleButtonState();
  }

}