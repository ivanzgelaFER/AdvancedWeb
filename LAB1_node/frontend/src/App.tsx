import axios from "axios";
import { Layout } from "./containers/Layout/Layout";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./containers/HomePage/HomePage";
import { configureAxiosClient } from "./api/axiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect } from "react";

configureAxiosClient(axios);

export const App = () => {
    const location = useLocation();
    const { getAccessTokenSilently } = useAuth0();

    const getAccesToken = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();
            localStorage.setItem("token", JSON.stringify(token));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getAccesToken();
    }, [getAccesToken]);

    return (
        <Layout>
            <Routes location={location}>
                <Route index path="*" element={<HomePage />} />
            </Routes>
        </Layout>
    );
};
