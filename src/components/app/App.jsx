import React from "react";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import styles from "./app.module.css";
import { urlForGetData } from "../../utils/constants";
import { checkReponse } from "../../utils/utils";

function App() {
  const [state, setState] = React.useState({
    data: null,
    hasError: false,
    isLoading: false,
  });

  // React.useEffect(() => {
  //   async function getData() {
  //     setState({ ...state, isLoading: true });
  //     fetch(urlForGetData)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setState({ ...state, data: data, isLoading: false });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setState({ ...state, hasError: true });
  //       });
  //   }
  //   if (!state.data) {
  //     getData();
  //   }
  // }, [state.data]);
  React.useEffect(() => {
    function getData() {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      fetch(urlForGetData)
        .then(checkReponse)
        .then((res) => {
          setState((prevState) => ({ ...prevState, data: res.data }));
        })
        .catch((error) => {
          console.log(error);
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
      {!isLoading && !hasError && state.data && <Content data={state.data} />}
    </div>
  );
}

export default App;
