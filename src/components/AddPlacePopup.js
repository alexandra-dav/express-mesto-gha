import { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, AddPlacePopup }) {
  const [nameInput, setName] = useState('');
  const [linkInput, setLink] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    AddPlacePopup({
      name: nameInput,
      link: linkInput
    });
  }
  function handleName(e){
    setName(e.target.value);
  }
  function handleLink(e){
    setLink(e.target.value);
  }
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="elements"
      buttonText="Создать"
      children={
        <>
          <fieldset className="popup__fieldset">
            <input
              type="text"
              value={nameInput}
              onChange={handleName}
              id="popupPlase"
              name="name"
              className="popup__input popup__input_form_plase"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popupPlase-error"></span>
          </fieldset>
          <fieldset className="popup__fieldset">
            <input
              type="url"
              value={linkInput}
              onChange={handleLink}
              id="popupLink"
              name="link"
              className="popup__input popup__input_form_link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popupLink-error"></span>
          </fieldset>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
