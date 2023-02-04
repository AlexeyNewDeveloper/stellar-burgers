import styles from "./total-completed-orders.module.css";
import PropTypes from "prop-types";

export default function TotalComletedOrders({ totalNumber, todayNumber }) {
  const formattedNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  if (totalNumber) {
    return (
      <div className={`${styles.statistics_content_container}`}>
        <p className={styles.title_content}>Выполнено за все время:</p>
        <p className="text text_type_digits-large">
          {formattedNumber(totalNumber)}
        </p>
      </div>
    );
  } else if (todayNumber) {
    return (
      <div className={`${styles.statistics_content_container}`}>
        <p className={styles.title_content}>Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">
          {formattedNumber(todayNumber)}
        </p>
      </div>
    );
  } else {
    return false;
  }
}

TotalComletedOrders.propTypes = {
  totalNumber: PropTypes.number,
  todayNumber: PropTypes.number,
};
