import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, RouteProps } from "react-router-dom";

type PrivateRouteProps = RouteProps & {
    component: any;
};

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

    if (isAuthenticated) return <Component />;
    else {
        return <Navigate to="/login" />;
    }
};
