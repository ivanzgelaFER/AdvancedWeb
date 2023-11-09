import { Navigate, RouteProps } from "react-router-dom";

type PrivateRouteProps = RouteProps & {
    component: any;
};

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const allow = true;

    if (allow) {
        return <Component />;
    } else {
        return <Navigate to="/" />;
    }
};
