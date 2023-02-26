import styles from "./total-completed-orders.module.css";

interface ITotalComletedOrders {
  totalNumber?: number;
  todayNumber?: number;
}

const TotalComletedOrders: React.FC<ITotalComletedOrders> = ({
  totalNumber,
  todayNumber,
}) => {
  const formattedNumber = (number: number) => {
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
    return null;
  }
};

export default TotalComletedOrders;
