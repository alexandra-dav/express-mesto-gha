export function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_photo ${isOpen ? "popup_opened" : ""}`}
      id="view_photo"
    >
      <div className="photo">
        <button
          aria-label="close"
          className="popup__close popup__close_window_photo"
          type="button"
          onMouseDown={onClose}
        ></button>
        <figure className="photo__figure">
          <img
            src={card.link}
            className="photo__image"
            alt={`${card.name}`}
          />
          <figcaption className="photo__caption">{`${card.name}`}</figcaption>
        </figure>
      </div>
    </div>
  );
}
