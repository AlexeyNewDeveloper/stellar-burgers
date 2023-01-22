import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import withModal from "../hocs/withModal";
import OrderDetails from "../order-details/order-details";
import ConstructorArea from "../constructor-area/constructor-area";
import { useSelector } from "react-redux";
import { calcTotalPrice } from "../../utils/utils";
import { getBurgerConstructorTargetState } from "../../services/selectors/burgerConstructorTargetStateSelector";

const PlaceOrderButton = withModal({
  WrappedComponent: Button,
  DetailInfoComponent: OrderDetails,
});

export default function BurgerConstructor() {
  const { ingredients, bun } = useSelector(getBurgerConstructorTargetState);

  const totalPrice = calcTotalPrice(ingredients, bun);

  // useMemo работает с задержкой

  // const totalPrice = React.useMemo(
  //   () => calcTotalPrice(ingredients, bun),
  //   [ingredients, bun]
  // );

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <ConstructorArea />
      <div className={`${styles["place-order"]} mt-10`}>
        <div className={`${styles["price-area"]}`}>
          <span className={`text text_type_digits-medium mr-2`}>
            {totalPrice}
          </span>
          <div className={`${styles["icon-area"]}`}>
            <div className={`${styles.icon}`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className="ml-10 mr-4">
          <PlaceOrderButton
            type="primary"
            size="large"
            htmlType="button"
            disabled={!totalPrice || !bun}
            orderButton={true}
          >
            Оформить заказ
          </PlaceOrderButton>
        </div>
      </div>
    </section>
  );
}
