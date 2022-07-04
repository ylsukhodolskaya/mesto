const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция, которая добавляет класс с ошибкой
const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
  console.log(errorElement);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage; // Сообщение с ошибкой на переданный параметр
};

// Функция, которая удаляет класс с ошибкой
const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = ''; // Очистим ошибку
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // Если проходит, скроем
    hideError(formElement, inputElement, config);
  }
};


// Функция hasInvalidInput обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

const disabledButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

const enableButton = (buttonElement, config) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}


// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disabledButton(buttonElement, config);
  } else {
    // иначе сделай кнопку активной
    enableButton(buttonElement, config);
  }
};

// Вызовем функцию isValid на каждый ввод символа
//formInput.addEventListener('input', isValid);
//взамен ей напишем слушатель на каждое поле ввода

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // Вызовите функцию toggleButtonState после определения константы buttonElement. Это проверит состояние кнопки при первой загрузке страницы. Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement, config);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      // Вызовите функцию toggleButtonState в теле обработчика события input. Передайте ей массив полей формы и элемент кнопки. Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, config);
  });
};



enableValidation(config);