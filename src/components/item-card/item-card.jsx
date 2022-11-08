import React from "react";
import PropTypes from "prop-types";
import styles from "./item-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredients-detail/ingredients-detail";
// import withModal from "../hocs/withModal";
// import ModalOverlay from "../modal-overlay/modal-overlay";

// const WithModalIngredientDetails = withModal({
//   WrappedComponent: IngredientDetails,
//   OverlayComponent: ModalOverlay,
// });

function ItemCard({ item, onElementClick }) {
  // const [state, setState] = React.useState({
  //   openPopupForIngredientInfo: false,
  // });
  // const refItemCard = React.useRef();

  // React.useEffect(() => {
  //   refItemCard.current.addEventListener("click", openPopupForDetail);
  //   return () => {
  //     refItemCard.current.removeEventListener("click", openPopupForDetail);
  //   };
  // }, []);

  // const openPopupForDetail = () => {
  //   setState({ ...state, openPopupForIngredientInfo: true });
  // };

  // const closePopupForDetail = () => {
  //   setState({ ...state, openPopupForIngredientInfo: false });
  // };

  return (
    <React.Fragment>
      <div className={`${styles.item}`} onClick={onElementClick}>
        {item["_id"] === "60666c42cc7b410027a1a9b1" ? (
          <div className={`${styles.counter}`}>
            <Counter count={1} size="default" />
          </div>
        ) : (
          ""
        )}
        <img
          src={item.image}
          alt={item.name}
          className={`${styles.image} ml-4 mr-4 mb-1`}
        />
        <div className={`${styles.cost} mb-1`}>
          <span
            className={`${styles.priceNumber} text text_type_digits-default`}
          >
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.description} text text_type_main-small`}>
          {item.name}
        </p>
      </div>
    </React.Fragment>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
