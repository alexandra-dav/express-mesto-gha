import { useContext } from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <button
            aria-label="edit-avatar"
            className="profile__edit-avatar"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
          <img
            className="profile__image"
            src={`${currentUser.avatar}`}
            alt="Аватар пользователя"
          />
        </div>
        <form className="profile__info" name="profileInfo">
          <h1 className="profile__name">{`${currentUser.name}`}</h1>
          <button
            aria-label="edit-profile"
            className="profile__edit-name"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__occupation">{`${currentUser.about}`}</p>
        </form>
        <button
          aria-label="add-content"
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="Галлерея" id="elements">
        {props.card.map((cardData) => (
          <Card
            key={cardData._id}
            card={cardData}
            onCardDelete={() => {
              props.onCardDelete(cardData);
            }}
            onCardLike={() => {
              props.onCardLike(cardData);
            }}
            onCardClick={() => {
              props.onCardClick(cardData);
            }}
          />
        ))}
      </section>
    </main>
  );
}
