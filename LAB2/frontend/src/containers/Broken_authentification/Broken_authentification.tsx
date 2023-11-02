import { InputText } from "primereact/inputtext";
import "./Broken_authentification.css";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import { login } from "../../api/broken_authentification";
import { UserData } from "../../models/userData";

export const Broken_authentification = () => {
    const navigate = useNavigate();
    const options = ["On", "Off"];
    const [value, setValue] = useState(options[0]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrrorMessage] = useState("");
    const [user, setUser] = useState<UserData>();

    const handleLogin = async () => {
        try {
            if (username !== "" && password !== "") {
                const data = await login(username, password, value);
                setErrrorMessage(data.message);
                setUser(data.user);
            } else {
                setErrrorMessage("Username and password are required!");
            }
        } catch (error) {
            console.log("An error has occurred while logging in.");
        }
    };

    return (
        <div className="broken-authentification-container">
            <div>
                <div>
                    <Button label="Back" icon="fa fa-arrow-left" onClick={() => navigate(-1)} />
                </div>
                <h1>Broken authentification page</h1>
                <div>
                    <h2>Enable/disable broken authentification</h2>
                    <SelectButton
                        value={value}
                        onChange={e => setValue(e.value)}
                        options={options}
                    />
                </div>
                <h3>Implemented: brute force attack and wrong error message</h3>
                {user !== undefined && (
                    <div className="table-container">
                        <hr />
                        <h2>Successful login (user data) </h2>
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
                                <tr>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.gmail}</td>
                                    <td>{user.password}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div>
                <h1 className="login-form-broken-auth">LOGIN FORM</h1>
                <section className="login-form">
                    <h4>
                        Username(password) in database: crni(branko123), plesa(matej123),
                        kruno(kruno123), borko(borko123), slavko(slavko123)
                    </h4>
                    <InputText
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e: any) => setUsername(e.target.value)}
                    />
                    <Password
                        id="password"
                        type="password"
                        placeholder="Password"
                        toggleMask
                        feedback={false}
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <Button
                        label="Log in"
                        onClick={() => {
                            handleLogin();
                        }}
                    />
                    <h4 className="h5-allert">{errorMessage}</h4>
                </section>
            </div>
        </div>
    );
};
