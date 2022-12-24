import logo from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

export function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__info">
        <p className="header__email">{`${props.email}`}</p>
        <Switch>
          <Route path="/sing-in">
            <Link to="/sing-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route path="/sing-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route path="/">
            <Link
              to="/sign-in"
              className="header__link"
              onClick={props.onLogOut}
            >
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}