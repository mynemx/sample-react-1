import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "Sip Extension Row";
const propTypes = {
    index: PropTypes.number.isRequired,
    sipExtension: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const sipExtensionRow = ({ index, sipExtension, handleRemove }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`sip-extensions/${sipExtension.id}`}>
                    {sipExtension.name}
                </Link>
            </td>
            <td>{sipExtension.ownerName}</td>
            <td>{sipExtension.user}</td>
            <td>{sipExtension.callerid}</td>
            <td>{sipExtension.port}</td>
            <td>{sipExtension.allow}</td>
            <td>{sipExtension.secret}</td>
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
                        <Link
                            className="dropdown-item"
                            to={`sip-extensions/${sipExtension.id}`}
                        >
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`sip-extensions/edit/${sipExtension.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(sipExtension.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

sipExtensionRow.displayName = displayName;
sipExtensionRow.propTypes = propTypes;

export default sipExtensionRow;
