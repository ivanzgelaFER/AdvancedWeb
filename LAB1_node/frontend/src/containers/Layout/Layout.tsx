import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./Layout.css";

export const Layout = (props: any) => {
    return (
        <div id="layout">
            <Header />
            <div id="layout-columns">
                <div className="main-column">
                    <main className="main">{props.children}</main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};
