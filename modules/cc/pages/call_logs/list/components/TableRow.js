import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "TableRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    callLog: PropTypes.object.isRequired
};

const TableRow = ({ index, callLog }) => {
    return (
        <tr key={callLog.id}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`call-logs/${callLog.id}`}>
                    {callLog.calldate &&
                        callLog.calldate.format("MMM, DD YYYY HH:mm")}
                </Link>
            </td>
            <td>{callLog.caller}</td>
            <td>{callLog.destination}</td>
            <td>{callLog.direction}</td>
            <td>{callLog.callDuration}</td>
            <td>{callLog.disposition}</td>
        </tr>
    );
};

TableRow.displayName = displayName;
TableRow.propTypes = propTypes;

export default React.memo(TableRow);
