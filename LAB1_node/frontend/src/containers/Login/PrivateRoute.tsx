import { Navigate, RouteProps } from "react-router-dom";

type PrivateRouteProps = RouteProps & {
    component: any;
};

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const token = true;
    const loginState = true;

    if (token && loginState) return <Component />;
    else {
        return <Navigate to="/login" />;
    }
};
