import React from "react";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsWrapper from "../ingredients-wrapper/ingredients-wrapper";
import TitleElement from "../title-element/title-element";

export default class BurgerIngredients extends React.Component {
    render() {
        return (
            <section className={`${styles.section} mr-10 pt-10 `}>
                <TitleElement
                    tag="h1"
                    className="mb-5"
                    text="Соберите бургер"
                />
                <Tabs />
                <div className={`${styles.ingredients}`}>
                    <TitleElement tag="h2" className="" text="Булки" />
                    <IngredientsWrapper data={this.props.data.bun} />

                    <TitleElement tag="h2" className="" text="Соусы" />
                    <IngredientsWrapper data={this.props.data.sauce} />

                    <TitleElement tag="h2" className="" text="Котлета" />
                    <IngredientsWrapper data={this.props.data.main} />
                </div>
            </section>
        );
    }
}
