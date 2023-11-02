import axios from "axios";

export const getCompetitionById = async (id: number, name: string) => {
    const res = await axios.get(`/competition/${id}/${name}`);
    return res.data;
};