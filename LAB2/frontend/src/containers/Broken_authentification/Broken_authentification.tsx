import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const Broken_authentification = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <Button label="Back" icon="fa fa-arrow-left" onClick={() => navigate(-1)} />
            </div>
            Broken authentification page
        </div>
    );
};
