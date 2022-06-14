const buttonEditProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonPopupClose = document.querySelector('.popup__close-button')
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name')
let descriptionInput = document.querySelector('.popup__input_type_description')


function closePopupOnEsc(e) {
  if (e.code === 'Escape') {
    closePopup();
  }
}

function openPopup() {
  popup.classList.remove('popup_hidden');
  document.addEventListener('keydown', closePopupOnEsc);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.add('popup_hidden');
  document.removeEventListener('keydown', closePopupOnEsc);
}

buttonEditProfile.addEventListener('click', openPopup)

buttonPopupClose.addEventListener('click', closePopup)

popup.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
})

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}


popup.addEventListener('submit', formSubmitHandler);












const initialCards = [
  {
    name: "США, Гранд-Каньон",
    link:
      "https://sun9-west.userapi.com/sun9-46/s/v1/ig2/N0L2cGWeA6QADRtAzLcoxk32uiSQ14EnfUDqvfexRiU6lLqaIUbYPpvMMWDHcynIcJFPHd9RSiGuC9qJaoHQ-2Gl.jpg?size=2560x1920&quality=95&type=album"
  },
  {
    name: "Шри-Ланка",
    link:
      "https://sun9-west.userapi.com/sun9-54/s/v1/ig2/_nfhYvh5jdMzabm2emhWZPB5QaSbZuknayFaLrV7HyLuSoCNDMiDBH5D-NQk8GRWv6qi3ih_aTlI7p1pRetd6q67.jpg?size=1280x960&quality=95&type=album"
  },
  {
    name: "Грузия",
    link:
      "https://sun9-west.userapi.com/sun9-15/s/v1/ig2/Cm7HeokUxHructO4UtQ8_xZBAz0tT59pjzEUQikq0vA0UQXBFIakv-6B_ygII3bntOaH3ni08Fc6j4fu6jSjinWB.jpg?size=1280x960&quality=95&type=album"
  },
  {
    name: "Геленджик",
    link:
      "https://sun9-west.userapi.com/sun9-49/s/v1/ig2/O5_E2toS2LIxHXcfxBpJxwstHsozZ_2sobz7Y_U645JP-yGMFKtTIsYE-ytrCL3iIaiV83puQfL8FMOj7z4a4Wdq.jpg?size=1620x2160&quality=95&type=album"
  },
  {
    name: "Финляндия",
    link:
      "https://sun9-west.userapi.com/sun9-39/s/v1/ig2/dsg-I7i5U1Km_EdWW1KgY2xTvINWbs2ERS3TVvTSltq3MujQvK_fdl9Ili-iKZdGTGBBfj29ZnnEhLTYpkTKiUtg.jpg?size=2560x1440&quality=95&type=album"
  },  
  {
    name: "Крым",
    link:
      "https://sun9-east.userapi.com/sun9-35/s/v1/ig2/h30HpVpev3Kyk9VbahT_imfLNHQpWclFY40zQensBhdnjZlthSIvJmXW4cBb5nt-nihkj5b_HTGT1RmaSn19DCjq.jpg?size=959x1280&quality=95&type=album"
  }
];

const elementsList = document.querySelector(".elements-list");
const elementTemplate = document.querySelector("#template-element").content;

const elementInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  elementInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  const placeElement = elementTemplate
    .querySelector(".element")
    .cloneNode(true);
  placeElement.querySelector(".element__title").textContent = name;
  placeElement.querySelector(".element__image").src = link;

  elementsList.prepend(placeElement);
}

render();










let buttons = document.querySelectorAll('.element__like-button')
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(event) {
    event.currentTarget.classList.toggle('element__like-button_active')
  }); 
}



let buttonsDelete = document.querySelectorAll('.element__delete-button')
buttonsDelete.forEach(btn => {
  btn.addEventListener('click', () => {
      const cartItem = btn.closest('.element');
      cartItem.remove();
  });
});
