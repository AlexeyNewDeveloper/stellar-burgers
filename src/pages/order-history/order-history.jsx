import styles from "./order-history.module.css";
import React from "react";
import FeedOfOrdersComponent from "../../components/feed-of-orders-component/feed-of-orders-component";
import { useSelector, useDispatch } from "react-redux";
import { getUserWsState } from "../../services/selectors/wsUserStateSelector";
import { wsUserInit } from "../../services/actions/wsUserAction";
import { updateAccessTokenAction } from "../../services/actions/userAction";
import { getUserState } from "../../services/selectors/userStateSelectors";
import { getInitialStateForToken } from "../../services/actions/userAction";
import Spinner from "../../components/spinner/spinner";

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { data, wsUserConnectedSuccess, wsUserError } =
    useSelector(getUserWsState);
  const { updateTokenRequestSuccess } = useSelector(getUserState);
  const wsConnecting = React.useRef(false);

  React.useEffect(() => {
    if (!wsUserConnectedSuccess && !wsConnecting.current) {
      dispatch(wsUserInit());
      wsConnecting.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (wsUserConnectedSuccess) {
      wsConnecting.current = false;
    }
  }, [wsUserConnectedSuccess]);

  React.useEffect(() => {
    if (wsUserError || (data && !data.orders)) {
      dispatch(
        updateAccessTokenAction(
          JSON.parse(localStorage.getItem("user")).refreshToken
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsUserError, data]);

  React.useEffect(() => {
    if (updateTokenRequestSuccess) {
      dispatch(wsUserInit());
      dispatch(getInitialStateForToken());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTokenRequestSuccess]);

  return (
    <div className={styles.orders_container}>
      {!data?.orders && <Spinner />}
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
