import "./SQL_Injection.css";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import { UserData } from "../../models/userData";
import { InputText } from "primereact/inputtext";
import { getAccountByUsername } from "../../api/sql_injection";

export const SQL_Injection = () => {
    const navigate = useNavigate();
    const options = ["On", "Off"];
    const [value, setValue] = useState(options[0]);
    const [user, setUser] = useState<UserData[]>();
    const [username, setUsername] = useState("");

    const validateQuery = (input: string) => {
        const tautologyRegex = /('|\")(\s*)(o|O)(r|R)(\s*)1=1(\s*)(;|--)/;
        const isTautology = tautologyRegex.test(input);
        if (isTautology) alert("SQL injection tautology detected!\nEnter valid username");
        return !isTautology;
    };

    const validateUsername = (input: string) => {
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        const isUsernameValid = usernameRegex.test(input);
        if (!isUsernameValid) {
            alert(
                "Invalid username! Please use only letters, numbers, underscores and hyphens (-)."
            );
        }
        return isUsernameValid;
    };

    const handleGetAccount = async () => {
        try {
            if (value == "On") {
                const data = await getAccountByUsername(username);
                setUser(data);
            } else if (value == "Off") {
                if (validateQuery(username) && validateUsername(username)) {
                    const data = await getAccountByUsername(username);
                    setUser(data);
                }
            }
        } catch (error) {
            console.log("An error has occurred while adding a new satellite.");
        }
    };

    return (
        <div className="sql-injection">
            <div>
                <div>
                    <Button label="Back" icon="fa fa-arrow-left" onClick={() => navigate(-1)} />
                </div>
                <h1>SQL injection page</h1>
                <div>
                    <h2>Enable/disable sql injection</h2>
                    <SelectButton
                        value={value}
                        onChange={e => setValue(e.value)}
                        options={options}
                    />
                </div>
                <div>
                    <h3>Enter username to get user datas</h3>
                    <h5>Usernames in database: crni, plesa, kruno, borko, slavko</h5>
                    <h5>
                        Enter in textbox <span>' OR 1=1;--’</span> to exploit vulnerability(sql
                        injection tautology)
                    </h5>
                    <InputText value={username} onChange={e => setUsername(e.target.value)} />
                    <Button label="Get account" onClick={handleGetAccount} />
                </div>
            </div>
            <div>
                <div>
                    <h2>
                        User/users data {value == "On" && <span>+ SQL injection is active</span>}
                    </h2>
                </div>
                <h3 className="h3-allert">Password and other sensitive date should not !</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Username</th>
                                <th>Gmail</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user != undefined &&
                                user.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.gmail}</td>
                                        <td>{user.password}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
