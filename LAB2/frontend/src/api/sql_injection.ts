import axios from "axios";

export const getAccountByUsername = async (username: string) => {
    const res = await axios.get(`/injection/${username}`);
    return res.data.accounts;
};