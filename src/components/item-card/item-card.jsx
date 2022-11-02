import React from "react";
import PropTypes from "prop-types";
import styles from "./item-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PopupForIngredientInfo from "../popup-for-ingredient-info/popup-for-ingredient-info";

export default class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openPopupForIngredientInfo: false };
    this.refItemCard = React.createRef();
  }

  openPopupForDetail = () => {
    this.setState({ ...this.state, openPopupForIngredientInfo: true });
  };

  closePopupForDetail = () => {
    this.setState({ ...this.state, openPopupForIngredientInfo: false });
  };

  componentDidMount = () => {
    this.refItemCard.current.addEventListener("click", this.openPopupForDetail);
  };

  componentWillUnmount = () => {
    this.refItemCard.current.removeEventListener(
      "click",
      this.openPopupForDetail
    );
  };

  render() {
    return (
      <React.Fragment>
        <div ref={this.refItemCard} className={`${styles.item}`}>
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
          <p className={`${styles.description} text text_type_main-small`}>
            {this.props.item.name}
          </p>
        </div>
        {this.state.openPopupForIngredientInfo ? (
          <PopupForIngredientInfo
            data={this.props.detailDataForPopup}
            closePopupCallback={this.closePopupForDetail}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  detailDataForPopup: PropTypes.object.isRequired,
};
