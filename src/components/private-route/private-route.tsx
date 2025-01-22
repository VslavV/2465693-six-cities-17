import {Navigate} from 'react-router-dom';
import {AuthorizationStatus, RoutePath} from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';

type PrivateRouteProps = {
  children: JSX.Element;
  redirectTo: RoutePath;
  authStatus: AuthorizationStatus;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children, redirectTo, authStatus} = props;
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  return (
    authorizationStatus === authStatus
      ? children
      : <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
