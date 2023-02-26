import styles from "./order-history.module.css";
import React from "react";
import FeedOfOrdersComponent from "../../components/feed-of-orders-component/feed-of-orders-component";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getUserWsState } from "../../services/selectors/wsUserStateSelector";
import { wsUserInit } from "../../services/actions/wsUserAction";
import Spinner from "../../components/spinner/spinner";
import { wsUserConnectionClosed } from "../../services/actions/wsUserAction";

const OrderHistory: React.FC = () => {
  const dispatch = useDispatch();
  const { data, wsConnectedSuccess } = useSelector(getUserWsState);
  // const { updateTokenRequestSuccess } = useSelector(getUserState);
  const wsConnecting = React.useRef(false);

  React.useEffect(() => {
    if (!wsConnectedSuccess && !wsConnecting.current) {
      dispatch(wsUserInit());
      wsConnecting.current = true;
    }
    return () => {
      dispatch(wsUserConnectionClosed());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (wsConnectedSuccess) {
      wsConnecting.current = false;
    }
  }, [wsConnectedSuccess]);

  // React.useEffect(() => {
  //   if (wsUserError || (data && !data.orders)) {
  //     dispatch(
  //       updateAccessTokenAction(
  //         JSON.parse(localStorage.getItem("user")).refreshToken
  //       )
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wsUserError, data]);

  // React.useEffect(() => {
  //   if (updateTokenRequestSuccess) {
  //     dispatch(wsUserInit());
  //     dispatch(getInitialStateForToken());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [updateTokenRequestSuccess]);

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
};

export default OrderHistory;
