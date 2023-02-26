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
import { useForm } from "../../hooks/useForm";

const Register: React.FC = () => {
  const { values, setValues, handleChange } = useForm<IUserData>({
    name: "",
    email: "",
    password: "",
  });
  const { registerRequest, registerRequestFailed, registerRequestSuccess } =
    useSelector(getRegisterState);

  const dispatch = useDispatch();

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const registerCallback = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    dispatch(registerAction(values));
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
              onChange={handleChange}
              name={"name"}
              type="text"
              placeholder="Имя"
              extraClass={styles.input}
              value={values.name}
            />
            <EmailInput
              onChange={handleChange}
              name={"email"}
              extraClass={styles.input}
              value={values.email}
            />
            <PasswordInput
              onChange={handleChange}
              name={"password"}
              extraClass={styles.input}
              value={values.password}
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
