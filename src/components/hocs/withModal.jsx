import React from "react";
import PropTypes from "prop-types";
import { propTypesForItemDetailInfo } from "../../prop-types";
import { useDispatch } from "react-redux";
import { OPEN_POPUP } from "../../services/actions/popupDetailInfoAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserState } from "../../services/selectors/userStateSelectors";
import ModalComponent from "../modal-component/modal-component";

const withModal =
  ({ WrappedComponent, DetailInfoComponent }) =>
  (props) => {
    const { detailInfo, orderButton, ...otherProps } = props;
    const [openPopup, setOpenPopup] = React.useState(false);
    const { user } = useSelector(getUserState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openPopupCallback = () => {
      if (user || !orderButton) {
        setOpenPopup(true);
      } else {
        navigate("/login", { state: { from: "/" } });
      }
      if (detailInfo) {
        dispatch({ type: OPEN_POPUP, modalData: detailInfo });
      }
    };

    return (
      <>
        <WrappedComponent {...otherProps} onClick={openPopupCallback}>
          {otherProps.children}
        </WrappedComponent>

        <>
          {openPopup && (
            <ModalComponent>
              <DetailInfoComponent />
            </ModalComponent>
          )}
        </>
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
  orderButton: PropTypes.bool,
};

export default withModal;
