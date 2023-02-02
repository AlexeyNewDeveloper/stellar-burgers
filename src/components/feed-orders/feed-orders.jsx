import styles from "./feed-orders.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { wsInit } from "../../services/actions/wsAction";
import { getWsState } from "../../services/selectors/wsStateSelector";
import TotalComletedOrders from "../total-completed-orders/total-completed-orders";
import { ORDER_STATUS_DONE, ORDER_STATUS_AT_WORK } from "../../utils/constants";
import FeedOfOrdersComponent from "../feed-of-orders-component/feed-of-orders-component";
import StatListOrderNumbers from "../stats-list-order-numbers/stats-list-order-numbers";
import { getUserState } from "../../services/selectors/userStateSelectors";
import { getInitialStateForToken } from "../../services/actions/userAction";
import { wsConnectionClosed } from "../../services/actions/wsAction";

export const FeedOrdersContext = React.createContext(null);

export default function FeedOrders() {
  const dispatch = useDispatch();
  const { data, wsConnectedSuccess, wsError } = useSelector(getWsState);
  const { updateTokenRequestSuccess } = useSelector(getUserState);

  React.useEffect(() => {
    if (!wsConnectedSuccess) {
      dispatch(wsInit());
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   if (wsError) {
  //     dispatch(wsInit());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wsError]);

  // React.useEffect(() => {
  //   if (updateTokenRequestSuccess) {
  //     dispatch(wsInit());
  //     dispatch(getInitialStateForToken());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [updateTokenRequestSuccess]);

  return (
    <FeedOrdersContext.Provider value={data}>
      <section className={styles.section}>
        <h2 className={styles.title}>Лента заказов</h2>
        {data && (
          <div className={styles.content}>
            <FeedOfOrdersComponent
              orders={data.orders}
              extraClassContainer={`${styles.feed_orders_component}`}
            />
            <div className={styles.statistics}>
              <div
                className={`${styles.statistics_content_container} ${styles.order_numbers}`}
              >
                <div className={styles.order_numbers_content_container}>
                  <p className={styles.title_content}>Готовы:</p>
                  <StatListOrderNumbers
                    orders={data.orders}
                    orderStatusConst={ORDER_STATUS_DONE}
                    extraClassContainer={styles.ready_order_numbers}
                  />
                </div>
                <div className={styles.order_numbers_content_container}>
                  <p className={styles.title_content}>В работе:</p>
                  <StatListOrderNumbers
                    orders={data.orders}
                    orderStatusConst={ORDER_STATUS_AT_WORK}
                  />
                </div>
              </div>
              <TotalComletedOrders totalNumber={data.total} />
              <TotalComletedOrders todayNumber={data.totalToday} />
            </div>
          </div>
        )}
      </section>
    </FeedOrdersContext.Provider>
  );
}
