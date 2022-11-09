import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { modalRoot } from "../../utils/constants";
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

    return (
      <>
        <WrappedComponent {...props} onClick={openPopupCallback}>
          {props.children}
        </WrappedComponent>
        {openPopup &&
          ReactDOM.createPortal(
            <OverlayComponent onClick={closePopupCallback}>
              <ContainerComponent closePopup={closePopupCallback}>
                <DetailInfoComponent detailInfo={props.detailInfo} />
              </ContainerComponent>
            </OverlayComponent>,
            modalRoot
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
