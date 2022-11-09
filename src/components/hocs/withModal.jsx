import React from "react";
import ReactDOM from "react-dom";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { modalRoot } from "../../utils/constants";

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

export default withModal;
