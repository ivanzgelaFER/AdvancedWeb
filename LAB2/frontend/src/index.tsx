import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { PrivateRoute } from "./containers/Login/PrivateRoute";
import reportWebVitals from "./reportWebVitals";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "@fortawesome/fontawesome-free/css/all.min.css";

if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
}

const root = createRoot(document.getElementById("root")!);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<PrivateRoute path="/" component={App} />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
