import React from "react";
import PropTypes from "prop-types";
import styles from "./popup-for-ingredient-info.module.css";

export default class PopupForIngredientInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specifications: {
        calories: "Калории,ккал",
        proteins: "Белки, г",
        fat: "Жиры, г",
        carbohydrates: "Углеводы, г",
      },
    };
    this.refPopup = React.createRef();
  }

  _closePopupToKey = (evt) => {
    if (evt.key === "Escape") {
      this.props.closePopupCallback();
    }
  };

  _closePopupToOverlay = (evt) => {
    if (!evt.target.closest(`.${styles.container}`)) {
      this.props.closePopupCallback();
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this._closePopupToKey);
    this.refPopup.current.addEventListener("click", this._closePopupToOverlay);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this._closePopupToKey);
    this.refPopup.current.removeEventListener(
      "click",
      this._closePopupToOverlay
    );
  };

  render() {
    return (
      <div ref={this.refPopup} className={`${styles.popup}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.title_area}`}>
            <p className="text text_type_main-large">Детали ингредиента</p>
            <button
              type="button"
              className={`${styles.close}`}
              onClick={this.props.closePopupCallback}
            ></button>
          </div>
          <img
            src={this.props.data.image_large}
            alt={this.props.data.name}
            className={`${styles.image} mb-4`}
          />
          <p className="text text_type_main-medium mb-8">
            {this.props.data.name}
          </p>
          <ul className={`${styles.specifications}`}>
            {Object.keys(this.state.specifications).map((item, index) => {
              return (
                <li key={index} className={`${styles.parameter}`}>
                  <p className="text text_type_main-default text_color_inactive">
                    {this.state.specifications[item]}
                  </p>
                  <p className="text text_type_digits-default text_color_inactive">
                    {this.props.data[item]}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

PopupForIngredientInfo.propTypes = {
  data: PropTypes.object.isRequired,
  closePopupCallback: PropTypes.func.isRequired,
};
