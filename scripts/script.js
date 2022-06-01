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


let buttons = document.querySelectorAll('.element__like-button')
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(event) {
    event.currentTarget.classList.toggle('element__like-button_active')
  }); 
}