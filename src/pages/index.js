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
  avatar,
  buttonAvatar,
  popupEditAvatar,
  formEditAvatar
} from '../utils/constants.js';

import {
  configApi
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';

import Card from '../components/Card.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api.js';


const api = new Api(configApi);

// api.getInitialCards()
//   .then((items) => {
//     cardsList.renderItems(items);
//     console.log('items', items)
//   })
//   .catch(err => console.log('Ошибка:', err))


// api.getUserInfo().then((result) => {
//     console.log('api.getUserInfo result', result)
//   })
//   .catch(err => console.log('Ошибка:', err))


let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

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
    // items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item.name, item.link));
    },
  },
  cardsContainer
);

// // загрузка карточек на страницу
// cardsList.renderItems();


// форма добавления карточки
const addCardPopup = new PopupWithForm(
  popupAddCard, {
    handleFormSubmit: () => {
      cardsList.addItem(createCard(titleInput.value, linkInput.value));
      addCardPopup.close();
      formAddCardValidator.resetValidation();
    },
  });
// слушатели для формы добавления карточки
addCardPopup.setEventListeners();

buttonAddCardItem.addEventListener("click", () => {
  addCardPopup.open();
  formAddCardValidator.resetValidation();
});









//===================================

const userInfo = new UserInfo({
  username: profileName,
  about: profileDescription,
  avatar: avatar
});

// создание попапа с формой редактирования профиля
function fillEditProfileForm({
  username,
  about
}) {
  nameInput.value = username;
  descriptionInput.value = about;
}

const editProfilePopup = new PopupWithForm(
  popupEditProfile, {
    handleFormSubmit: (dataForm) => {
      api.editUserInfo(dataForm)
        .then((data) => {
          console.log('data', data);
          userInfo.setUserInfo(data);
          editProfilePopup.close();
        })
    },
  });


editProfilePopup.setEventListeners();
// Обработчик кнопки Edit попапа редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  fillEditProfileForm(info);
  editProfilePopup.open();
  formEditProfileValidator.resetValidation();
});


//добавление карточек по аналогии с редактированием профиля
// редактировать аватар по аналогии с редактированием профиля
//лайки просмотреть тред в слэке
//удаление по аналогии с лайками