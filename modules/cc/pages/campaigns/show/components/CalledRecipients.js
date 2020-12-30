import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
const displayName = "CalledRecipients";
const propTypes = {
    recipients: PropTypes.array.isRequired,
    handleQueue: PropTypes.func.isRequired
};
const CalledRecipients = ({ recipients, handleQueue }) => {
    const renderLists = useCallback(() => {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Gender</th>
                            <th>Attempts</th>
                            <th>Response Type</th>
                            <th>Response Details</th>
                            <th>Response Schedule</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map((recipient, index) => {
                            return (
                                <tr key={recipient.id}>
                                    <td>{index + 1}</td>
                                    <td>{recipient.name}</td>
                                    <td>{recipient.phonenumber}</td>
                                    <td>{recipient.location}</td>
                                    <td>{recipient.gender}</td>
                                    <td>{recipient.attempts}</td>
                                    <td>{recipient.action}</td>
                                    <td>{recipient.actionDetails}</td>
                                    <td>{recipient.actionSchedule}</td>
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
                                                    to="#"
                                                    onClick={e =>
                                                        handleQueue(recipient)
                                                    }
                                                >
                                                    Add to queue
                                                </Link>
                                                <Link
                                                    className="dropdown-item"
                                                    to={getUrl(recipient)}
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    });

    const getUrl = useCallback(recipient => {
        switch (recipient.recipientType) {
            case "App\\Models\\Company":
                return `/app/crm/companies/${recipient.recipientId}`;
                break;
            case "App\\Models\\Lead":
                return `/app/crm/leads/${recipient.recipientId}`;
                break;
            case "App\\Models\\Contact":
                return `/app/crm/contacts/${recipient.recipientId}`;
                break;
            default:
                return "#";
        }
    });

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Recipients</div>
                <div className="heading-elements"></div>
            </div>
            <div className="card-body">
                <div className="row">{renderLists()}</div>
            </div>
        </div>
    );
};

CalledRecipients.displayName = displayName;
CalledRecipients.propTypes = propTypes;

export default React.memo(CalledRecipients);
