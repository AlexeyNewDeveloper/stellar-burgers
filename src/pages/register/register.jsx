import styles from "./register.module.css";
import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function Register() {
  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <form>
          <fieldset className={styles.fieldset}>
            <legend className={styles.title}>Регистрация</legend>
            <Input
              onChange={onChange}
              name={"name"}
              type="text"
              placeholder="Имя"
              extraClass={styles.input}
              value={value.name}
            />
            <EmailInput
              onChange={onChange}
              name={"email"}
              extraClass={styles.input}
              value={value.email}
            />
            <PasswordInput
              onChange={onChange}
              name={"password"}
              extraClass={styles.input}
              value={value.password}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
            >
              Зарегистрироваться
            </Button>
          </fieldset>
        </form>
        <p className={styles.text}>
          Уже зарегистрированы?{" "}
          <Link to={{ pathname: "/login" }} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
