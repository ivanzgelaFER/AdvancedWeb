import axios, { AxiosResponse } from "axios";

export const login = async () => {
    const res = await axios.get("/");
    console.log(res.data);
    console.log("----")
    if(res.data.isAuthenticated) {
        return res.data;
    } else {
        await axios.get("/auth");
    }
};