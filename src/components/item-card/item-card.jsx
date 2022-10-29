import React from "react";
import styles from "./item-card.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class ItemCard extends React.Component {
    render() {
        return (
            <>
                {this.props.item["_id"] === "60666c42cc7b410027a1a9b1" ? (
                    <div className={`${styles.counter}`}>
                        <Counter count={1} size="default" />
                    </div>
                ) : (
                    ""
                )}
                <img
                    src={this.props.item.image}
                    alt={this.props.item.name}
                    className={`${styles.image} ml-4 mr-4 mb-1`}
                />
                <div className={`${styles.cost} mb-1`}>
                    <span
                        className={`${styles.priceNumber} text text_type_digits-default`}
                    >
                        {this.props.item.price}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <p
                    className={`${styles.description} text text_type_main-small`}
                >
                    {this.props.item.name}
                </p>
            </>
        );
    }
}
