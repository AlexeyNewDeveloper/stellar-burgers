import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PopupForPlaceOrder from "../popup-for-place-order/popup-for-place-order";

export default function BurgerConstructor(props) {
  const [openPopupForPlaceOrder, setOpenPopupForPlaceOrder] =
    React.useState(false);

  const openPopup = () => {
    this.setOpenPopupForPlaceOrder(true);
  };

  const closePopup = () => {
    this.setOpenPopupForPlaceOrder(false);
  };

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <ul className={`${styles.items}`}>
        <li className={`${styles.item} pl-8 mb-4 mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={1255}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </li>
        <ul className={`${styles.items} ${styles["changing-ingredients"]}`}>
          <li
            className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
          >
            <div className={`${styles["drag-icon"]}`}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text="Соус традиционный галактический"
              price={15}
              thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
            />
          </li>

          <li
            className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
          >
            <div className={`${styles["drag-icon"]}`}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text="Мясо бессмертных моллюсков Protostomia"
              price={1337}
              thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
            />
          </li>
          <li
            className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
          >
            <div className={`${styles["drag-icon"]}`}>
              <DragIcon type="primary" />
            </div>

            <ConstructorElement
              text="Плоды Фалленианского дерева"
              price={874}
              thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
            />
          </li>
          <li
            className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
          >
            <div className={`${styles["drag-icon"]}`}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              price={300}
              thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
            />
          </li>

          <li
            className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
          >
            <div className={`${styles["drag-icon"]}`}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              price={300}
              thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
            />
          </li>
        </ul>
        <li className={`${styles.item} pl-8 mr-4 mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={1255}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </li>
      </ul>
      <div className={`${styles["place-order"]} mt-10`}>
        <div className={`${styles["price-area"]}`}>
          <span className={`${styles.total} text text_type_digits-medium mr-2`}>
            610
          </span>
          <div className={`${styles["icon-area"]}`}>
            <div className={`${styles.icon}`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className="ml-10 mr-4">
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={openPopup}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {openPopupForPlaceOrder ? (
        <PopupForPlaceOrder closePopupCallback={closePopup} />
      ) : (
        ""
      )}
    </section>
  );
}
