import styles from "./profile.module.css";
import React from "react";
import {
  PasswordInput,
  Input,
  EmailInput,
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
    <>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={onChange}
            value={value.name}
            icon="EditIcon"
            name={"name"}
          />
        </li>
        <li className={styles.item}>
          <EmailInput
            onChange={onChange}
            value={value.email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
          />
        </li>
        <li className={styles.item}>
          <PasswordInput
            placeholder="Пароль"
            onChange={onChange}
            value={value.password}
            icon="EditIcon"
            name={"password"}
          />
        </li>
      </ul>
    </>
  );
}
