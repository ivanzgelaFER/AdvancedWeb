import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { CompetitionTable } from "./CompetitionTable";
import { useState, useCallback, useEffect } from "react";
import { getCompetitions } from "../../api/competition";
import { ICompetition } from "../../models/competitions";
import { useDispatch } from "react-redux";

export const Competition = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const [competitions, setCompetitions] = useState<ICompetition[]>([]);
    const dispatch = useDispatch();

    const fetchCompetitions = useCallback(async () => {
        try {
            const res = await getCompetitions();
            setCompetitions(res);
        } catch (error) {
            console.log("Error while fetching competitions.");
        }
    }, [dispatch]);

    useEffect(() => {
        fetchCompetitions();
    }, [fetchCompetitions]);

    return (
        <>
            {isLoading ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <>
                    {isAuthenticated ? (
                        <Navigate to="/private" />
                    ) : (
                        <div>
                            <h1>PUBLIC PAGE FOR COMPETITIONS</h1>
                            <CompetitionTable competitionsData={competitions} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};
