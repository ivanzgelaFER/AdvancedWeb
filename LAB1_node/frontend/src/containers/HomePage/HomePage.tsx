import "./HomePage.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCompetition, getCompetitions } from "../../api/competition";
import { CompetitionTable } from "../Competition/CompetitionTable";
import { Dialog } from "primereact/dialog";
import { Field, FieldMetaState, Form } from "react-final-form";
import { ICompetition, competitionInit } from "../../models/competitions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

export const HomePage = () => {
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [competitions, setCompetitions] = useState<ICompetition[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [existingError, setExistingError] = useState(false);

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

    const handleError = (data: ICompetition) => {
        let errors: string[] = [];
        if (data.name === "") {
            errors.push("Name");
        }
        if (data.vrsta === "") {
            errors.push("Competition type");
        }
        if (data.competitors === undefined || data.competitors?.length < 4) {
            errors.push("Min 4 competitors");
        }

        if (
            data.win === undefined ||
            data.draw === undefined ||
            data.lose === undefined ||
            data.win < 0 ||
            data.draw < 0 ||
            data.lose < 0
        ) {
            errors.push("Scoring must be positive");
        }
        if (errors.length > 0) {
            setExistingError(true);
        } else {
            setExistingError(false);
        }
        let mess = errors.join(", ");
        if (errors.length > 0) mess = mess.concat(" required.");
        setErrorMessage(mess);
    };

    const handleAddNewCompetition = async (data: ICompetition) => {
        handleError(data);
        try {
            console.log(existingError);
            if (!existingError) {
                console.log("!!!!!!!!!!!!!");
                //await addCompetition(data);
            }
        } catch (error) {
            console.log("An error has occurred while adding a new satellite.");
        } finally {
            if (!existingError) {
                setDialogOpen(false);
                setErrorMessage("");
            }
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
            <CompetitionTable competitionsData={competitions} />
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
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competition Name</span>
                                            <span className="p-float-label">
                                                <InputText id="name" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="vrsta"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competition type</span>
                                            <span className="p-float-label">
                                                <InputText id="vrsta" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[0]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 1</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[0]" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[1]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 2</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[1]" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[2]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 3</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[2]" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[3]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 4</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[3]" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[4]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 5</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[4]" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[5]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 6</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[5]" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[6]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 7</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[6]" {...input} />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="competitors[7]"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span>Competitor 8</span>
                                            <span className="p-float-label">
                                                <InputText id="competitors[7]" {...input} />
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
                                    render={({ input }) => (
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
                                        </div>
                                    )}
                                />
                                <Field
                                    name="draw"
                                    render={({ input }) => (
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
                                        </div>
                                    )}
                                />
                                <Field
                                    name="lose"
                                    render={({ input }) => (
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
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="error-text">{errorMessage}</div>
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
