import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ protectedElement, authorized }) {
  const { user } = useSelector((state) => state.userReducer);

  if (authorized) {
    return <>{user ? <Navigate to="/" /> : protectedElement}</>;
  }
  return <>{user ? protectedElement : <Navigate to="/login" />}</>;
}
