import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "CampaignRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    campaign: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const TableRow = ({ index, campaign, handleRemove }) => {
    return (
        <tr key={campaign.id}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`campaigns/${campaign.id}`}>
                    {campaign.title}
                </Link>
            </td>
            <td>{campaign.type}</td>
            <td>{campaign.listType}</td>
            <td>{campaign.agent}</td>
            <td>{campaign.recipientsCount}</td>
            <td>{campaign.calledRecipientsCount}</td>
            <td>{campaign.pendingRecipientsCount}</td>
            <td>{campaign.isActive ? "YES" : "NO"}</td>
            <td>{campaign.isComplete ? "YES" : "NO"}</td>
            <td>{campaign.userName}</td>
            <td>
                {campaign.createdAt &&
                    campaign.createdAt.format("MMM, DD YYYY")}
            </td>
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
                            to={`campaigns/${campaign.id}`}
                        >
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(campaign.id)}
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
