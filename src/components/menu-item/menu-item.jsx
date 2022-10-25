import React from "react";
import styles from "./menu-item.module.css";

export default class MenuItem extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.ello = React.createRef();
    //     this.kerr = React.createRef();
    //     this.state = { active: false };
    // }

    // toggle = (evt) => {
    //     evt.preventDefault();
    //     this.setState({ active: !this.state.active });
    //     console.log(this.kerr.current.classList.value);
    //     console.log(this.state);
    // };
    // componentDidMount() {
    //     this.ello.current.addEventListener("click", this.toggle);
    // }

    // componentWillUnmount() {
    //     this.ello.current.removeEventListener("click", this.toggle);
    //     console.log("delete");
    // }

    render() {
        return (
            <a
                href="/"
                className={`${styles["item-link"]}  text text_type_main-default`}
                // ref={this.ello}
            >
                <div className={`${styles.icons} mr-2`}>{this.props.icon}</div>
                <span
                    className={`${styles["border_dashed"]} ${styles["item-text"]} `}
                    // ref={this.kerr}
                >
                    {this.props.text}
                </span>
            </a>
        );
    }
}
