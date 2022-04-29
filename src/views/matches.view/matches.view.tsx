import { useState } from "react";
import { Container, Row, Dropdown } from "react-bootstrap";
import { AppBar } from "../../components/app.bar/app.bar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Agent } from "../../models/agent";
import { useLocation } from 'react-router-dom';
import { Card } from "../../components/card/card.component";

import "./matches.view.css"

export interface LocationParams {
    agents: [],
    income: 0
}

export function MatchesView(props: any) {
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation();
    const [orderLabel, setOrderLabel] = useState("Select..")

    const { agents, income } = location.state as LocationParams;


    function showLessItems() {
        setCurrentPage(currentPage - 1)
    }

    function showMoreItems() {
        setCurrentPage(currentPage + 1)
    }

    function currencyFormat(num: number) {
        return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    function sortBy(option: number) {
        switch(option) {
            case 0: {
                setOrderLabel("Name (A-Z)");
                agents.sort((a: Agent, b: Agent) => (a.name > b.name) ? 1 : -1)
                break;
            }
            case 1: {
                setOrderLabel("ID");
                agents.sort((a: Agent, b: Agent) => (a.id > b.id) ? 1 : -1)
                break;
            }
            case 2: {
                setOrderLabel("Income: Hight First");
                agents.sort((a: Agent, b: Agent) => (a.income < b.income) ? 1 : -1)
                break;
            }
            case 3: {
                setOrderLabel("Income: Low First");
                agents.sort((a: Agent, b: Agent) => (a.income > b.income) ? 1 : -1)
                break;
            }
        }
    }

    return (
        <Container fluid>
            <AppBar />
            <Container fluid="sm container-size">
                <Row className="mt-4">
                    <h1 className="justify-to-center title">Your Matches</h1>
                    <span className="justify-to-center-cus" >your income: <span className="sub-title">{currencyFormat(income)}</span></span>
                </Row>
                <Row className="mt-4">
                    <label>Order agents by</label>
                    <Dropdown> 
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {orderLabel}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => sortBy(0)}>Name (A-Z)</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortBy(1)}>ID</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortBy(2)} >Income: Hight First</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortBy(3)}>Income: Low First</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Row className="mt-5">
                    <div className="agents-list">
                        {
                            agents.slice(0, (currentPage * 3)).map((agent: Agent, i) => <Card key={i} name={agent.name} income={currencyFormat(agent.income)} id={agent.id} />)
                        }
                    </div>
                </Row>
                <Row>
                    <div className="paginator">
                        <span className="paginator-item" onClick={showLessItems}>show less -</span>
                        <span className="paginator-item" onClick={showMoreItems}>show more +</span>
                    </div>
                </Row>
            </Container>
        </Container>
    );
}