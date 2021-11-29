import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setAccessToken } from "../../redux/user/user.actions";
import { Routes } from "../../routes/types";
import {
  getEmailError,
  getPasswordError,
  checkCredentials,
} from "./signInHelper";
import "./SignInPage.css";

type SignInPageProps = {};

export const SignInPage: React.FC<SignInPageProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState<string | null>(
    "Email field is required"
  );
  const [passwordError, setPasswordError] = useState<string | null>(
    "Password field is required"
  );
  const [formError, setFormError] = useState<string | null>(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmailError(getEmailError(emailValue));
    setEmail(emailValue);
  }, []);

  const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPasswordError(getPasswordError(passwordValue));
    setPassword(passwordValue);
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!!emailError && !!passwordError);
  }, [emailError, passwordError]);

  const submit = useCallback(() => {
    if (checkCredentials(email, password)) {
      dispatch(setAccessToken("Some random access token"));
      history.push(Routes.Home);
    } else {
      setFormError("Invalid credentials, retry.");
    }
  }, [dispatch, email, history, password]);

  return (
    <div className="sign-in--body">
      <h1 className="sign-in--title">Sign Up</h1>
      <div className="sign-in--field">
        <input
          className="sign-in--input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
        {emailError && (
          <p role="note" className="sign-in--error">
            {emailError}
          </p>
        )}
      </div>
      <div className="sign-in--field">
        <input
          className="sign-in--input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
        {passwordError && (
          <p role="note" className="sign-in--error">
            {passwordError}
          </p>
        )}
      </div>
      <button
        onClick={submit}
        disabled={isButtonDisabled}
        className="sign-in--button"
      >
        Submit
      </button>
      {formError && (
        <p role="note" className="sign-in--error">
          {formError}
        </p>
      )}
    </div>
  );
};
