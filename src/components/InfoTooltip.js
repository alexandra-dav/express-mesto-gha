import success from '../images/success.jpg';
import failure from '../images/failure.jpg';
import React from "react";

export function InfoTooltip({ isOpen, onClose, isLogInSuccess, isAuthorized, isNoAuthorized}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__content">
        <button
          aria-label="close"
          className="popup__close"
          type="button"
          onMouseDown={onClose}
        ></button>
        <img className='popup__tooltip-img' src={isLogInSuccess ? success : failure} alt="Иконка статуса авторизации"></img>
        <h2 className="popup__tooltip-title">
            {isLogInSuccess ? isAuthorized : isNoAuthorized}
        </h2>
      </div>
    </div>
  );
}
