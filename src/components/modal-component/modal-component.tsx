import Modal from "../modal/modal";
import styles from "./modal-component.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { MODAL_ROOT } from "../../utils/constants";
import React from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { useDispatch } from "../../hooks/hooks";
import { CLOSE_POPUP } from "../../services/actions/popupDetailInfoAction";

interface IModalComponent {
  children: React.ReactNode;
}

const ModalComponent: React.FC<IModalComponent> = ({ children }) => {
  const matchIndex = useMatch("/");
  const [openPopup, setOpenPopup] = React.useState(true);
  const openPopupRef = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closePopupCallback = (): void => {
    setOpenPopup(false);
    dispatch({ type: CLOSE_POPUP });
    !matchIndex && navigate(-1);
  };

  React.useEffect(() => {
    openPopupRef.current = true;
  }, []);

  return (
    <>
      {MODAL_ROOT &&
        openPopup &&
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
};

export default ModalComponent;
