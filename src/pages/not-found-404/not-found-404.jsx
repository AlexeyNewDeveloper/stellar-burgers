import styles from "./not-found-404.module.css";
import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>

        <p className={styles.text}>
          Страница не найдена{" "}
          <Link to={{ pathname: "/login" }} className={styles.link}>
            Вернутся на главную
          </Link>
        </p>
      </div>
    </section>
  );
}
