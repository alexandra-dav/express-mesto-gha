import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth.js";
import { api } from "../utils/Api";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { InfoTooltip } from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, handleCardClick] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [card, setCards] = useState([]);
  const [loggedIn, isLoggedIn] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(true);
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleOpenPhotoClick(data) {
    setIsPhotoPopupOpen(!isPhotoPopupOpen);
    handleCardClick({ link: data.link, name: data.name });
  }
  function handleClosePopap() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPhotoPopupOpen(false);
    setInfoTooltipOpen(false);
  }
  function handleClikButtunClose(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      handleClosePopap();
    }
  }
  function handleLogOut() {
    isLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("jwt");
  }

  // Получаем данные о пользователе
  useEffect(() => {
    if(loggedIn){
      api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
    }    
  }, [loggedIn]);
  // закрыть попапы
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        handleClosePopap();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });
  useEffect(() => {
    if(loggedIn){
      api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
  }
  function handleUpdateUser(newDataProfile) {
    api
      .patchUserInfo(newDataProfile)
      .then((newProfile) => {
        setCurrentUser(newProfile);
        handleClosePopap();
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
  }
  function handleUpdateAvatar(newLinkAvatar) {
    api
      .patchUserAvatar(newLinkAvatar)
      .then((newProfile) => {
        setCurrentUser(newProfile);
        handleClosePopap();
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
  }
  function handleAddPlaceSubmit(newPlaceCard) {
    api
      .postCard(newPlaceCard)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...card]);
        handleClosePopap();
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
  }

  function handleRegisterUser(data) {
    auth
      .register(data)
      .then((res) => {
        if (res.statusCode !== 400) {
          setIsRegisterSuccess(true);
          setInfoTooltipOpen(true);
          history.push("/sing-in");
        }
      })
      .catch((err) => {
        console.log("Ошибка: ", err, " код ошибки: ", err.status);
        setIsRegisterSuccess(false);
        setInfoTooltipOpen(true);
      });
  }
  function handleAuthorize(data) {
    auth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          isLoggedIn(true);
          setUserEmail(data.email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("Ошибка: ", err, " код ошибки: ", err.status);
      });
  }
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            isLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) =>
          console.log("Ошибка: ", err, " код ошибки: ", err.status)
        );
    }
  }, [loggedIn, userEmail, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onLogOut={handleLogOut} email={userEmail} />

      <Switch>
        <Route path="/sing-in">
          <Login onAuthorize={handleAuthorize} />
        </Route>

        <Route path="/sing-up">
          <Register onRegister={handleRegisterUser} />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
          card={card}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleOpenPhotoClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
      </Switch>

      <Footer />
      <PopupWithForm
        title="Вы уверены?"
        name="delete-card"
        buttonText="Да"
        isOpen={false}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleClikButtunClose}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleClikButtunClose}
        AddPlacePopup={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleClikButtunClose}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isPhotoPopupOpen}
        onClose={handleClikButtunClose}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleClikButtunClose}
        isLogInSuccess={isRegisterSuccess}
        isAuthorized="Вы успешно зарегистрировались!"
        isNoAuthorized="Что-то пошло не так! Попробуйте ещё раз."
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
