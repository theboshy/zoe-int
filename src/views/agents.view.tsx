import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppBar } from "../components/app.bar/app.bar";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import "./agent.view.css"
import { ThemeButtonPrimary } from "../theme.buttons/theme.button";
import { Agent } from "../models/agent";
import { useNavigate } from "react-router-dom";

export function AgentView(props: any) {


    const [incomeQuery, setIncomeQuery] = useState("");
    const [agentsFilter, setAgentsFilter] = useState<Agent[]>([]);
    const [visibleFilter, setVisibleFilter] = useState<Agent[]>([]);
    
    const [agents, setAgents] = useState<Agent[]>([])
    const [agentsFiltered, setAgentsFiltered] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        loadAgents()
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setAgents(data)
                } else {
                    console.log("no data")
                }
            });
        //todo: add flag to ensure data was fully loaded
    }, []);

    function checkInpuSize(env: any) {
        setIncomeQuery(env.target.value)
    }

    async function searchAgents(event: any) {
        event.preventDefault();
        if (incomeQuery.length === 5) {
            let agentsFiltered = filterAgents(agents);
            setAgentsFiltered(true)
            if (agentsFiltered.length > 0) {
                setAgentsFilter(agentsFiltered);
                navigate('/matchesView', {
                    state: {
                        agents: agentsFiltered,
                        income: incomeQuery
                    },
                    replace: false
                })
            } else {

            }
        } else {
            //todo: show query error
        }
    }

    async function loadAgents() {
        return fetch('/mocks/agents.json')
    }

    function filterAgents(agentData: Agent[]) {
        let minusRange = (Number(incomeQuery) - 10000)
        let maxRange = (Number(incomeQuery) + 10000)
        let agentsFilter = agentData.filter((agnt) => (agnt.income > minusRange));
        agentsFilter = agentsFilter.filter((agnt) => (agnt.income < maxRange))
        return agentsFilter;
    }

    return (
        <Container fluid>
            <AppBar />
            <div className="form-content-spacing d-flex justify-content-center align-items-center align-middle">
                <Container fluid="sm">
                    <Row>
                        <FontAwesomeIcon className="cover-icon-size justify-to-center main-theme-color" icon={solid('users-line')} />
                    </Row>
                    <Row className="mt-4">
                        <h1 className="justify-to-center title">Find the best agent for you!</h1>
                        <span className="justify-to-center sub-title">Fill the information below to get your matches.</span>
                    </Row>
                    <Row className="mt-5 justify-to-center">
                        <div className="form-section">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="currentIncome">Current Income</label>
                                    <input type="number" onChange={checkInpuSize} className="form-control" id="currentIncome" aria-describedby="incomeHelp" placeholder="150000" />
                                </div>
                                <ThemeButtonPrimary onClick={searchAgents} name="Get Matches" icon={<FontAwesomeIcon icon={solid('arrow-right')} />} />
                            </form>
                            {
                                agentsFiltered && agentsFilter.length === 0 ? <div>
                                    <label className="form-text error-text">Right now we do not have agents that fit your search</label>
                                </div> : null
                            }
                        </div>
                    </Row>
                </Container>

            </div>
        </Container>
    );
}

/**
 * <label>Current Income</label>
                    <input type="number" onChange={checkInpuSize} />
                    <button onClick={searchAgents}>Search</button>
                    <div id="visible-agents">
                        {
                            agentsFilter.slice(0, (currentPage * 3)).map((agent, i) => <div key={i}>{agent.name}</div>)
                        }
                    </div>
                    <button onClick={showLessItems}>- show less</button>
                    <button onClick={showMoreItems}>+ show more</button>
 */