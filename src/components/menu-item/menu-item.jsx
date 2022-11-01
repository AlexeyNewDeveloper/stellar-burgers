import React from "react";
import PropTypes from "prop-types";
import styles from "./menu-item.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      menuIcons: {
        account: <ProfileIcon type="secondary" />,
        constructor: <BurgerIcon type="primary" />,
        orderFeed: <ListIcon type="secondary" />,
      },
    };
  }

  // makeActiveTab = (evt) => {
  //     evt.preventDefault();

  //     console.log({
  //         ...this.state,
  //         menuIcons: { ...this.state.menuIcons, account: "jjj" },
  //     });
  //     this.setState({ ...this.state, active: true });
  // };

  // componentDidMount() {
  //     this.ref.current.addEventListener("click", this.makeActiveTab);
  // }

  // componentWillUnmount() {
  //     this.ref.current.removeEventListener("click", this.makeActiveTab);
  // }

  render() {
    return (
      <a
        href="/"
        className={`${styles["item-link"]}  text text_type_main-default`}
        ref={this.ref}
      >
        <div className={`${styles.icons} mr-2`}>
          {this.state.menuIcons[this.props.nameTab]}
        </div>
        <span className={`${styles["border_dashed"]} ${styles["item-text"]}`}>
          {this.props.text}
        </span>
      </a>
    );
  }
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  nameTab: PropTypes.string.isRequired,
};
