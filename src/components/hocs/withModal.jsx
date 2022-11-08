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
    const [state, setState] = React.useState({
      openPopup: false,
    });

    React.useEffect(() => {
      document.addEventListener("keydown", closePopupToKey);
      return () => {
        document.addEventListener("keydown", closePopupToKey);
      };
    }, []);

    const openPopup = () => {
      setState({ ...state, openPopup: true });
    };

    const closePopup = () => {
      setState({ ...state, openPopup: false });
    };

    const closePopupToKey = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };

    return (
      <>
        <WrappedComponent {...props} onClick={openPopup}>
          {props.children}
        </WrappedComponent>
        {state.openPopup &&
          ReactDOM.createPortal(
            <OverlayComponent onClick={closePopup}>
              <ContainerComponent onClick={closePopup}>
                <DetailInfoComponent detailInfo={props.detailInfo} />
              </ContainerComponent>
            </OverlayComponent>,
            modalRoot
          )}
      </>
    );
  };

export default withModal;
