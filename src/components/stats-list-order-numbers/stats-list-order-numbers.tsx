import styles from "./stats-list-order-numbers.module.css";
import { MAX_NUMBER_OF_ORDER_NUMBERS_IN_LIST } from "../../utils/constants";
import { IOrder } from "../../types";

interface IStatListOrderNumbers {
  orders: Array<IOrder>;
  orderStatusConst: string;
  extraClassContainer?: string;
}

const StatListOrderNumbers: React.FC<IStatListOrderNumbers> = ({
  orders,
  orderStatusConst,
  extraClassContainer,
}) => {
  const getTwoColumnsStyleForList = (status: string): string => {
    const arrayOfOrdersWithStatus = orders.filter((item) => {
      return item.status === status;
    });
    return arrayOfOrdersWithStatus.length > MAX_NUMBER_OF_ORDER_NUMBERS_IN_LIST
      ? styles.two_columns_for_list
      : "";
  };

  return (
    <ul
      className={`text text_type_digits-default ${styles.list_order_numbers} ${
        extraClassContainer ? extraClassContainer : ""
      } ${getTwoColumnsStyleForList(orderStatusConst)}`}
    >
      {orders.map(
        (item, index) =>
          item.status === orderStatusConst &&
          index < MAX_NUMBER_OF_ORDER_NUMBERS_IN_LIST && (
            <li key={index}>{item.number}</li>
          )
      )}
    </ul>
  );
};

export default StatListOrderNumbers;
