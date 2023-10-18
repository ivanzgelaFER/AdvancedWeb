import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

export const Login = () => {
    const { logout, isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
    return (
        <div>
            <h1>LOGIN PAGE</h1>
            {!isAuthenticated ? (
                <div>
                    <button onClick={() => loginWithRedirect()}>Sign in</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            )}
        </div>
    );
};
