import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getCompetitions } from "../../api/competition";
import { useNavigate } from "react-router-dom";
import { ICompetition } from "../../models/competitions";
import "./Competition.css";

const cols = [
    { field: "name", header: "Name", sortable: true },
    { field: "competitors", header: "Competitors", sortable: true },
];

interface Props {
    competitionsData: ICompetition[];
}

export const CompetitionTable = ({ competitionsData }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="competitions-table">
            <DataTable
                value={competitionsData}
                showGridlines
                emptyMessage={"No results yet"}
                onRowClick={row =>
                    navigate(`/competition-details`, {
                        state: {
                            competition: competitionsData.find(x => x.id === row.data.id),
                        },
                    })
                }
            >
                {cols.map(col => {
                    return (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            sortable={col.sortable}
                        />
                    );
                })}
            </DataTable>
        </div>
    );
};
