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

//============================================
// let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    console.log('//////initialCards////////', initialCards);
    console.log('//////userData////////', userData);
    userInfo.setUserInfo(userData);
    // userId = userData._id;
    userInfo.setAvatar(userData);
    cardsList.renderItems(initialCards.slice().reverse());
  })
  .catch((err) => {
    console.error(err);
    console.log(`Ошибка: ${err}`);
  });
//=====================================================
const formEditProfileValidator = new FormValidator(configForm, formEditProfile);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(configForm, formAddCard);
formAddCardValidator.enableValidation();
const viewImagePopup = new PopupWithImage(popupImage);
viewImagePopup.setEventListeners();
const formEditAvatarValidator = new FormValidator(configForm, formEditAvatar);
formEditAvatarValidator.enableValidation();



//===============================================
//создание новой карточки
function createCard(data) {
  data.currentUser = userInfo.getUserInfo();
  const card = new Card(configCard, data, {
    onClick: () => {
      viewImagePopup.open(data)
    },


    onLike: (currentCardData, likeCallback) => {
      if (card.isLiked()) {
        api.deleteLike(currentCardData._id)
          // как раз вызов той функции из класса, которая меняет html
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.error(err);
            console.log(`Ошибка onLike: ${err}`);
          });
      } else {
        api.setLike(currentCardData._id)
          // как раз вызов той функции из класса, которая меняет html
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.error(err);
            console.log(`Ошибка onLike: ${err}`);
          });
      }
    },


    // onLike: (cardId) => {
    //   api.setLike(cardId)
    //     .then((data) => {
    //       card.handleLikeCard(data);
    //     })
    //     .catch((err) => {
    //       console.log(`Ошибка: ${err}`);
    //     });
    // },
  });

  const cardElement = card.getCardElement()
  return cardElement;
}

// отрисовка карточек из массива
const cardsList = new Section({
    // items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardsContainer
);

// // загрузка карточек на страницу
// cardsList.renderItems();

// форма добавления карточки
const addCardPopup = new PopupWithForm(
  popupAddCard, {
    handleFormSubmit: (dataForm) => {
      console.log('addCardPopup handleFormSubmit: (dataForm)', dataForm);
      addCardPopup.loading(true);
      api.addCard(dataForm)
        .then((data) => {
          console.log('data // форма добавления карточки', data);
          cardsList.addItem(createCard(data));
          addCardPopup.close();
          formAddCardValidator.resetValidation();
        })
        .catch((err) => {
          console.log(`Ошибка// форма добавления карточки: ${err}`);
        })
        .finally(() => {
          addCardPopup.loading(false);
        });
    },
  });
// слушатели для формы добавления карточки
addCardPopup.setEventListeners();

buttonAddCardItem.addEventListener("click", () => {
  addCardPopup.open();
  formAddCardValidator.resetValidation();
});

//===================================================

// форма редактирования аватара
const editAvatarPopup = new PopupWithForm(
  popupEditAvatar, {
    handleFormSubmit: (dataForm) => {
      console.log('editAvatarPopup handleFormSubmit: (dataForm)', dataForm);
      editAvatarPopup.loading(true);
      api.editAvatar(dataForm)
        .then((data) => {
          console.log('data // форма редактирования аватара', data);
          userInfo.setAvatar(data);
          editAvatarPopup.close();
          formEditAvatarValidator.resetValidation();
        })
        .catch((err) => {
          console.log(`Ошибка// редактирования аватара: ${err}`);
        })
        .finally(() => {
          editAvatarPopup.loading(false);
        });
    },
  });

// слушатели для формы редактирования аватара
editAvatarPopup.setEventListeners();

buttonAvatar.addEventListener("click", () => {
  editAvatarPopup.open();
  formEditAvatarValidator.resetValidation();
});

//===================================

const userInfo = new UserInfo({
  username: profileName,
  about: profileDescription,
  avatar: avatar
});

// создание попапа с формой редактирования профиля 
function fillEditProfileForm({
  name,
  about
}) {
  nameInput.value = name;
  descriptionInput.value = about;
}

const editProfilePopup = new PopupWithForm(
  popupEditProfile, {
    handleFormSubmit: (dataForm) => {
      editProfilePopup.loading(true);
      console.log('editProfilePopup handleFormSubmit: (dataForm)', dataForm);
      api.editUserInfo(dataForm)
        .then((data) => {
          console.log('data // форма редактирования профиля', data);
          userInfo.setUserInfo(data);
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(`Ошибка// редактирования профиля: ${err}`);
        })
        .finally(() => {
          editProfilePopup.loading(false);
        });
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