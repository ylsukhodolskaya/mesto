import './index.css'

import Mestologo from '../images/Mesto__logo.svg'

import Avatar from '../images/Photo-content/Avatar.jpg'

import {
  configForm,
  configCard,
  initialCards,
  cardsContainer,
  buttonAddCardItem,
  popupAddCard,
  formAddCard,
  titleInput,
  linkInput,
  buttonEditProfile,
  popupEditProfile,
  formEditProfile,
  profileName,
  profileDescription,
  nameInput,
  descriptionInput,
  popupImage,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';

import Card from '../components/Card.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';


const formEditProfileValidator = new FormValidator(configForm, formEditProfile);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(configForm, formAddCard);
formAddCardValidator.enableValidation();
const viewImagePopup = new PopupWithImage(popupImage);
viewImagePopup.setEventListeners();

//создание новой карточки
function createCard(name, link) {
  const card = new Card(configCard, name, link, {
    handlerClickImage: () => {
      viewImagePopup.open(name, link)
    }
  });

  const cardElement = card.getCardElement()
  return cardElement;
}


// отрисовка карточек из массива
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item.name, item.link));
    },
  },
  cardsContainer
);

// загрузка карточек на страницу
cardsList.renderItems();


// форма добавления карточки
const addCardForm = new PopupWithForm(
  popupAddCard, {
    handleFormSubmit: () => {
      cardsList.addItem(createCard(titleInput.value, linkInput.value));
      addCardForm.close();
      formAddCardValidator.resetValidation();
    },
  });
// слушатели для формы добавления карточки
addCardForm.setEventListeners();

buttonAddCardItem.addEventListener("click", () => {
  addCardForm.open();
  formAddCardValidator.resetValidation();
});

const userInfo = new UserInfo({
  username: profileName,
  description: profileDescription,
});

// создание попапа с формой редактирования профиля
function fillEditProfileForm({
  username,
  description
}) {
  nameInput.value = username;
  descriptionInput.value = description;
}

const editProfilePopup = new PopupWithForm(
  popupEditProfile, {
    handleFormSubmit: (dataForm) => {
      userInfo.setUserInfo(dataForm);
      editProfilePopup.close();
    },
  });
editProfilePopup.setEventListeners();
// Обработчик кнопки Edit попапа редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  fillEditProfileForm({
    username: info.username,
    description: info.description,
  });
  editProfilePopup.open();
  formEditProfileValidator.resetValidation();
});