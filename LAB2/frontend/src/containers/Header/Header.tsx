import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    return (
        <header>
            <div className="menubar">
                <Link to={"/"}>
                    <h1>WEB 2 ARCHADE GAME</h1>
                </Link>
            </div>
        </header>
    );
};
