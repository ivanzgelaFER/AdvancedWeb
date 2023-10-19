import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { CompetitionTable } from "./CompetitionTable";

export const Competition = () => {
    const { isAuthenticated, isLoading } = useAuth0();

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
                            <CompetitionTable />
                        </div>
                    )}
                </>
            )}
        </>
    );
};
