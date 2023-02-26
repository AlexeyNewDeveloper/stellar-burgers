import React from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getOpenPopupAction } from "../../services/actions/popupDetailInfoAction";
import { useNavigate } from "react-router-dom";
import { getUserState } from "../../services/selectors/userStateSelectors";
import ModalComponent from "../modal-component/modal-component";
import { IIngredient } from "../../types";

interface IwithModalAnonimFunc {
  [name: string]: any;
  detailInfo?: IIngredient;
  orderButton?: boolean;
}

interface IWrappedComponents {
  WrappedComponent: React.FC<any>;
  DetailInfoComponent: React.FC<any>;
}

interface IwithModal<T, K> {
  ({ ...args }: T): React.FC<K>;
}

const withModal: IwithModal<IWrappedComponents, IwithModalAnonimFunc> =
  ({ WrappedComponent, DetailInfoComponent }) =>
  (props) => {
    const { detailInfo, orderButton, ...otherProps } = props;
    const [openPopup, setOpenPopup] = React.useState(false);
    const { user } = useSelector(getUserState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openPopupCallback = (e: React.SyntheticEvent): void => {
      if (user || !orderButton) {
        setOpenPopup(true);
      } else {
        navigate("/login", { state: { from: "/" } });
      }
      if (detailInfo) {
        dispatch(getOpenPopupAction(detailInfo));
      }
    };

    return (
      <>
        <WrappedComponent {...otherProps} onClick={openPopupCallback}>
          {otherProps.children}
        </WrappedComponent>

        <>
          {openPopup && (
            <ModalComponent>
              <DetailInfoComponent />
            </ModalComponent>
          )}
        </>
      </>
    );
  };

export default withModal;
