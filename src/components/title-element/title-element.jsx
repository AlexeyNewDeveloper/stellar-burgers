import React from "react";
import styles from "./title-element.module.css";

export default class TitleElement extends React.Component {
    render() {
        if (this.props.tag === "h1") {
            return (
                <h1
                    className={`${styles.title} text text_type_main-medium ${this.props.className} mb-5`}
                >
                    {this.props.text}
                </h1>
            );
        } else if (this.props.tag === "h2") {
            return (
                <h2
                    className={`${styles.subtitle} text text_type_main-medium ${this.props.className}`}
                >
                    {this.props.text}
                </h2>
            );
        }
    }
}
