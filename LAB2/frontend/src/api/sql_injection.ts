import axios from "axios";

export const getAccountByUsername = async (username: string, attack: string) => {
    const res = await axios.get(`/injection/${username}/${attack}`);
    return res.data.accounts;
};