import styles from "./register.module.css";
import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { registerAction } from "../../services/actions/registerAction";
import { getRegisterState } from "../../services/selectors/registerStateSelector";
import { IUserData } from "../../types";

const Register: React.FC = () => {
  const [value, setValue] = React.useState<IUserData>({
    name: "",
    email: "",
    password: "",
  });
  const { registerRequest, registerRequestFailed, registerRequestSuccess } =
    useSelector(getRegisterState);

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const registerCallback = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    dispatch(registerAction(value));
    return false;
  };

  return registerRequestFailed ? (
    <p>Произошла ошибка</p>
  ) : registerRequestSuccess ? (
    <Navigate to="/" replace={true} />
  ) : (
    <section className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={registerCallback}>
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
};

export default Register;
