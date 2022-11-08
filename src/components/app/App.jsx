import React from "react";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import styles from "./app.module.css";
import { urlForGetData } from "../../utils/constants";

function App() {
  const [state, setState] = React.useState({
    data: null,
    hasError: false,
    isLoading: false,
  });

  React.useEffect(() => {
    if (!state.data) {
      getData();
    }
  }, [state.data]);

  async function getData() {
    setState({ ...state, isLoading: true });
    fetch(urlForGetData)
      .then((res) => res.json())
      .then((data) => {
        setState({ ...state, data: data, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, hasError: true });
      });
  }

  const { isLoading, hasError } = state;
  return (
    <div className={styles.page}>
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      <AppHeader />
      {!isLoading && !hasError && state.data && (
        <Content data={state.data.data} />
      )}
    </div>
  );
}

export default App;
