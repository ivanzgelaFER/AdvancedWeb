import axios from "axios";

export const getAccountById = async (id: number) => {
    const res = await axios.get(`/injection/${id}`);
    return res.data;
};