import "./Layout.css";

export const Layout = (props: any) => {
    return (
        <div id="layout">
            <div id="layout-columns">
                <div className="main-column">
                    <main className="main">{props.children}</main>
                </div>
            </div>
        </div>
    );
};
