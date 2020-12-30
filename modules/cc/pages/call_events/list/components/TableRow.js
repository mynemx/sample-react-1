import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "TableRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    callEvent: PropTypes.object.isRequired
};

const TableRow = ({ index, callEvent }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>{callEvent.Event}</td>
            <td>{JSON.stringify(callEvent)}</td>
        </tr>
    );
};

TableRow.displayName = displayName;
TableRow.propTypes = propTypes;

export default TableRow;
