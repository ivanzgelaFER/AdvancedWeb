import { applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import { UserData } from "../models/userData";

export interface AppState {
    user: UserData;
}

const configureStore = (initialState?: AppState) => {
    const sagaMiddleware = createSagaMiddleware();
    const enhancers = [];
    const windowIfDefined = typeof window === "undefined" ? null : (window as any);
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }
    
    const result = createStore(
        compose(applyMiddleware(sagaMiddleware), ...enhancers)
    );

    return result;
}

export const store = configureStore();

export type AppDispatch = typeof store.dispatch;
