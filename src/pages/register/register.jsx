import styles from "./register.module.css";
import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../services/actions/registerAction";

export default function Register() {
  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const { registerRequest, registerRequestFailed } = useSelector(
    (state) => state.registerReducer
  );
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const registerCallback = (e) => {
    e.preventDefault();
    dispatch(registerAction(value));
  };

  return registerRequestFailed ? (
    <p>Произошла ошибка</p>
  ) : user ? (
    <Redirect to="/" />
  ) : (
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
              {registerRequest ? "Загрузка..." : "Зарегистрироваться"}
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
