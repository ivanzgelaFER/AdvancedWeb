import "./Competition.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ICompetition } from "../../models/competitions";
import { useNavigate } from "react-router-dom";

const cols = [
    { field: "name", header: "Name", sortable: true },
    { field: "vrsta", header: "Competition type", sortable: true },
];

interface Props {
    competitionsData: ICompetition[];
}

export const CompetitionTable = ({ competitionsData }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="competitions-table">
            <h3>For more details about specific competition click on table row!</h3>
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
