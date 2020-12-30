import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "LeadRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    lead: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const LeadRow = ({ index, lead, handleRemove }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`leads/${lead.id}`}>
                    {lead.name}
                </Link>
            </td>
            <td>{lead.statusName}</td>
            <td>{lead.phone}</td>
            <td>{lead.email}</td>
            <td>{lead.gender}</td>
            <td>{lead.location}</td>
            <td>{lead.source}</td>
            <td>{lead.industryName}</td>
            <td>{lead.salesRepName}</td>
            <td>
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
                        <Link className="dropdown-item" to={`leads/${lead.id}`}>
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`leads/edit/${lead.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(lead.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

LeadRow.displayName = displayName;
LeadRow.propTypes = propTypes;

export default LeadRow;
