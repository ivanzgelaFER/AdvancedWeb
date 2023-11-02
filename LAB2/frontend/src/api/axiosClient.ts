import axios, { AxiosStatic } from "axios";


if (window.location.hostname === "localhost") {
    var port = 8080;
    axios.defaults.baseURL = "http://" + window.location.hostname + ":" + port;
} else {
    //this is for production version
    axios.defaults.baseURL = "https://web2-lab2-backend.onrender.com";
}

const DEFAULT_API_VERSION = 3;

export const configureAxiosClient = (axios: AxiosStatic) => {
    axios.interceptors.request.use(config => {
        const apiVersion = config.apiVersion ?? DEFAULT_API_VERSION;
        config.baseURL = config.baseURL ?? `/api/v${apiVersion}/`;
        return config;
    });
    axios.interceptors.request.use(config => {
        config.paramsSerializer = {
            indexes: null,
        };
        return config;
    });
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            console.error(error);
            return Promise.reject(error);
        }
    );
};

declare module "axios" {
    export interface AxiosRequestConfig {
        apiVersion?: number;
    }
}
