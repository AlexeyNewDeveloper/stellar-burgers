import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRoute({ protectedElement, authorized }) {
  const { user } = useSelector((state) => state.userReducer);

  if (authorized) {
    return <>{user ? <Navigate to="/" /> : protectedElement}</>;
  }
  return <>{user ? protectedElement : <Navigate to="/login" />}</>;
}

ProtectedRoute.propTypes = {
  protectedElement: PropTypes.element.isRequired,
  authorized: PropTypes.bool.isRequired,
};
