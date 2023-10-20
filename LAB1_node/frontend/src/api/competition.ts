import axios from "axios";
import { ICompetition } from "../models/competitions";

export const getCompetitions = async () => {
    const res = await axios.get("/competition/all");
    return res.data;
};

export const getCompetitionById = async (id: string) => {
    const res = await axios.get(`/competition/${id}`);
    return res.data;
};

export const addCompetition = async (data: ICompetition) => {
    await axios.post("/competition/add", data);
};

export const deleteCompetition = async (id: number, name:string) => {
    await axios.delete(`/competition/${id}/${name}`);
}

