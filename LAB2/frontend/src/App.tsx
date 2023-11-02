import "./App.css";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./containers/HomePage/HomePage";
import { configureAxiosClient } from "./api/axiosClient";
import { Layout } from "./containers/Layout/Layout";
import { SQL_Injection } from "./containers/SQL_Injection/SQL_Injection";
import { Broken_authentification } from "./containers/Broken_authentification/Broken_authentification";

configureAxiosClient(axios);

export const App = () => {
    const location = useLocation();
    return (
        <Layout>
            <Routes location={location}>
                <Route index path="*" element={<HomePage />} />
                <Route path="/sql_injection" element={<SQL_Injection />} />
                <Route path="/broken_authentification" element={<Broken_authentification />} />
            </Routes>
        </Layout>
    );
};
