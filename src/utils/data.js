// Массив с классами ошибок
export const errorList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const buttonEditPropile = document.querySelector('.profile__edit-name');
export const popupFormProfile = document.forms.popupFormProfile;
// Выберите элементы, куда должны быть вставлены значения полей
export const popupNameOpen = popupFormProfile.elements.popupName;
export const popupJobOpen = popupFormProfile.elements.popupJob;
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
export const popupFormAvatar = document.forms.popupFormAvatar;
export const popupAvatarOpen = popupFormAvatar.elements.popupAvatar;

export const buttonAddPlace = document.querySelector('.profile__add');
export const popupFormElements = document.forms.popupFormElements;