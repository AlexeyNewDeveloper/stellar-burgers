import styles from "./reset-password.module.css";
import React from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [value, setValue] = React.useState({ password: "", codeForReset: "" });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <form>
          <fieldset className={styles.fieldset}>
            <legend className={styles.title}>Вход</legend>
            <PasswordInput
              placeholder="Введите новый пароль"
              extraClass={styles.input}
              onChange={onChange}
              name={"password"}
              value={value.password}
            />
            <Input
              placeholder="Введите код из письма"
              type="text"
              extraClass={styles.input}
              onChange={onChange}
              name={"codeForReset"}
              value={value.codeForReset}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
            >
              Сохранить
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
