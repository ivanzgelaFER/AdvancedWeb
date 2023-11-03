import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button } from "primereact/button";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page-container">
            <h1>Choose and try vulnerabilities</h1>
            <div>
                <h1>SQL injection</h1>
                <div>
                    <Button
                        label="Try SQL injection"
                        onClick={() => navigate("/sql_injection")}
                        className="sql-injection-button"
                    ></Button>
                </div>
            </div>
            <div>
                <h1>Broken authentification</h1>
                <div>
                    <Button
                        label="Try broken authentification"
                        onClick={() => navigate("/broken_authentification")}
                        className="broken-authentification-button"
                    ></Button>
                </div>
            </div>
        </div>
    );
};
