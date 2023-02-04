import styles from "./profile.module.css";
import React from "react";
import {
  PasswordInput,
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDataAction,
  updateAccessTokenAction,
  updateUserDataAction,
} from "../../services/actions/userAction";
import { getUserState } from "../../services/selectors/userStateSelectors";
import { getInitialStateForToken } from "../../services/actions/userAction";
import { useForm } from "../../hooks/useForm";

export default function Profile() {
  const { values, changed, handleChange, setValues, setChanged } = useForm({
    password: { changed: false, value: "" },
    email: { changed: false, value: "" },
    name: { changed: false, value: "" },
  });
  const [updatedFields, setUpdatedFields] = React.useState({});
  const gettingtUser = React.useRef(false);
  const dispatch = useDispatch();
  const {
    user,
    editableDataRequestFailed,
    editableUser,
    updateUserDataRequestFailed,
    updateUserDataRequest,
    updateTokenRequestSuccess,
    editableDataRequestSuccess,
  } = useSelector(getUserState);

  React.useEffect(() => {
    if (!editableDataRequestSuccess && !editableUser && !gettingtUser.current) {
      dispatch(getUserDataAction(user.accessToken));
      gettingtUser.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (editableDataRequestFailed || updateUserDataRequestFailed) {
      dispatch(
        updateAccessTokenAction(
          JSON.parse(localStorage.getItem("user")).refreshToken
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableDataRequestFailed, updateUserDataRequestFailed]);

  React.useEffect(() => {
    if (updateTokenRequestSuccess) {
      if (editableDataRequestFailed) {
        dispatch(getUserDataAction(user.accessToken));
      }
      if (updateUserDataRequestFailed) {
        dispatch(updateUserDataAction(updatedFields, user.accessToken));
      }

      dispatch(getInitialStateForToken());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTokenRequestSuccess]);

  React.useEffect(() => {
    if (editableUser) {
      setValues({
        password: { ...values.password, value: "password" },
        email: { ...values.email, value: editableUser.user.email },
        name: { ...values.name, value: editableUser.user.name },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableUser]);

  const editUserData = (e) => {
    e.preventDefault();
    const updatedFieldsTempObj = {};
    for (const [field, fieldValue] of Object.entries(values)) {
      if (fieldValue.changed) {
        updatedFieldsTempObj[field] = fieldValue.value;
      }
    }
    dispatch(updateUserDataAction(updatedFieldsTempObj, user.accessToken));
    setUpdatedFields(updatedFieldsTempObj);
    setChanged(false);

    return false;
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    setChanged(false);
    setValues({
      password: { ...values.password, value: "password" },
      email: { ...values.email, value: editableUser.user.email },
      name: { ...values.name, value: editableUser.user.name },
    });
  };

  return (
    <form onSubmit={editUserData} className={styles.form}>
      <Input
        type="text"
        placeholder="Имя"
        onChange={handleChange}
        value={editableUser ? values.name.value : "Загрузка..."}
        icon="EditIcon"
        name={"name"}
        extraClass={styles.item}
        disabled={!editableUser}
      />

      <EmailInput
        onChange={handleChange}
        value={editableUser ? values.email.value : "Загрузка..."}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass={styles.item}
        disabled={!editableUser}
      />

      <PasswordInput
        placeholder="Пароль"
        onChange={handleChange}
        value={editableUser ? values.password.value : "Загрузка..."}
        icon="EditIcon"
        name={"password"}
        extraClass={styles.item}
        disabled={!editableUser}
      />
      <div className={styles.button_container}>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={styles.button_cancel}
          disabled={!editableUser || !changed}
          onClick={cancelChanges}
        >
          Отмена
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!editableUser || !changed}
        >
          {updateUserDataRequest ? "Сохраняю..." : "Сохранить"}
        </Button>
      </div>
    </form>
  );
}
