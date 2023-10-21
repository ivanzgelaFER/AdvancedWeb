import { applyMiddleware, compose, createStore} from "redux";
import { UserData } from "../models/userData";

export interface AppState {
    user: UserData;
}

const configureStore = (initialState?: AppState) => {
    const enhancers = [];
    const windowIfDefined = typeof window === "undefined" ? null : (window as any);
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }
    
    const result = createStore(
        compose(...enhancers)
    );

    return result;
}

export const store = configureStore();

export type AppDispatch = typeof store.dispatch;
