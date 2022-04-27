import { useState } from "react";

type Agent = {
    id: number,
    "name": string,
    "avatar": string,
    "income": number
}

export function AgentView (props: any) {


    const [incomeQuery, setIncomeQuery] = useState("");
    const [agentsFilter, setAgentsFilter] = useState<Agent[]>([]);
    const [visibleFilter, setVisibleFilter] = useState<Agent[]>([]);
    const [currentPage, setCurrentPage] = useState(1)


    function checkInpuSize(env: any) {
        setIncomeQuery(env.target.value)
    }

    async function searchAgents() {
        if (incomeQuery.length === 5)  {
             console.log("query") 
             loadAgents()
             .then(response => response.json())
             .then(data => {
                if (data.length > 0) {
                   filterAgents(data)
                } else {
                    console.log("no data")
                }
             });  
             
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
        console.log(minusRange)
        console.log(maxRange)
        let agentsFilter = agentData.filter((agnt) => (agnt.income > minusRange));
        console.log(agentsFilter)
        agentsFilter = agentsFilter.filter((agnt) => (agnt.income < maxRange))
        setAgentsFilter(agentsFilter);
        //setVisibleFilter(agentsFilter.slice(0, (currentPage * 3)));
    }

    function showLessItems() {
        setCurrentPage(currentPage - 1)
    }

    function showMoreItems() {
        setCurrentPage(currentPage + 1)
    }

    return (<div id="agents">
        <label>Current Income</label>
        <input type="number" onChange={checkInpuSize}/>
        <button onClick={searchAgents}>Search</button>
        <div id="visible-agents">
            {
                agentsFilter.slice(0, (currentPage * 3)).map((agent, i) => <div key={i}>{agent.name}</div>)
            }
        </div>
        <button onClick={showLessItems}>- show less</button>
        <button onClick={showMoreItems}>+ show more</button>
    </div>);
}