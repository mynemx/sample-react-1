import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "categoryRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    category: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const categoryRow = ({ index, category, handleRemove, handleEdit }) => {
    return (
        <li
            key={index}
            className="list-group-item list-group-item-primary d-flex flex-row py-2"
        >
            <div className="px-2"> {index + 1}. </div>
            <div className="px-2 flex-grow-1"> {category.name} </div>

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
                        onClick={() => handleEdit(category)}
                        to="#"
                    >
                        Edit
                    </Link>
                    <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => handleRemove(category.id)}
                    >
                        Delete
                    </Link>
                </div>
            </div>
        </li>
    );
};

categoryRow.displayName = displayName;
categoryRow.propTypes = propTypes;

export default React.memo(categoryRow);
