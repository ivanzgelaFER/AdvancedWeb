import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button } from "primereact/button";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Choose and try vulnerabilities</h1>
            <div>
                <h1>SQL injection</h1>
                <div>
                    <Button
                        label="Try SQL injection"
                        onClick={() => navigate("/sql_injection")}
                    ></Button>
                </div>
            </div>
            <div>
                <h1>Broken authentification</h1>
                <div>
                    <Button
                        label="Try broken authentification"
                        onClick={() => navigate("/broken_authentification")}
                    ></Button>
                </div>
            </div>
        </div>
    );
};
