export interface ICompetition {
    id?: number;
    name?: string;
    vrsta?: string;
    competitors?: ICompetitor[];
    win?: number;
    draw?: number;
    lose?: number;
}

export const competitionInit: ICompetition = {
    name: "",
    vrsta: "",
    competitors: [{name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}],
    win: 0,
    draw: 0,
    lose: 0
};

export interface ICompetitor {
    name?: string;
}
