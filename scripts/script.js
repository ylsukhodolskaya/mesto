const initialCards = [{
    name: "США, Гранд-Каньон",
    link: "https://sun9-west.userapi.com/sun9-46/s/v1/ig2/N0L2cGWeA6QADRtAzLcoxk32uiSQ14EnfUDqvfexRiU6lLqaIUbYPpvMMWDHcynIcJFPHd9RSiGuC9qJaoHQ-2Gl.jpg?size=2560x1920&quality=95&type=album"
  },
  {
    name: "Шри-Ланка",
    link: "https://sun9-west.userapi.com/sun9-54/s/v1/ig2/_nfhYvh5jdMzabm2emhWZPB5QaSbZuknayFaLrV7HyLuSoCNDMiDBH5D-NQk8GRWv6qi3ih_aTlI7p1pRetd6q67.jpg?size=1280x960&quality=95&type=album"
  },
  {
    name: "Грузия",
    link: "https://sun9-west.userapi.com/sun9-15/s/v1/ig2/Cm7HeokUxHructO4UtQ8_xZBAz0tT59pjzEUQikq0vA0UQXBFIakv-6B_ygII3bntOaH3ni08Fc6j4fu6jSjinWB.jpg?size=1280x960&quality=95&type=album"
  },
  {
    name: "Геленджик",
    link: "https://sun9-west.userapi.com/sun9-49/s/v1/ig2/O5_E2toS2LIxHXcfxBpJxwstHsozZ_2sobz7Y_U645JP-yGMFKtTIsYE-ytrCL3iIaiV83puQfL8FMOj7z4a4Wdq.jpg?size=1620x2160&quality=95&type=album"
  },
  {
    name: "Финляндия",
    link: "https://sun9-west.userapi.com/sun9-39/s/v1/ig2/dsg-I7i5U1Km_EdWW1KgY2xTvINWbs2ERS3TVvTSltq3MujQvK_fdl9Ili-iKZdGTGBBfj29ZnnEhLTYpkTKiUtg.jpg?size=2560x1440&quality=95&type=album"
  },
  {
    name: "Крым",
    link: "https://sun9-east.userapi.com/sun9-35/s/v1/ig2/h30HpVpev3Kyk9VbahT_imfLNHQpWclFY40zQensBhdnjZlthSIvJmXW4cBb5nt-nihkj5b_HTGT1RmaSn19DCjq.jpg?size=959x1280&quality=95&type=album"
  }
];

const elementsList = document.querySelector(".elements-list");
const elementTemplate = document.querySelector("#template-element").content;
const buttonAddCardItem = document.querySelector('.profile__add-button');
const cardItemForm = document.querySelector('.card-item-form');
const buttonCloseCardItem = document.querySelector('.card-item-form__close-button');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.edit-form');
const buttonCloseEditForm = document.querySelector('.edit-form__close-button')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const buttonClosePopupImage = document.querySelector('.button_close-image-popup')
const popupImage = document.querySelector('.popup_image');

// рендер карточек из массива
function render() {
  initialCards.forEach(renderCard);
}


// рендер карточек
function renderCard(item) {
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").innerText = item.name;
  cardElement.querySelector(".element__image").src = item.link;
  cardElement.querySelector(".element__image").alt = item.name;
  elementsList.prepend(cardElement);

  const buttonsLike = document.querySelector('.element__like-button');
  buttonsLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });


  const buttonsDelete = document.querySelectorAll('.element__delete-button');
  buttonsDelete.forEach(btn => {
    btn.addEventListener('click', () => {
      const cartItem = btn.closest('.element');
      cartItem.remove();
    });
  });

  const bigPicture = popupImage.querySelector('.popup__picture');
  const bigPictureTitle = popupImage.querySelector('.popup__picture-title');
  const elementImage = document.querySelector('.element__image')
  
  elementImage.addEventListener('click', () => {
      bigPicture.src = item.link;
      bigPictureTitle.innerText = item.name;
      bigPicture.alt = item.name;
      openPopup(popupImage);
    });
  };

render();




// функция создания новой карточки
function createItem(e) {
  e.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value
  };
  renderCard(item);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(cardItemForm);
}








// создание новой карточки нажатием на кнопку Создать
cardItemForm.addEventListener('submit', createItem);


// функция закрывает все формы при нажатии на ESC
function closePopupOnEsc(e) {
  if (e.code === 'Escape') {
    closePopup(editForm);
    closePopup(cardItemForm);
    closePopup(popupImage);
  }
}

// открытие попапа
function openPopup(popup) {
  popup.classList.remove('popup_hidden');
  document.addEventListener('keydown', closePopupOnEsc);
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.add('popup_hidden');
  document.removeEventListener('keydown', closePopupOnEsc);
}



// открывается попап создания новой карточки
buttonAddCardItem.addEventListener('click', () => {
  openPopup(cardItemForm);
})

 
// закрываем форму создания карточки при нажатии на крестик
buttonCloseCardItem.addEventListener('click', () => {
  closePopup(cardItemForm)
});

// закрываем форму создания карточки при нажатии на любое пространство вокруг формы
cardItemForm.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup(cardItemForm);
  }
})






// открывается попап редактирования профиля
buttonEditProfile.addEventListener('click', openEditForm)



// функция заполняет поля формы данными, которые на странице и открывает форму редактирования профиля 
function openEditForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editForm);
}


// функция редактирует данные профиля
function submitHandlerForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editForm);
}


// закрываем форму редактирования профиля при нажатии на любое пространство вокруг формы
editForm.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup(editForm);
  }
})


// закрываем форму редактирования профиля при нажатии на крестик
buttonCloseEditForm.addEventListener('click', () => {
  closePopup(editForm)
});



// новые данные сохраняются на странице при клике на кнопку Сохранить
editForm.addEventListener('submit', submitHandlerForm);





// закрываем попап с картинкой нажатием на крестик
buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupImage)
})



