import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Broken_authentification = () => {
    const navigate = useNavigate();
    const options = ["On", "Off"];
    const [value, setValue] = useState(options[0]);

    return (
        <div>
            <div>
                <Button label="Back" icon="fa fa-arrow-left" onClick={() => navigate(-1)} />
            </div>
            <h1>Broken authentification page</h1>
            <div>
                <h2>Enable/disable broken authentification</h2>
                <SelectButton value={value} onChange={e => setValue(e.value)} options={options} />
            </div>
            <div>Current value inside variable: {value}</div>
        </div>
    );
};
