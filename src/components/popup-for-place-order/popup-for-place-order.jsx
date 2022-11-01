import React from "react";
import styles from "./popup-for-place-order.module.css";

export default class PopupForPlaceOrder extends React.Component {
  render() {
    return (
      <div className={`${styles.popup}`}>
        <div className={`${styles.container}`}>
          <button
            type="button"
            className={`${styles.close}`}
            onClick={this.props.closePopupCallback}
          ></button>
          <p className="text text_type_digits-large mb-8">034536</p>
          <p className="text text_type_main-medium mb-15">
            Идентификатор заказа
          </p>
          <div className={`${styles.icon_complete} mb-15`}></div>
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    );
  }
}
