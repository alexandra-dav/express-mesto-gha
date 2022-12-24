import React from "react";
import { useState } from "react";

export default function Login({onAuthorize}) {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const handlChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  const handlSubmit = (e) => {
    e.preventDefault();
    let { password, email } = data;
    onAuthorize({password, email});    
  }

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form
        name="login-form"
        className="register__form"
        onSubmit={handlSubmit}
      >
        <fieldset className="register__fieldset">
            <input
              type="email"
              id="loginEmail"
              name="email"
              className="register__input register__input_form_email"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              required
              value={data.email}
              onChange={handlChange}
            />
            <span className="loginEmail-error"></span>
          </fieldset>
          <fieldset className="register__fieldset">
            <input
              type="password"
              id="loginPassword"
              name="password"
              className="register__input register__input_form_pass"
              placeholder="Пароль"
              minLength="2"
              maxLength="200"
              required
              value={data.password}
              onChange={handlChange}
            />
            <span className="loginPass-error"></span>
          </fieldset>

        <button aria-label="submit" className="register__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
