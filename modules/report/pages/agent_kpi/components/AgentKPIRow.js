import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "AgentKPIRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    agent: PropTypes.object.isRequired,
};

const AgentKPIRow = ({ index, agent, calldate }) => {
    return (
        <tr key={agent.id}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`agent-kpi/${agent.id}/${calldate}`}>
                    {agent.name}
                </Link>
            </td>

            <td>{ agent.noOfOutboundCalls.toLocaleString() }</td>
            <td>{ agent.successfulOutboundCalls.toLocaleString() }</td>
            <td>{ agent.averageOutboundTime }</td>
            <td>{ agent.sumOfOutbound }</td>
            <td>{ agent.outboundCost.toLocaleString() }</td>
            <td>{ agent.amountOfOrdersFromColdCalls.toLocaleString() }</td>
            <td>{ agent.noOfColdCallsOrders.toLocaleString() }</td>
            <td>{ agent.amountOfOrdersFromExistingCustomers.toLocaleString() }</td>
            <td>{ agent.noOfExistingCustomersOrders.toLocaleString() }</td>
            <td>{ agent.totalAmountOfOrdersSold.toLocaleString() }</td>
            <td>{ agent.noOfOrdersSold.toLocaleString() }</td>
            <td>{ agent.totalAmountOfOrdersGenerated.toLocaleString() }</td>
            <td>{ agent.noOfOrdersGenerated.toLocaleString() }</td>
    
        </tr>
    );
};

AgentKPIRow.displayName = displayName;
AgentKPIRow.propTypes = propTypes;

export default React.memo(AgentKPIRow);
