import React, { useCallback, useEffect, useState } from "react";
import "./HomePage.css";
import { useDispatch } from "react-redux";
import { login } from "../../api/login";
import { useAuth0 } from "@auth0/auth0-react";
import { addCompetition, getCompetitionById, getCompetitions } from "../../api/competition";

export const HomePage = () => {
    const { logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const [info, setInfo] = useState();

    const fetchBuildings = useCallback(async () => {
        try {
            //const res = await login();
            //const res = await competition();
            //const res = await getCompetitions();
            //const res = await getCompetitionById("2");
            await addCompetition();
            //setInfo(res);
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchBuildings();
    }, [fetchBuildings]);

    return (
        <div>
            <h1>Home page</h1>
            {isAuthenticated && (
                <div>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            )}
        </div>
    );
};
