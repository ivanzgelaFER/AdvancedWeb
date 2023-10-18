import axios, { AxiosResponse } from "axios";

export const login = async () => {
    const res = await axios.get("/");
    return res.data;
};