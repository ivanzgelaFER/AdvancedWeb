import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
//import { Button } from "primereact/button";

export const Header = () => {
    const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    return (
        <header>
            {isLoading ? null : (
                <>
                    <div className="menubar">
                        {isAuthenticated ? (
                            <div className="header-end-buttons">
                                <button title="Logout" onClick={() => logout()} />
                            </div>
                        ) : (
                            <div className="header-end-buttons">
                                <button title="Login" onClick={() => loginWithRedirect()} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </header>
    );
};
