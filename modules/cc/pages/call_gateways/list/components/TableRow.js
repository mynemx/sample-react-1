import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "Sip Extension Row";
const propTypes = {
    index: PropTypes.number.isRequired,
    callGateway: PropTypes.object.isRequired,
    // handleRemove: PropTypes.func.isRequired
};

const sipExtensionRow = ({ index, callGateway, handleRemove }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td> {callGateway.name} </td>
            <td>{callGateway.ipAddress}</td>
            <td>{callGateway.didNumber}</td>
            <td>{callGateway.callerIdName}</td>
            <td>{callGateway.callerIdNumber}</td>
            <td>{callGateway.direction}</td>
            <td>{callGateway.localOutboundRate}</td>
            <td>{callGateway.localOutboundPerMinute}</td>
            {/* <td>
                <div className="btn-group btn-sm action-btn">
                    <button
                        type="button"
                        className="btn btn-sm dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <MenuIcon />
                    </button>

                    <div className="dropdown-menu">
                        <Link
                            className="dropdown-item"
                            to={`sip-extensions/${callGateway.id}`}
                        >
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`sip-extensions/edit/${callGateway.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(callGateway.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td> */}
        </tr>
    );
};

sipExtensionRow.displayName = displayName;
sipExtensionRow.propTypes = propTypes;

export default sipExtensionRow;
