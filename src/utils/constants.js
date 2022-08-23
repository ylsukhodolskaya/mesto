export const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


export const configCard = {
  templateSelector: '#template-element',
  cardSelector: '.element',
  buttonLikeSelector: '.element__like-button',
  buttonDeleteSelector: '.element__delete-button',
  imageSelector: '.element__image',
  titleSelector: '.element__title',
  likeClass: 'element__like-button_active'
};

export const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    "content-type": "application/json",
    "authorization": "b7525861-de9d-4d18-aacb-1e45dd5552b0",
  }
}

export const initialCards = [{
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

export const cardsContainer = document.querySelector(".elements-list");
export const buttonAddCardItem = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.popup-add-card');
export const formAddCard = popupAddCard.querySelector('.popup__form_add-card');
export const titleInput = document.querySelector('.popup__input_type_title');
export const linkInput = document.querySelector('.popup__input_type_link');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup-edit-profile');
export const formEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_type_name');
export const descriptionInput = document.querySelector('.popup__input_type_description');
export const popupImage = document.querySelector('.popup_image');
export const avatar = document.querySelector('.profile__avatar');
export const buttonAvatar = document.querySelector('.profile__avatar-button');
export const popupEditAvatar = document.querySelector('.popup-edit-avatar');
export const formEditAvatar = popupEditAvatar.querySelector('.popup__form_edit-avatar');
