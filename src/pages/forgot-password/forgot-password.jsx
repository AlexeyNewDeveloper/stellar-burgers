import styles from "./forgot-password.module.css";
import React from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

export default function ForgotPassword() {
  const [value, setValue] = React.useState({ email: "" });
  const [requestStatus, setRequestStatus] = React.useState({
    loading: false,
    success: false,
    failed: false,
    redirect: false,
  });

  React.useEffect(() => {
    if (requestStatus.success) {
      setTimeout(() => {
        setRequestStatus({ ...requestStatus, redirect: true });
      }, 5000);
    }
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const getNewPassword = (e) => {
    e.preventDefault();
    setRequestStatus({ ...requestStatus, loading: true });
    fetch(`${URL_FOR_GET_DATA}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: value.email,
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

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {requestStatus.success ? (
          <div className={styles.container_success}>
            <p className={styles.text_redirect}>
              Через 5 секунд вы будете перенаправлены на страницу сброса пароля.
              Код для сброса пароля отправлен на{" "}
              <span className={styles.email_redirect}>{value.email}</span>
              {requestStatus.redirect && <Redirect to="/reset-password" />}
            </p>
          </div>
        ) : (
          <>
            <form>
              <fieldset className={styles.fieldset}>
                <legend className={styles.title}>Восстановление пароля</legend>
                <EmailInput
                  onChange={onChange}
                  placeholder="Укажите e-mail"
                  extraClass={styles.input}
                  name={"email"}
                  value={value.email}
                />
                <Button
                  htmlType="submit"
                  type="primary"
                  size="medium"
                  extraClass={styles.button}
                  onClick={getNewPassword}
                >
                  {requestStatus.loading ? "Загрузка..." : "Восстановить"}
                </Button>
              </fieldset>
            </form>
            <p className={styles.text}>
              Вспомнили пароль?{" "}
              <Link to={{ pathname: "/login" }} className={styles.link}>
                Войти
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
