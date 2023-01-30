import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { MODAL_ROOT } from "../../utils/constants";
import { propTypesForItemDetailInfo } from "../../prop-types";
import { useDispatch } from "react-redux";
import {
  OPEN_POPUP,
  CLOSE_POPUP,
} from "../../services/actions/popupDetailInfoAction";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserState } from "../../services/selectors/userStateSelectors";
import ModalComponent from "../modal-component/modal-component";

const withModal =
  ({
    WrappedComponent,
    DetailInfoComponent,
    // OverlayComponent = ModalOverlay,
    // ContainerComponent = Modal,
  }) =>
  (props) => {
    const { detailInfo, orderButton, ...otherProps } = props;
    const [openPopup, setOpenPopup] = React.useState(false);
    const { user } = useSelector(getUserState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openPopupCallback = () => {
      if (user || !orderButton) {
        setOpenPopup(true);
      } else {
        navigate("/login", { state: { from: "/" } });
      }
      // user ? setOpenPopup(true) : navigate("/login", { state: { from: "/" } });
      if (detailInfo) {
        dispatch({ type: OPEN_POPUP, modalData: detailInfo });
        // navigate(`/ingredients/${props.item["_id"]}`, {
        //   state: { backgroundLocation: location },
        // });
      }
    };

    const closePopupCallback = () => {
      setOpenPopup(false);
      if (detailInfo) {
        dispatch({ type: CLOSE_POPUP });
        navigate(-1);
        console.log("close");
      }
    };

    const modalRoutePath = orderButton ? "*" : "/ingredients/:id";

    return (
      <>
        <WrappedComponent {...otherProps} onClick={openPopupCallback}>
          {otherProps.children}
        </WrappedComponent>

        <>
          {openPopup && (
            <ModalComponent
            // closePopupCallback={closePopupCallback}
            >
              <DetailInfoComponent />
            </ModalComponent>
          )}
        </>
      </>
    );
  };

withModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.element.isRequired,
  ]).isRequired,
  detailInfo: propTypesForItemDetailInfo,
  orderButton: PropTypes.bool,
};

export default withModal;
