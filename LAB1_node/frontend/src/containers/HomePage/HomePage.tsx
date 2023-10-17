import React, { useCallback, useEffect } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../api/login";

export const HomePage = () => {
    const dispatch = useDispatch();

    const fetchBuildings = useCallback(async () => {
        try {
            const res = await login();
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchBuildings();
    }, [fetchBuildings]);
    return <div>Homa page resi</div>;
};
