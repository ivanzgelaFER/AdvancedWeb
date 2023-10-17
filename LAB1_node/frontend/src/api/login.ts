import axios, { AxiosResponse } from "axios";

export const login = async () => {
    const res = await axios.post("/login");
    console.log(res);    
};