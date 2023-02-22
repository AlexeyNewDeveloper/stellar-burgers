import styles from "./forgot-password.module.css";
import React from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { forgotPasswordAction } from "../../services/actions/forgotPasswordAction";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getForgotPasswordState } from "../../services/selectors/forgotPasswordStateSelector";

const ForgotPassword: React.FC = () => {
  const [value, setValue] = React.useState({ email: "" });
  const [redirect, setRedirect] = React.useState(false);
  const dispatch = useDispatch();
  const { forgotPasswordRequest, forgotPasswordRequestSuccess } = useSelector(
    getForgotPasswordState
  );

  React.useEffect(() => {
    if (forgotPasswordRequestSuccess) {
      setTimeout(() => {
        setRedirect(true);
      }, 5000);
    }
  }, [forgotPasswordRequestSuccess]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const getNewPassword = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    dispatch(forgotPasswordAction(value.email));
    return false;
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {forgotPasswordRequestSuccess ? (
          <div className={styles.container_success}>
            <p className={styles.text_redirect}>
              Через 5 секунд вы будете перенаправлены на страницу сброса пароля.
              Код для сброса пароля отправлен на{" "}
              <span className={styles.email_redirect}>{value.email}</span>
              {redirect && <Navigate to="/reset-password" replace={true} />}
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={getNewPassword}>
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
                  {forgotPasswordRequest ? "Загрузка..." : "Восстановить"}
                </Button>
              </fieldset>
            </form>
            <p className={styles.text}>
              Вспомнили пароль?{" "}
              <Link to={{ pathname: "/login" }} className={styles.link}>
                Войти
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
