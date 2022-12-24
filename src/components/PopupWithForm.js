import React from "react";

export function PopupWithForm(props) {
  return (
    <div className={`popup popup__${props.name} ${props.isOpen && "popup_opened"}`} id={`${props.name}`}>
      <div className="popup__content">
        <button
          aria-label="close"
          className="popup__close"
          type="button"
          onMouseDown={props.onClose}
        ></button>
        <h2 className="popup__title">{`${props.title}`}</h2>
        <form name={`${props.name}`} className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          <button
            aria-label="submit"
            className="popup__button"
            type="submit"
          >{`${props.buttonText}`}</button>
        </form>
      </div>
    </div>
  );
}
