import React from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function Login() {
  const [value, setValue] = React.useState({ email: "", password: "" });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <form>
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
              Войти
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
}
