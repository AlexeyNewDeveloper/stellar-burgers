import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { MODAL_ROOT } from "../../utils/constants";
import { propTypesForItemDetailInfo } from "../../prop-types";
import { useDispatch } from "react-redux";
import { OPEN_POPUP, CLOSE_POPUP } from "../../services/actions/actions";

const withModal =
  ({
    WrappedComponent,
    DetailInfoComponent,
    OverlayComponent = ModalOverlay,
    ContainerComponent = Modal,
  }) =>
  (props) => {
    const { detailInfo, ...otherProps } = props;
    const [openPopup, setOpenPopup] = React.useState(false);
    const dispatch = useDispatch();

    const openPopupCallback = () => {
      setOpenPopup(true);
      if (detailInfo) {
        dispatch({ type: OPEN_POPUP, ingredient: detailInfo });
      }
    };

    const closePopupCallback = () => {
      setOpenPopup(false);
      if (detailInfo) {
        dispatch({ type: CLOSE_POPUP });
      }
    };

    return (
      <>
        <WrappedComponent {...otherProps} onClick={openPopupCallback}>
          {otherProps.children}
        </WrappedComponent>
        {openPopup &&
          ReactDOM.createPortal(
            <OverlayComponent onClick={closePopupCallback}>
              <ContainerComponent closePopup={closePopupCallback}>
                <DetailInfoComponent detailInfo={detailInfo} />
              </ContainerComponent>
            </OverlayComponent>,
            MODAL_ROOT
          )}
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
};

export default withModal;
