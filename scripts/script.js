

const initialCards = [
  {
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

const elementsList = document.querySelector(".elements-list");
const elementTemplate = document.querySelector("#template-element").content;
const buttonAddCardItem = document.querySelector('.profile__add-button');
const cardItemForm = document.querySelector('.card-item-form');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.edit-form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const popupImage = document.querySelector('.popup_image');

// рендер карточек из массива
function render() {
  initialCards.forEach((item) => {
    const place = createCard(item);
    renderCard(place);
  });
}


// создание карточек
function createCard(item) {
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  const buttonsLike = cardElement.querySelector('.element__like-button');
  const buttonsDelete = cardElement.querySelector('.element__delete-button');
  const bigPicture = popupImage.querySelector('.popup__picture');
  const bigPictureTitle = popupImage.querySelector('.popup__picture-title');
  const elementImage = cardElement.querySelector('.element__image');

  cardElement.querySelector(".element__title").innerText = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;


  // кнопки like
  buttonsLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });

  // кнопки delete
  buttonsDelete.addEventListener('click', () => {
    cardElement.remove();
  });


  // попапы с полноразмерными фотографиями
  elementImage.addEventListener('click', () => {
    bigPicture.src = item.link;
    bigPictureTitle.innerText = item.name;
    bigPicture.alt = item.name;
    openPopup(popupImage);
  });
  return cardElement;
};

render();

// отрисовка карточек
function renderCard(cardElement) {
  elementsList.prepend(cardElement);
}

// функция создания новой карточки
function formAddPlaceHandler(e) {
  e.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value
  };
  const place = createCard(item);
  document.forms.place.reset();
  closePopup(cardItemForm);
  renderCard(place);
}



// создание новой карточки нажатием на кнопку Создать
cardItemForm.addEventListener('submit', formAddPlaceHandler);


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



// открывается попап создания новой карточки
buttonAddCardItem.addEventListener('click', () => {
  const cardItemFormSubmit = cardItemForm.querySelector('.popup__save-button');
  openPopup(cardItemForm);
  //дезактивируем кнопку "Создать" при открытии попапа
  disabledButton(cardItemFormSubmit, config); 
})


// закрываем любые попапы при нажатии на крестик и свободное пространство вокруг попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})



// открывается попап редактирования профиля
buttonEditProfile.addEventListener('click', openEditForm)



// функция заполняет поля формы данными, которые на странице и открывает форму редактирования профиля 
function openEditForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(formEdit);
}


// функция редактирует данные профиля
function submitHandlerForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(formEdit);
}


// новые данные сохраняются на странице при клике на кнопку Сохранить
formEdit.addEventListener('submit', submitHandlerForm);

