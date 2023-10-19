import "./HomePage.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCompetition, getCompetitions } from "../../api/competition";
import { CompetitionTable } from "../Competition/CompetitionTable";
import { Dialog } from "primereact/dialog";
import { Field, Form } from "react-final-form";
import { ICompetition, competitionInit } from "../../models/competitions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";

export const HomePage = () => {
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [competitions, setCompetitions] = useState<ICompetition[]>([]);

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
    }, [fetchCompetitions, competitions]);

    const handleAddNewCompetition = async (data: ICompetition) => {
        try {
            await addCompetition(data);
        } catch (error) {
            console.log("An error has occurred while adding a new satellite.");
        } finally {
            setDialogOpen(false);
        }
    };

    return (
        <div>
            <div>
                <Button label="Add New Competition" onClick={() => setDialogOpen(true)} />
            </div>
            <CompetitionTable competitionsData={competitions} />
            <Dialog
                visible={dialogOpen}
                id="new-competition"
                header="Add New Competition"
                draggable={false}
                onHide={() => setDialogOpen(false)}
            >
                <Form
                    onSubmit={(data: ICompetition) => handleAddNewCompetition(data)}
                    initialValues={competitionInit}
                    render={({ handleSubmit }) => (
                        <form
                            id="new-competition"
                            onSubmit={handleSubmit}
                            className="form-container"
                            autoComplete="off"
                        >
                            <Field
                                name="name"
                                render={({ input }) => (
                                    <div className="field">
                                        <span>Competition Name</span>
                                        <span className="p-float-label">
                                            <InputText id="name" {...input} />
                                        </span>
                                    </div>
                                )}
                            />
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
