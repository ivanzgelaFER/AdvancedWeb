import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/configureStore";
import { ICompetition } from "../../models/competitions";

interface ILocationState {
    competition: ICompetition;
}

export const CompetitionDetails = () => {
    const user = useSelector((state: AppState) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [competition, setCompetition] = useState((location.state as ILocationState)?.competition);

    let resetForm = () => {};

    const backAction = () => {
        navigate(-1);
    };

    return <div>{competition.name}</div>;
};
