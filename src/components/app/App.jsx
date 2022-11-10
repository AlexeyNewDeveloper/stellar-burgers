import React from "react";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/burger-api";

function App() {
  const [state, setState] = React.useState({
    data: null,
    hasError: false,
    isLoading: false,
  });

  React.useEffect(() => {
    function getData() {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      getIngredients()
        .then((res) => {
          setState((prevState) => ({ ...prevState, data: res.data }));
        })
        .catch(() => {
          setState((prevState) => ({ ...prevState, hasError: true }));
        })
        .finally(() => {
          setState((prevState) => ({ ...prevState, isLoading: false }));
        });
    }

    getData();
  }, []);

  const { isLoading, hasError } = state;
  return (
    <div className={styles.page}>
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      <AppHeader />
      {state.data && <Content data={state.data} />}
    </div>
  );
}

export default App;
