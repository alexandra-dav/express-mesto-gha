import { useState, useContext, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      children={
        <>
          <fieldset className="popup__fieldset">
            <input
              type="text"
              id="popupName"
              name="name"
              className="popup__input popup__input_form_name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
              onChange={handleChangeName}
              value={name || ""}
            />
            <span className="popupName-error"></span>
          </fieldset>
          <fieldset className="popup__fieldset">
            <input
              type="text"
              id="popupJob"
              name="about"
              className="popup__input popup__input_form_job"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
              onChange={handleChangeDescription}
              value={description || ""}
            />
            <span className="popupJob-error"></span>
          </fieldset>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
