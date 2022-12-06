import React from "react";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <Content />
    </div>
  );
}

// function App() {
//   const [state, setState] = React.useState({
//     data: null,
//     hasError: false,
//     isLoading: false,
//   });

//   React.useEffect(() => {
//     function getData() {
//       setState((prevState) => ({ ...prevState, isLoading: true }));
//       getIngredients()
//         .then((res) => {
//           setState((prevState) => ({ ...prevState, data: res.data }));
//         })
//         .catch(() => {
//           setState((prevState) => ({ ...prevState, hasError: true }));
//         })
//         .finally(() => {
//           setState((prevState) => ({ ...prevState, isLoading: false }));
//         });
//     }

//     getData();
//   }, []);

//   const { isLoading, hasError } = state;
//   return (
//     <Provider store={store}>
//       <div className={styles.page}>
//         {isLoading && "Загрузка..."}
//         {hasError && "Произошла ошибка"}
//         <AppHeader />
//         {state.data && <Content data={state.data} />}
//       </div>
//     </Provider>
//   );
// }

export default App;
