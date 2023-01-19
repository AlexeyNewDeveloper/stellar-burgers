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
import { Route, Routes, useNavigate } from "react-router-dom";
import IngredientDetails from "../ingredients-detail/ingredients-detail";

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
    const navigate = useNavigate();

    const openPopupCallback = () => {
      setOpenPopup(true);
      if (detailInfo) {
        dispatch({ type: OPEN_POPUP, modalData: detailInfo });
        navigate(`/ingredients/${props.item["_id"]}`);
      }
    };

    const closePopupCallback = () => {
      setOpenPopup(false);
      if (detailInfo) {
        dispatch({ type: CLOSE_POPUP });
        navigate(-1);
      }
    };

    return (
      <>
        <WrappedComponent {...otherProps} onClick={openPopupCallback}>
          {otherProps.children}
        </WrappedComponent>
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <>
                {openPopup &&
                  ReactDOM.createPortal(
                    <OverlayComponent onClick={closePopupCallback}>
                      <ContainerComponent closePopup={closePopupCallback}>
                        <DetailInfoComponent />
                      </ContainerComponent>
                    </OverlayComponent>,
                    MODAL_ROOT
                  )}
              </>
            }
          />
        </Routes>
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
