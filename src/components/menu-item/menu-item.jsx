import React from "react";
import styles from "./menu-item.module.css";

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    toggle = (evt) => {
        evt.preventDefault();
        this.props.funcActiveTab(this.props.nameTab);
    };

    componentDidMount() {
        this.ref.current.addEventListener("click", this.toggle);
    }

    componentWillUnmount() {
        this.ref.current.removeEventListener("click", this.toggle);
    }

    render() {
        return (
            <a
                href="/"
                className={`${styles["item-link"]}  text text_type_main-default`}
                ref={this.ref}
            >
                <div className={`${styles.icons} mr-2`}>{this.props.icon}</div>
                <span
                    className={`${styles["border_dashed"]} ${
                        styles["item-text"]
                    } ${
                        this.props.activeTab ? styles["item-text-active"] : ""
                    }`}
                >
                    {this.props.text}
                </span>
            </a>
        );
    }
}
