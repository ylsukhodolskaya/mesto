import {
  configForm,
  configCard
} from './constants.js';

import {
  FormValidator
} from './FormValidator.js';

import {
  Card
} from './Card.js';

import Section from './Section.js';



const initialCards = [{
    name: "США, Гранд-Каньон",
    link: "https://sun9-west.userapi.com/sun9-46/s/v1/if2/AkrtcCx1pqXactcR5KaY12NrzrMRF4GOe0ZyPPfFb9b6XoydDpNBMPyd7lKN-RuILR2JbesTbrmO4QwYjCSyOQrR.jpg?size=2560x1920&quality=95&type=album"
  },
  {
    name: "Шри-Ланка",
    link: "https://sun9-west.userapi.com/sun9-54/s/v1/if2/zrT0RYQ0fRBXIq9oMFdGl_6BDW0PBkY8SMQj1Xyotd16KH15q17pBsiVAT8aaRHOviQ6vN2xo-wQW_OIfHEn8zdT.jpg?size=1280x960&quality=95&type=album"
  },
  {
    name: "Грузия",
    link: "https://sun9-west.userapi.com/sun9-15/s/v1/if2/XOznB9KL6ClLgy5kbhRrhIZXi_59hLd9y0_uGY7ckJwMw-EoccDm5DR5CTQZuQRDzoEg9TahVPpEgSNXnoJl7kkD.jpg?size=1280x960&quality=95&type=album"
  },
  {
    name: "Геленджик",
    link: "https://sun9-west.userapi.com/sun9-49/s/v1/if2/CZBHG_T9NUKLccsj7-UbFoCyLweHshACWGo1bha00Beg8Y707sqdfXXz_hsKZsRb0j-haUyiNK-UyVrOgZIZ2tIP.jpg?size=1620x2160&quality=95&type=album"
  },
  {
    name: "Финляндия",
    link: "https://sun9-west.userapi.com/sun9-39/s/v1/if2/98Pf3m-pLmykH9uY_O1TuV4IWJ-3s2IIhPQiY42tQotBiyCRrCZ8AL35blVHTsUfMkiLmQ48Y2cG_Bff1OOh9EIh.jpg?size=2560x1440&quality=95&type=album"
  },
  {
    name: "Крым",
    link: "https://sun9-east.userapi.com/sun9-35/s/v1/if2/HuCCLn3a6vIqV035LyMD0B7XXXC0D091sF-FoUYk78R-SPuT_zmeYlo1RXiJ3GROALP92Z7WEtU8bALioJ9SwA_W.jpg?size=959x1280&quality=95&type=album"
  }
];
const popups = document.querySelectorAll('.popup')
const cardsContainer = document.querySelector(".elements-list");
const buttonAddCardItem = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-card');
const formAddCard = popupAddCard.querySelector('.popup__form_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const popupImage = document.querySelector('.popup_image');
const bigPicture = popupImage.querySelector('.popup__picture');
const bigPictureTitle = popupImage.querySelector('.popup__picture-title');

const formEditProfileValidator = new FormValidator(configForm, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(configForm, formAddCard);
formAddCardValidator.enableValidation();

function createCard(item) {
  const card = new Card(configCard, item, (data) => {
    bigPicture.src = data.link;
    bigPictureTitle.innerText = data.name;
    bigPicture.alt = data.name;
    openPopup(popupImage);
  });

  const cardElement = card.getCardElement()
  return cardElement;
}

// // рендер карточек из массива
// function render() {
//   initialCards.forEach((item) => {
//     const place = createCard(item);
//     renderCard(place);
//   });
// }

// render();

// отрисовка карточек из массива
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardsContainer
);

// загрузка карточек на страницу
cardsList.renderItems();



// отрисовка карточек
function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// функция создания новой карточки
function handleFormAddPlace(e) {
  e.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value
  };
  const place = createCard(item);
  formAddCard.reset();
  closePopup(popupAddCard);
  renderCard(place);
}

// создание новой карточки нажатием на кнопку Создать
formAddCard.addEventListener('submit', handleFormAddPlace);

// функция закрывает все формы при нажатии на ESC
function closePopupOnEsc(e) {
  if (e.code === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// функция заполняет поля формы данными, которые на странице и открывает форму редактирования профиля 
function openEditForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  formEditProfileValidator.resetValidation();
}

// функция редактирует данные профиля
function submitHandlerForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
}

// открывается попап редактирования профиля
buttonEditProfile.addEventListener('click', openEditForm)

// открывается попап создания новой карточки
buttonAddCardItem.addEventListener('click', () => {
  // const cardItemFormSubmit = cardItemForm.querySelector('.popup__save-button');
  openPopup(popupAddCard);
  formAddCardValidator.resetValidation();
})

// закрываем любые попапы при нажатии на крестик и свободное пространство вокруг попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

// новые данные сохраняются на странице при клике на кнопку Сохранить
formEditProfile.addEventListener('submit', submitHandlerForm);