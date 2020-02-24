import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "UserRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const UserRow = ({ index, user, handleRemove }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>{user.firstName}</td>
            <td>{user.secondName}</td>
            <td>{user.lastName}</td>
            <td>{user.department.name}</td>
            <td>{user.email}</td>
            <td>{user.jobTitle}</td>
            <td>{user.gender}</td>
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
                        <Link className="dropdown-item" to={`users/${user.id}`}>
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`users/edit/${user.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(user.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

UserRow.displayName = displayName;
UserRow.propTypes = propTypes;

export default React.memo(UserRow);
