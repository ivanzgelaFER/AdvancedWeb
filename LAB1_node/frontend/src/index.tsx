import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { PrivateRoute } from "./containers/Login/PrivateRoute";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { Auth0Provider } from "@auth0/auth0-react";
import { Login } from "./containers/Login/Login";

const root = createRoot(document.getElementById("root")!);

const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? "";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? "";

root.render(
    <Provider store={store}>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<PrivateRoute path="/" component={App} />} />
                </Routes>
            </BrowserRouter>
        </Auth0Provider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
