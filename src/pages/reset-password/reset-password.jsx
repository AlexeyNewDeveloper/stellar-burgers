import styles from "./reset-password.module.css";
import React from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { resetPasswordAction } from "../../services/actions/resetPasswordAction";
import { useSelector, useDispatch } from "react-redux";
import { RESET_PASSWORD_INITIAL_STATE } from "../../services/actions/resetPasswordAction";
import { FORGOT_PASSWORD_INITIAL_STATE } from "../../services/actions/forgotPasswordAction";

export default function ResetPassword() {
  const [value, setValue] = React.useState({ password: "", token: "" });
  const [resetSuccess, setResetSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const { resetPasswordRequest, resetPasswordRequestSuccess } = useSelector(
    (state) => state.resetPasswordReducer
  );
  const { forgotPasswordRequestSuccess } = useSelector(
    (state) => state.forgotPasswordReducer
  );

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const redirectToLogin = (e) => {
    e.preventDefault();
    dispatch({ type: FORGOT_PASSWORD_INITIAL_STATE });
    dispatch({ type: RESET_PASSWORD_INITIAL_STATE });
    setResetSuccess(true);
    return false;
  };

  const resetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction(value.password, value.token));
    return false;
  };

  if (!forgotPasswordRequestSuccess && !resetSuccess) {
    return <Navigate to="/forgot-password" replace={true} />;
  }

  return resetSuccess ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <section className={styles.container}>
      <div className={styles.content}>
        <form
          onSubmit={
            !resetPasswordRequestSuccess ? resetPassword : redirectToLogin
          }
        >
          <fieldset className={styles.fieldset}>
            <legend className={styles.title}>Восстановление пароля</legend>
            <PasswordInput
              placeholder="Введите новый пароль"
              extraClass={styles.input}
              onChange={onChange}
              name={"password"}
              value={value.password}
              disabled={resetPasswordRequestSuccess}
            />
            <Input
              placeholder="Введите код из письма"
              type="text"
              extraClass={styles.input}
              onChange={onChange}
              name={"token"}
              value={value.token}
              disabled={resetPasswordRequestSuccess}
            />
            <Button
              htmlType="submit"
              type="primary"
              size={resetPasswordRequestSuccess ? "large" : "medium"}
              extraClass={styles.button}
            >
              {resetPasswordRequestSuccess
                ? "Войти"
                : resetPasswordRequest
                ? "Загрузка..."
                : "Сохранить"}
            </Button>
          </fieldset>
        </form>
        {resetPasswordRequestSuccess ? (
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
