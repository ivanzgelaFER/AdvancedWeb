import { ITournament } from "./tournament";

export interface ICompetitor {
    name?: string;
}

export interface ICompetition {
    id?: number;
    name?: string;
    vrsta?: string;
    competitors?: ICompetitor[];
    win?: number;
    draw?: number;
    lose?: number;
    tournament?: ITournament
}

export const competitionInit: ICompetition = {
    name: "",
    vrsta: "",
    competitors: [{name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}],
    win: 0,
    draw: 0,
    lose: 0
};

