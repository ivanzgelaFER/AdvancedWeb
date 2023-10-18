import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";

export const Competition = () => {
    const { logout, isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate;

    return (
        <div>
            <h1>COMPETITION PAGE</h1>
            {!isAuthenticated ? (
                <div>
                    <button onClick={() => loginWithRedirect()}>Sign in</button>
                </div>
            ) : (
                <Navigate to="/private" />
            )}
        </div>
    );
};
