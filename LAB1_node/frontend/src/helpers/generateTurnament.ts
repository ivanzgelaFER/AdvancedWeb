import { ICompetitor, ITournament } from "../models/competitions"

export const createTournament = (competitors: ICompetitor[]) => {
    var competitorsFilter:ICompetitor[] = [];
    competitors.forEach((competitor) => {if(competitor.name !== "") competitorsFilter.push(competitor)})
    var tournament: ITournament = {rounds: []}
    
    if(competitorsFilter.length === 4) {
        //kolo 1
        //tournament.rounds.push([{player1: competitorsFilter[0], player2: competitorsFilter[1]}, {player1: competitorsFilter[2], player2: competitorsFilter[3]}])

    } else if(competitorsFilter.length === 5) {

    } else if(competitorsFilter.length === 6) {

    } else if(competitorsFilter.length === 7) {

    } else if(competitorsFilter.length === 8) {

    }

    return[];
}

 