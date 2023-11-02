import "./App.css";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./containers/HomePage/HomePage";
import { configureAxiosClient } from "./api/axiosClient";
import { Layout } from "./containers/Layout/Layout";

configureAxiosClient(axios);

export const App = () => {
    const location = useLocation();
    return (
        <Layout>
            <Routes location={location}>
                <Route index path="*" element={<HomePage />} />
            </Routes>
        </Layout>
    );
};
