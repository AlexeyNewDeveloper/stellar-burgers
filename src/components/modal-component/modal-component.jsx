import Modal from "../modal/modal";
import styles from "./modal-component.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { MODAL_ROOT } from "../../utils/constants";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CLOSE_POPUP } from "../../services/actions/popupDetailInfoAction";

export default function ModalComponent({ children }) {
  const [openPopup, setOpenPopup] = React.useState(true);
  const openPopupRef = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closePopupCallback = () => {
    setOpenPopup(false);
    dispatch({ type: CLOSE_POPUP });
    navigate(-1);
  };

  React.useEffect(() => {
    openPopupRef.current = true;
  }, []);

  return (
    <>
      {openPopup &&
        // !openPopupRef.current &&
        ReactDOM.createPortal(
          <div className={styles.z_index}>
            <ModalOverlay closePopup={closePopupCallback}>
              <Modal closePopup={closePopupCallback}>{children}</Modal>
            </ModalOverlay>
          </div>,
          MODAL_ROOT
        )}
    </>
  );
}
