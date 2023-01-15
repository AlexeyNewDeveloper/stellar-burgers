import styles from "./reset-password.module.css";
import React from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

export default function ResetPassword() {
  const [value, setValue] = React.useState({ password: "", codeForReset: "" });
  const [requestStatus, setRequestStatus] = React.useState({
    loading: false,
    success: false,
    failed: false,
    redirect: false,
  });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const redirectToLogin = (e) => {
    e.preventDefault();
    setRequestStatus({ ...requestStatus, redirect: true });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    setRequestStatus({ ...requestStatus, loading: true });
    fetch(`${URL_FOR_GET_DATA}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        password: value.password,
        token: value.codeForReset,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          setRequestStatus({ loading: false, success: true });
        } else {
          setRequestStatus({ loading: false, success: false, failed: true });
        }
      })
      .catch((err) => {
        setRequestStatus({ loading: false, success: false, failed: true });
      });
  };

  return requestStatus.redirect ? (
    <Redirect to="/login" />
  ) : (
    <section className={styles.container}>
      <div className={styles.content}>
        <form>
          <fieldset className={styles.fieldset}>
            <legend className={styles.title}>Восстановление пароля</legend>
            <PasswordInput
              placeholder="Введите новый пароль"
              extraClass={styles.input}
              onChange={onChange}
              name={"password"}
              value={value.password}
              disabled={requestStatus.success}
            />
            <Input
              placeholder="Введите код из письма"
              type="text"
              extraClass={styles.input}
              onChange={onChange}
              name={"codeForReset"}
              value={value.codeForReset}
              disabled={requestStatus.success}
            />
            <Button
              htmlType="submit"
              type="primary"
              size={requestStatus.success ? "large" : "medium"}
              extraClass={styles.button}
              onClick={!requestStatus.success ? resetPassword : redirectToLogin}
            >
              {requestStatus.success
                ? "Войти"
                : requestStatus.loading
                ? "Загрузка..."
                : "Сохранить"}
            </Button>
          </fieldset>
        </form>
        {requestStatus.success ? (
          <p className={`${styles.text} ${styles.text_success}`}>
            Пароль успешно изменен.
          </p>
        ) : (
          <p className={styles.text}>
            Вспомнили пароль?{" "}
            <Link to={{ pathname: "/login" }} className={styles.link}>
              Войти
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
