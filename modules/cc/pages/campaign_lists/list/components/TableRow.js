import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "TableRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    campaignList: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const TableRow = ({ index, campaignList, handleRemove }) => {
    return (
        <tr key={campaignList.id}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`campaign-lists/${campaignList.id}`}>
                    {campaignList.name}
                </Link>
            </td>
            <td>{campaignList.listType}</td>
            <td>{campaignList.category}</td>
            <td>{campaignList.description}</td>
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
                            to={`campaign-lists/${campaignList.id}`}
                        >
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`campaign-lists/edit/${campaignList.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(campaignList.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

TableRow.displayName = displayName;
TableRow.propTypes = propTypes;

export default React.memo(TableRow);
