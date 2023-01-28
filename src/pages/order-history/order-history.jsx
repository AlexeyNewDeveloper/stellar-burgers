import styles from "./order-history.module.css";
import React from "react";
import FeedOfOrdersComponent from "../../components/feed-of-orders-component/feed-of-orders-component";
import { useSelector, useDispatch } from "react-redux";
import { getUserWsState } from "../../services/selectors/wsUserStateSelector";
import { wsUserInit } from "../../services/actions/wsUserAction";
import { updateAccessTokenAction } from "../../services/actions/userAction";
import { getUserState } from "../../services/selectors/userStateSelectors";
import { UPDATE_TOKEN_INITIAL_STATE } from "../../services/actions/userAction";

// import { getUserOrdersHistoryState } from "../../services/selectors/userStateSelectors";

export default function OrderHistory() {
  const dispatch = useDispatch();
  const {
    data,
    wsUserConnectedSuccess,
    wsUserConnected,
    wsUserErrorMessage,
    wsUserError,
  } = useSelector(getUserWsState);
  const { updateTokenRequestSuccess } = useSelector(getUserState);

  React.useEffect(() => {
    if (!wsUserConnected && !wsUserConnectedSuccess) {
      dispatch(wsUserInit());
    }

    if (wsUserError) {
      console.log(wsUserErrorMessage);
      dispatch(
        updateAccessTokenAction(
          JSON.parse(sessionStorage.getItem("user")).refreshToken
        )
      );
    }
    if (updateTokenRequestSuccess) {
      dispatch({ type: UPDATE_TOKEN_INITIAL_STATE });
    }
  }, [
    wsUserConnected,
    wsUserConnectedSuccess,
    updateTokenRequestSuccess,
    wsUserError,
  ]);
  return (
    <div className={styles.orders_container}>
      {data && data.orders && (
        <FeedOfOrdersComponent
          orders={data.orders.slice().reverse()}
          extraClassContainer={styles.orders_list}
          showStatus={true}
        />
      )}
    </div>
  );
}
