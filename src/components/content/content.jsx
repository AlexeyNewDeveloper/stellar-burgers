import React from "react";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ListOrder from "../list-order/list-order";

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { bun: [], main: [], sauce: [] },
        };
    }

    getDataForContent = () => {
        const arrayData = { bun: [], main: [], sauce: [] };
        this.props.data.forEach((item) => {
            const { _id, name, type, price, image } = item;
            if (type === "bun") {
                arrayData.bun.push({ _id, name, type, price, image });
            } else if (type === "main") {
                arrayData.main.push({ _id, name, type, price, image });
            } else if (type === "sauce") {
                arrayData.sauce.push({ _id, name, type, price, image });
            }
        });
        this.setState({ data: arrayData });
    };

    componentDidMount() {
        this.getDataForContent();
    }

    render() {
        return (
            <main className={styles.main}>
                <BurgerIngredients data={this.state.data} />
                <ListOrder data={this.state.data} />
            </main>
        );
    }
}
