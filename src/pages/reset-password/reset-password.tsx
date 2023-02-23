import styles from "./reset-password.module.css";
import React from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { resetPasswordAction } from "../../services/actions/resetPasswordAction";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getResetPasswordInitialState } from "../../services/actions/resetPasswordAction";
import { getForgotInitialState } from "../../services/actions/forgotPasswordAction";
import { getResetPasswordState } from "../../services/selectors/resetPasswordStateSelector";
import { getForgotPasswordState } from "../../services/selectors/forgotPasswordStateSelector";
import { useForm } from "../../hooks/useForm";

interface IResetPasswordForm {
  password: string;
  token: string;
}

const ResetPassword: React.FC = () => {
  const { values, setValues } = useForm<IResetPasswordForm>({
    password: "",
    token: "",
  });
  const [resetSuccess, setResetSuccess] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { resetPasswordRequest, resetPasswordRequestSuccess } = useSelector(
    getResetPasswordState
  );
  const { forgotPasswordRequestSuccess } = useSelector(getForgotPasswordState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const redirectToLogin = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    dispatch(getForgotInitialState());
    dispatch(getResetPasswordInitialState());
    setResetSuccess(true);
    return false;
  };

  const resetPassword = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    dispatch(resetPasswordAction(values.password, values.token));
    return false;
  };

  if (!forgotPasswordRequestSuccess && !resetSuccess) {
    return <Navigate to="/forgot-password" replace={true} />;
  }

  return resetSuccess ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <section className={styles.container}>
      <div className={styles.content}>
        <form
          onSubmit={
            !resetPasswordRequestSuccess ? resetPassword : redirectToLogin
          }
        >
          <fieldset className={styles.fieldset}>
            <legend className={styles.title}>Восстановление пароля</legend>
            <PasswordInput
              placeholder="Введите новый пароль"
              extraClass={styles.input}
              onChange={onChange}
              name={"password"}
              value={values.password}
              disabled={resetPasswordRequestSuccess}
            />
            <Input
              placeholder="Введите код из письма"
              type="text"
              extraClass={styles.input}
              onChange={onChange}
              name={"token"}
              value={values.token}
              disabled={resetPasswordRequestSuccess}
            />
            <Button
              htmlType="submit"
              type="primary"
              size={resetPasswordRequestSuccess ? "large" : "medium"}
              extraClass={styles.button}
            >
              {resetPasswordRequestSuccess
                ? "Войти"
                : resetPasswordRequest
                ? "Загрузка..."
                : "Сохранить"}
            </Button>
          </fieldset>
        </form>
        {resetPasswordRequestSuccess ? (
          <p className={`${styles.text} ${styles.text_success}`}>
            Пароль успешно изменен.
          </p>
        ) : (
          <p className={styles.text}>
            Вспомнили пароль?{" "}
            <Link to={{ pathname: "/login" }} className={styles.link}>
              Войти
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
