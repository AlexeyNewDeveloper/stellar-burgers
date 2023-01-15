import styles from "./profile.module.css";
import React from "react";
import {
  PasswordInput,
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const [value, setValue] = React.useState({
    password: "",
    email: "",
    name: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <form>
      <Input
        type="text"
        placeholder="Имя"
        onChange={onChange}
        value={value.name}
        icon="EditIcon"
        name={"name"}
        extraClass={styles.item}
      />

      <EmailInput
        onChange={onChange}
        value={value.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass={styles.item}
      />

      <PasswordInput
        placeholder="Пароль"
        onChange={onChange}
        value={value.password}
        icon="EditIcon"
        name={"password"}
        extraClass={styles.item}
      />
      <div className={styles.button_container}>
        <Button
          htmlType="submit"
          type="secondary"
          size="medium"
          extraClass={styles.button_cancel}
        >
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
}
