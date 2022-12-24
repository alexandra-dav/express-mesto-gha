import { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarInput, setAvatar] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput,
    });
  }
  function handleAvatar(e) {
    setAvatar(e.target.value);
  }
  useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      children={
        <>
          <fieldset className="popup__fieldset">
            <input
              type="url"
              value={avatarInput}
              onChange={handleAvatar}
              id="popupAvatar"
              name="link"
              className="popup__input popup__input_form_avatar"
              placeholder="Ссылка"
              required
            />
            <span className="popupAvatar-error"></span>
          </fieldset>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
