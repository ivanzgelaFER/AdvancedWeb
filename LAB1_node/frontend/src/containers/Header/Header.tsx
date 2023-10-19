import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "primereact/button";

export const Header = () => {
    const { logout, loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    return (
        <header>
            <div className="menubar">
                {isAuthenticated ? (
                    <div className="header-end-buttons">
                        <Button label="Logout" onClick={() => logout()} />
                    </div>
                ) : (
                    <div className="header-end-buttons">
                        <Button label="Login" onClick={() => loginWithRedirect()} />
                    </div>
                )}
            </div>
        </header>
    );
};
