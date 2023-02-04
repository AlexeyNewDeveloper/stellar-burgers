import styles from "./helping-text.module.css";
import PropTypes from "prop-types";

export default function HelpingText({ route }) {
  switch (route) {
    case "/profile":
      return (
        <p className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      );
    case "/profile/orders":
      return (
        <p className={styles.text}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      );
    default:
      return;
  }
}

HelpingText.propTypes = {
  route: PropTypes.string.isRequired,
};
