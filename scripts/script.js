const buttonEditProfile = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.edit-form');
const buttonEditFormClose = document.querySelector('.edit-form__close')
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.edit-form__input_name')
let descriptionInput = document.querySelector('.edit-form__input_description')


function closeEditFormOnQ(e) {
  if (e.code === 'Escape') {
    closeEditForm();
  }
}

function openEditForm() {
  editForm.classList.remove('edit-form_hidden');
  document.addEventListener('keydown', closeEditFormOnQ);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closeEditForm() {
  editForm.classList.add('edit-form_hidden');
  document.removeEventListener('keydown', closeEditFormOnQ);
}

buttonEditProfile.addEventListener('click', function () {
  openEditForm();
})

buttonEditFormClose.addEventListener('click', function () {
  closeEditForm();
})

editForm.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closeEditForm();
  }
})

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeEditForm();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener('submit', formSubmitHandler);