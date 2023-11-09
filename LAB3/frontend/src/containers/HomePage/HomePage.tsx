import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button } from "primereact/button";

export const HomePage = () => {
    const navigate = useNavigate();

    return <canvas className="home-page-container">HOME PAGE</canvas>;
};
