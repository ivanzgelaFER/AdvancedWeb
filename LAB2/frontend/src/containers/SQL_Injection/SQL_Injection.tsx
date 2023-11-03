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
    const [unionQuery, setUnionQuery] = useState("");

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

    const validateUnionQuery = (input: string) => {
        const unionRegex = /(UNION\s+SELECT|null|version|user)/i;
        const isUnionQueryValid = !unionRegex.test(input);
        if (!isUnionQueryValid) {
            alert("Potential SQL injection UNION query detected!");
        }
        return isUnionQueryValid;
    };

    const handleGetAccount = async () => {
        try {
            if (value == "On") {
                const data = await getAccountByUsername(username, "tautology");
                setUser(data);
            } else if (value == "Off") {
                if (validateQuery(username) && validateUsername(username)) {
                    const data = await getAccountByUsername(username, "tautology");
                    setUser(data);
                }
            }
        } catch (error) {
            console.log("An error has occurred while fetching user data.");
        }
    };

    const handleGetDatabaseData = async () => {
        try {
            if (value == "On") {
                const data = await getAccountByUsername(unionQuery, "union");
                setUser(data);
            } else if (value == "Off") {
                if (validateUnionQuery(unionQuery)) {
                    const data = await getAccountByUsername(unionQuery, "union");
                    setUser(data);
                }
            }
        } catch (error) {
            console.log("An error has occurred while fetching user data.");
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
                        onChange={e => {
                            setValue(e.value);
                            if (e.value === "Off") {
                                setUser(undefined);
                                setUsername("");
                                setUnionQuery("");
                            }
                        }}
                        options={options}
                    />
                </div>
                <div className="sql-injection-try">
                    <h3>Enter username to get user data</h3>
                    <h5>Usernames in database: crni, plesa, kruno, borko, slavko</h5>
                    <h5>
                        Enter in textbox <span>' OR 1=1;--’</span> to exploit vulnerability(sql
                        injection tautology)
                    </h5>
                    <InputText value={username} onChange={e => setUsername(e.target.value)} />
                    <Button label="Get account data" onClick={handleGetAccount} />

                    <hr />

                    <h3>Enter following commands to get database data with union sql injection</h3>
                    <h5>UNION select null, version(), null, null, null, null, null</h5>
                    <h5>UNION select null, user, null, null, null, null, null</h5>
                    <InputText value={unionQuery} onChange={e => setUnionQuery(e.target.value)} />
                    <Button label="Get database data" onClick={handleGetDatabaseData} />
                </div>
            </div>
            <div>
                <div>
                    <h2>
                        User/users data {value == "On" && <span>+ SQL injection is active</span>}
                    </h2>
                </div>
                <h5 className="h5-allert">
                    For the purpose of this exercise, sensitive data is being shown, otherwise, it
                    should not be displayed like this!
                </h5>
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
