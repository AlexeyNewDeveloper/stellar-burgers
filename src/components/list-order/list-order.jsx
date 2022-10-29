import React from "react";
import styles from "./list-order.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PlaceOrder from "../place-order/place-order";

export default class ListOrder extends React.Component {
    render() {
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
                    <ul
                        className={`${styles.items} ${styles["changing-ingredients"]}`}
                    >
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
                <PlaceOrder />
            </section>
        );
    }
}
