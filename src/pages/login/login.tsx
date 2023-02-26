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
import { useForm } from "../../hooks/useForm";

interface ILogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { values, handleChange, setValues } = useForm<ILogin>({
    email: "",
    password: "",
  });
  const { loginRequest, loginRequestFailed } = useSelector(getLoginState);
  const dispatch = useDispatch();
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const loginCallback = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    dispatch(loginAction(values));
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
              onChange={handleChange}
              value={values.email}
              extraClass={styles.input}
              name={"email"}
            />
            <PasswordInput
              onChange={handleChange}
              value={values.password}
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
