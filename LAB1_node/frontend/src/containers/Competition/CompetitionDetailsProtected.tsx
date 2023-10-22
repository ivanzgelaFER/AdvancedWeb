import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICompData, ICompetition, IGame, IRankingData } from "../../models/competitions";
import { getCompetitionById, updateGame } from "../../api/competition";
import "./Competition.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Form } from "react-final-form";

interface ILocationState {
    competition: ICompetition;
}

export const CompetitionDetailsProtected = () => {
    const location = useLocation();
    const [competition, setCompetition] = useState((location.state as ILocationState)?.competition);
    const [competitionData, setCompetitionData] = useState<ICompData>({});
    const [rankingData, setRankingData] = useState<IRankingData[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [game, setGame] = useState<IGame>();
    const [resultButton, setResultButton] = useState<number>(0);

    const addResult = async (game: IGame) => {
        try {
            await updateGame(game);
            fetchCompetition();
        } catch (error) {
            console.log("An error has occurred while adding a result.");
        } finally {
            setDialogOpen(false);
        }
    };

    const calculateRankingTable = (data: ICompData) => {
        const players = new Set<string>();
        const results = new Map<string, number>();
        const win = data.competition?.win!;
        const draw = data.competition?.draw!;
        const lose = data.competition?.lose!;
        data.games?.forEach((game: IGame) => {
            players.add(game.player1);
            players.add(game.player2);
        });
        players.forEach((p: string) => {
            results.set(p, 0);
        });

        data.games?.forEach((game: IGame) => {
            const p1 = game.player1;
            const p2 = game.player2;
            if (game.result !== undefined || game.result !== null) {
                if (game.result === 0) {
                    //draw
                    results.set(p1, results.get(p1)! + draw);
                    results.set(p2, results.get(p2)! + draw);
                } else if (game.result === 1) {
                    //winner player 1
                    results.set(p1, results.get(p1)! + win);
                    results.set(p2, results.get(p2)! + lose);
                } else if (game.result === 2) {
                    //winner player 2
                    results.set(p1, results.get(p1)! + lose);
                    results.set(p2, results.get(p2)! + win);
                }
            }
        });
        let convertedData: IRankingData[] = [];
        results.forEach((value, key) => {
            let d: IRankingData = { player: key, points: value };
            convertedData.push(d);
        });
        return convertedData;
    };

    const fetchCompetition = useCallback(async () => {
        try {
            const res = await getCompetitionById(competition.id!, competition.name!);
            setCompetitionData(res);
            const rankingdata = calculateRankingTable(res);
            setRankingData(rankingdata);
        } catch (error) {
            console.log("Error while fetching competition.");
        }
    }, []);

    useEffect(() => {
        fetchCompetition();
    }, [fetchCompetition]);

    return (
        <div>
            <div>
                <h1>Competition: {competitionData.competition?.name}</h1>{" "}
                <h2>Competition type: {competitionData.competition?.vrsta}</h2>
            </div>
            <div className="data-show">
                <div>
                    <div>
                        <h2>Results table</h2>
                    </div>
                    <div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankingData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.player}</td>
                                            <td>{data.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Games table</h2>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th>Player 1</th>
                                    <th>Player 2</th>
                                    <th>Result</th>
                                    <th>Add result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {competitionData.games
                                    ?.sort((a, b) => parseInt(a.round) - parseInt(b.round))
                                    .map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.round}</td>
                                            <td>{item.player1}</td>
                                            <td>{item.player2}</td>
                                            <td>
                                                {item.result &&
                                                    (item.result === 0
                                                        ? "Draw"
                                                        : item.result === 1
                                                        ? `${item.player1} win`
                                                        : `${item.player2} win`)}
                                            </td>
                                            <td>
                                                <Button
                                                    icon="fa fa-add"
                                                    onClick={() => {
                                                        setGame(item);
                                                        setDialogOpen(true);
                                                    }}
                                                ></Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Dialog
                visible={dialogOpen}
                id="add-result"
                header="Add result"
                draggable={false}
                onHide={() => setDialogOpen(false)}
            >
                <Form
                    onSubmit={(data: IGame) => {
                        const gameWithResult: IGame = {
                            ...data,
                            result:
                                resultButton !== null || resultButton !== undefined
                                    ? resultButton
                                    : data.result,
                        };
                        addResult(gameWithResult);
                    }}
                    initialValues={game}
                    render={({ handleSubmit, values }) => (
                        <form
                            id="add-result-form"
                            onSubmit={handleSubmit}
                            className="form-container"
                            autoComplete="off"
                        >
                            <div>
                                <div>
                                    <h3>{values.player1 + " vs " + values.player2}</h3>
                                </div>
                                <div>
                                    <div>
                                        <RadioButton
                                            inputId="result"
                                            name="result"
                                            value={1}
                                            onChange={e => setResultButton(e.value)}
                                            checked={resultButton === 1}
                                        />
                                        <label> Winner {values.player1}</label>
                                    </div>
                                    <div>
                                        <RadioButton
                                            inputId="result"
                                            name="result"
                                            value={2}
                                            onChange={e => setResultButton(e.value)}
                                            checked={resultButton === 2}
                                        />
                                        <label> Winner {values.player2}</label>
                                    </div>
                                    <div>
                                        <RadioButton
                                            inputId="result"
                                            name="result"
                                            value={0}
                                            onChange={e => setResultButton(e.value)}
                                            checked={resultButton === 0}
                                        />
                                        <label> Draw</label>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-buttons-in-modal">
                                <Button
                                    label="Cancel"
                                    onClick={() => setDialogOpen(false)}
                                    icon="pi pi-times"
                                    type="button"
                                />
                                <Button label="Submit" icon="pi pi-check" type="submit" />
                            </div>
                        </form>
                    )}
                />
            </Dialog>
        </div>
    );
};
