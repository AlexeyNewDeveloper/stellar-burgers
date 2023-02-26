import styles from "./helping-text.module.css";

interface IHelpingText {
  route: string;
}

const HelpingText: React.FC<IHelpingText> = ({ route }) => {
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
      return null;
  }
};

export default HelpingText;
