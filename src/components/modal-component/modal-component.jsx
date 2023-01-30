import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { MODAL_ROOT } from "../../utils/constants";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ModalComponent({ children }) {
  const [openPopup, setOpenPopup] = React.useState(true);
  const navigate = useNavigate();
  const closePopupCallback = () => {
    setOpenPopup(false);
    navigate(-1);
  };
  return (
    <>
      {openPopup &&
        ReactDOM.createPortal(
          <ModalOverlay closePopup={closePopupCallback}>
            <Modal closePopup={closePopupCallback}>{children}</Modal>
          </ModalOverlay>,
          MODAL_ROOT
        )}
    </>
  );
}
