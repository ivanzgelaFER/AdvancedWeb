import axios from "axios";

export const getCompetitions = async () => {
    const res = await axios.get("/competition/all");
    return res.data;
};

export const getCompetitionById = async (id: string) => {
    const res = await axios.get(`/competition/${id}`);
    return res.data;
};

export const addCompetition = async () => {
    var data = {name: "Axios natjecanje"};
    await axios.post("/competition/add", data);
};