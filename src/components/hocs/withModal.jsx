import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { MODAL_ROOT } from "../../utils/constants";
import { propTypesForItemDetailInfo } from "../../prop-types";

const withModal =
  ({
    WrappedComponent,
    DetailInfoComponent,
    OverlayComponent = ModalOverlay,
    ContainerComponent = Modal,
  }) =>
  (props) => {
    const [openPopup, setOpenPopup] = React.useState(false);

    const openPopupCallback = () => {
      setOpenPopup(true);
    };

    const closePopupCallback = () => {
      setOpenPopup(false);
    };

    const { detailInfo, orderObject, ...otherProps } = props;

    return (
      <>
        <WrappedComponent {...otherProps} onClick={openPopupCallback}>
          {otherProps.children}
        </WrappedComponent>
        {openPopup &&
          ReactDOM.createPortal(
            <OverlayComponent onClick={closePopupCallback}>
              <ContainerComponent closePopup={closePopupCallback}>
                <DetailInfoComponent
                  detailInfo={detailInfo}
                  orderObject={orderObject}
                />
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
