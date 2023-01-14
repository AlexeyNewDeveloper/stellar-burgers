import styles from "./forgot-password.module.css";
import React from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [value, setValue] = React.useState({ email: "" });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <section className={styles.container}>
      <div className={styles.content}>
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
            >
              Восстановить
            </Button>
          </fieldset>
        </form>
        <p className={styles.text}>
          Вспомнили пароль?{" "}
          <Link to={{ pathname: "/login" }} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
