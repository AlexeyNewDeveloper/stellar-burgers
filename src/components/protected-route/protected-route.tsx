import { Navigate } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";
import { getUserState } from "../../services/selectors/userStateSelectors";

interface IProtectedRoute {
  protectedElement: React.ReactNode;
  authorized: boolean;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({
  protectedElement,
  authorized,
}) => {
  let { user } = useSelector(getUserState);

  if (authorized) {
    return <>{user ? <Navigate replace to="/" /> : protectedElement}</>;
  }
  return <>{user ? protectedElement : <Navigate replace to="/login" />}</>;
};
