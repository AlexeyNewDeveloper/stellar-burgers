import styles from "./register.module.css";
import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

export default function Register() {
  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [requestStatus, setRequestStatus] = React.useState({
    loading: false,
    success: false,
    failed: false,
    redirect: false,
  });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const registerCallback = (e) => {
    e.preventDefault();
    setRequestStatus({ ...requestStatus, loading: true });
    fetch(`${URL_FOR_GET_DATA}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
        name: value.name,
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
              onClick={registerCallback}
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
