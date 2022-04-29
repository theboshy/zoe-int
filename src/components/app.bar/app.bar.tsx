import { Col, Row } from "react-bootstrap";
import "./app.bar.css"

export function AppBar (props: any) {
    return (
        <Row className="app-bar d-flex p-2">
                <Col>
                    <img className="logo" src="/zoe.logo.png" alt=""/>
                </Col>
            </Row>
    );
}