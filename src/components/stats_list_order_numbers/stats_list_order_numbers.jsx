import styles from "./stats_list_order_numbers.module.css";
import PropTypes from "prop-types";
import { MAX_NUMBER_OF_ORDER_NUMBERS_IN_LIST } from "../../utils/constants";

export default function StatListOrderNumbers({
  orders,
  orderStatusConst,
  extraClassContainer,
}) {
  const getTwoColumnsStyleForList = (status) => {
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
}

StatListOrderNumbers.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  orderStatusConst: PropTypes.string.isRequired,
  extraClassContainer: PropTypes.string,
};
