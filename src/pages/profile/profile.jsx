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
import { UPDATE_TOKEN_INITIAL_STATE } from "../../services/actions/userAction";
// import { getCookie } from "../../utils/utils";

export default function Profile() {
  const [value, setValue] = React.useState({
    password: { changed: false, value: "" },
    email: { changed: false, value: "" },
    name: { changed: false, value: "" },
  });
  const [updatingUserData, setUpdatingUserData] = React.useState(false);
  const [updatedFields, setUpdatedFields] = React.useState({});
  const [changed, setChanged] = React.useState(false);
  const dispatch = useDispatch();
  const {
    user,
    editableDataRequestFailed,
    editableUser,
    updateUserDataRequestFailed,
    updateUserDataRequest,
    updateUserDataSuccess,
    updateTokenRequestSuccess,
    editableDataRequestSuccess,
  } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    if (editableUser && !updatingUserData) {
      setValue({
        password: { ...value.password, value: "password" },
        email: { ...value.email, value: editableUser.user.email },
        name: { ...value.name, value: editableUser.user.name },
      });
    }

    if (updateUserDataSuccess && updatingUserData) {
      setUpdatingUserData(false);
    }

    if (
      !editableUser &&
      (!editableDataRequestFailed || updateTokenRequestSuccess)
    ) {
      dispatch(getUserDataAction(user.accessToken));
    }

    if (
      !updateUserDataSuccess &&
      updatingUserData &&
      updateTokenRequestSuccess
    ) {
      dispatch(updateUserDataAction(updatedFields, user.accessToken));
    }

    if (
      updateTokenRequestSuccess &&
      (updateUserDataSuccess || !editableDataRequestFailed)
    ) {
      dispatch({ type: UPDATE_TOKEN_INITIAL_STATE });
    }

    if (
      (editableDataRequestFailed || updateUserDataRequestFailed) &&
      !updateTokenRequestSuccess
    ) {
      dispatch(
        updateAccessTokenAction(
          JSON.parse(sessionStorage.getItem("user")).refreshToken
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    editableDataRequestSuccess,
    updateTokenRequestSuccess,
    editableDataRequestFailed,
    updateUserDataRequestFailed,
    updatingUserData,
  ]);

  const editUserData = (e) => {
    e.preventDefault();
    const updatedFieldsTempObj = {};
    for (const [field, fieldValue] of Object.entries(value)) {
      if (fieldValue.changed) {
        updatedFieldsTempObj[field] = fieldValue.value;
      }
    }

    dispatch(updateUserDataAction(updatedFieldsTempObj, user.accessToken));
    setUpdatedFields(updatedFieldsTempObj);
    setUpdatingUserData(true);
    setChanged(false);

    return false;
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    setChanged(false);
    setValue({
      password: { ...value.password, value: "password" },
      email: { ...value.email, value: editableUser.user.email },
      name: { ...value.name, value: editableUser.user.name },
    });
  };

  const onChange = (e) => {
    if (!changed) {
      setChanged(true);
    }
    setValue({
      ...value,
      [e.target.name]: { changed: true, value: e.target.value },
    });
  };
  return (
    <form onSubmit={editUserData}>
      <Input
        type="text"
        placeholder="Имя"
        onChange={onChange}
        value={editableUser ? value.name.value : "Загрузка..."}
        icon="EditIcon"
        name={"name"}
        extraClass={styles.item}
        disabled={!editableUser}
      />

      <EmailInput
        onChange={onChange}
        value={editableUser ? value.email.value : "Загрузка..."}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass={styles.item}
        disabled={!editableUser}
      />

      <PasswordInput
        placeholder="Пароль"
        onChange={onChange}
        value={editableUser ? value.password.value : "Загрузка..."}
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
