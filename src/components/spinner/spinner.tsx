import React from "react";
import styles from "./spinner.module.css";

const Spinner: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <g>
          <line
            x1="59.9833"
            y1="140.333"
            x2="219.978"
            y2="139"
            stroke="#000"
            strokeWidth="4"
          />
          <circle cx="60" cy="140" r="5" fill="#4C4CFF" />
          <circle cx="220" cy="139" r="5" fill="#4C4CFF" />
        </g>
        <path
          className={styles.circle}
          d="M109.957 122.655L140 105.309L170.043 122.655V157.345L140 174.691L109.957 157.345V122.655Z"
          stroke="#000"
          strokeWidth="4"
        />
        <circle
          className={styles.circle}
          cx="140"
          cy="140"
          r="13"
          stroke="#4C4CFF"
          strokeWidth="4"
        />
        <circle
          className={styles.circle}
          cx="110"
          cy="192"
          r="13"
          stroke="white"
          strokeWidth="4"
        />
        <circle
          className={`${styles.circle} ${styles.circle_s}`}
          cx="85"
          cy="232"
          r="8"
          stroke="#00CCCC"
          strokeWidth="4"
        />
        <circle
          className={styles.circle}
          cx="170"
          cy="88"
          r="13"
          stroke="#4C4CFF"
          strokeWidth="4"
        />
        <circle
          className={`${styles.circle} ${styles.circle_s}`}
          cx="110"
          cy="192"
          r="5"
          fill="white"
        />
        <circle
          className={`${styles.circle} ${styles.circle_s}`}
          cx="185"
          cy="61"
          r="5"
          fill="#E33CD5"
        />
      </svg>
    </div>
  );
};

export default Spinner;
