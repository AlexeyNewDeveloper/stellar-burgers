import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getUserState } from "../../services/selectors/userStateSelectors";

export function ProtectedRoute({ protectedElement, authorized }) {
  let { user } = useSelector(getUserState);

  if (authorized) {
    return <>{user ? <Navigate to="/" /> : protectedElement}</>;
  }
  return <>{user ? protectedElement : <Navigate to="/login" />}</>;
}

ProtectedRoute.propTypes = {
  protectedElement: PropTypes.element.isRequired,
  authorized: PropTypes.bool.isRequired,
};
