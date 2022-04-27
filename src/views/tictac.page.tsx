import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TicTacView } from "./tictac.view";

export function TicTacPage(props: any) {
    return (<div className="App">
        <Tabs defaultActiveKey="profile" id="tic_tac" className="mb-3">
            <Tab eventKey="tic_tac" title="PLAY TIC TAC">
                <TicTacView size={3} />
            </Tab>
        </Tabs>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
    </div>);
}