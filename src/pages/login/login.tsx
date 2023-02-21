import React from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { loginAction } from "../../services/actions/loginAction";
import { getLoginState } from "../../services/selectors/loginStateSelector";

const Login: React.FC = () => {
  const [value, setValue] = React.useState({ email: "", password: "" });
  const { loginRequest, loginRequestFailed } = useSelector(getLoginState);
  const dispatch = useDispatch();
  const onChange = (e: { target: HTMLInputElement }): void => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const loginCallback = (e: React.FormEvent): boolean => {
    e.preventDefault();
    dispatch(loginAction(value));
    return false;
  };

  return loginRequestFailed ? (
    <p>Произошла ошибка</p>
  ) : (
    <section className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={loginCallback}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.title}>Вход</legend>
            <EmailInput
              onChange={onChange}
              value={value.email}
              extraClass={styles.input}
              name={"email"}
            />
            <PasswordInput
              onChange={onChange}
              value={value.password}
              extraClass={styles.input}
              name={"password"}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
            >
              {loginRequest ? "Загрузка" : "Войти"}
            </Button>
          </fieldset>
        </form>
        <p className={styles.text}>
          Вы — новый пользователь?{" "}
          <Link to={{ pathname: "/register" }} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={styles.text}>
          Забыли пароль?{" "}
          <Link to={{ pathname: "/forgot-password" }} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
