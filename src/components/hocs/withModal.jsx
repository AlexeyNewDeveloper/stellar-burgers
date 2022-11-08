import React from "react";
import ReactDOM from "react-dom";
import { modalRoot } from "../../utils/constants";

const withModal =
  ({
    WrappedComponent,
    OverlayComponent,
    ContainerComponent,
    DetailInfoComponent,
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
        <WrappedComponent {...props} onElementClick={openPopup} />
        {state.openPopup &&
          ReactDOM.createPortal(
            <OverlayComponent onElementClick={closePopup}>
              <ContainerComponent onElementClick={closePopup}>
                <DetailInfoComponent detailInfo={props.detailInfo} />
              </ContainerComponent>
            </OverlayComponent>,
            modalRoot
          )}
      </>
    );
  };

export default withModal;
