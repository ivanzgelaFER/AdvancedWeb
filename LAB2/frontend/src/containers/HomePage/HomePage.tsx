import "./HomePage.css";
import { useCallback, useEffect, useState } from "react";
import { addCompetition, getCompetitions } from "../../api/competition";
import { CompetitionTable } from "../Competition/CompetitionTable";
import { Dialog } from "primereact/dialog";
import { ICompetition, competitionInit } from "../../models/competitions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { createTournament } from "../../helpers/generateTurnament";
import { FieldMetaState, Field, Form } from "react-final-form";

export const HomePage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [competitions, setCompetitions] = useState<ICompetition[]>([]);

    const fetchCompetitions = useCallback(async () => {
        try {
            const res = await getCompetitions();
            setCompetitions(res);
        } catch (error) {
            console.log("Error while fetching competitions.");
        }
    }, []);

    useEffect(() => {
        fetchCompetitions();
    }, [fetchCompetitions, dialogOpen]);

    const validate = (data: ICompetition) => {
        const errors: any = {};
        if (data.name === "" || data.name === undefined) errors.name = "Name required";
        if (data.vrsta === "" || data.vrsta === undefined) {
            errors.vrsta = "Type required";
        }

        data.competitors?.forEach((c, index) => {
            if (index <= 3 && (c.name === undefined || c.name === "")) {
                errors.lose = "Minimum 4 competitors required";
            }
        });
        if (
            data.win === undefined ||
            data.draw === undefined ||
            data.lose === undefined ||
            data.win < 0 ||
            data.draw < 0 ||
            data.lose < 0
        ) {
            errors.draw = "Only positive numbers allowed   ";
        }
        return errors;
    };
    const handleAddNewCompetition = async (data: ICompetition) => {
        const tournament = createTournament(data.competitors!);
        data.tournament = tournament;
        try {
            await addCompetition(data);
        } catch (error) {
            console.log("An error has occurred while adding a new satellite.");
        } finally {
            setDialogOpen(false);
        }
    };
    const isFormFieldValid = (meta: FieldMetaState<any>) => {
        return meta.touched && meta.error;
    };

    const getFormErrorMessage = (meta: FieldMetaState<any>) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    return (
        <div>
            <div>
                <Button label="Add New Competition" onClick={() => setDialogOpen(true)} />
            </div>
            <CompetitionTable
                competitionsData={competitions}
                fetchCompetition={fetchCompetitions}
            />

            <Dialog
                visible={dialogOpen}
                id="new-competition"
                header="Add New Competition (min 4, max 8 competitors!)"
                draggable={false}
                onHide={() => setDialogOpen(false)}
            >
                <Form
                    onSubmit={(data: ICompetition) => handleAddNewCompetition(data)}
                    initialValues={competitionInit}
                    validate={validate}
                    render={({ handleSubmit, values }) => (
                        <form
                            id="new-competition"
                            onSubmit={handleSubmit}
                            className="form-container"
                            autoComplete="off"
                        >
                            <div className="form-container-competition">
                                <Field
                                    name="name"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Competition Name</span>
                                            <span className="p-float-label">
                                                <InputText id="name" {...input} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="vrsta"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Competition type</span>
                                            <span className="p-float-label">
                                                <InputText id="vrsta" {...input} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[0].name"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Competitor 1</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[0].name" {...input} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name={`competitors[1].name`}
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Competitor 2</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[1].name" {...input} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[2].name"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Competitor 3</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[2].name" {...input} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[3].name"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Competitor 4</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[3].name" {...input} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[4].name"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 5</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[4].name" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[5].name"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 6</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[5].name" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[6].name"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 7</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[6].name" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[7].name"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 8</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[7].name" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="form-container-competition-scoring-system">
                                <div className="scoring-system">
                                    <span>Scoring system:</span>
                                    <span>e.g. footbal (3,1,0)</span>
                                </div>
                                <Field
                                    name="win"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Win</span>
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="win"
                                                    {...input}
                                                    onChange={(value: InputNumberChangeEvent) => {
                                                        input.onChange(value.value);
                                                    }}
                                                    value={values.win}
                                                />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="draw"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Draw</span>
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="draw"
                                                    {...input}
                                                    onChange={(value: InputNumberChangeEvent) => {
                                                        input.onChange(value.value);
                                                    }}
                                                    value={values.draw}
                                                />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="lose"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span>Lose</span>
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="lose"
                                                    {...input}
                                                    onChange={(value: InputNumberChangeEvent) => {
                                                        input.onChange(value.value);
                                                    }}
                                                    value={values.lose}
                                                />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
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
