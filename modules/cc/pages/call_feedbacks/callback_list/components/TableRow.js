import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";

const displayName = "TableRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    callFeedback: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const TableRow = ({
    index,
    callFeedback,
    handleModalOpen,
    handleRemove,
    handleCall,
    user
}) => {
    const getUrl = useCallback(recipient => {
        switch (recipient.recipientType) {
            case "App\\Models\\Company":
                return `/app/crm/companies/${recipient.recipientId}/conversations`;
                break;
            case "App\\Models\\Lead":
                return `/app/crm/leads/${recipient.recipientId}/conversations`;
                break;
            case "App\\Models\\Contact":
                return `/app/crm/contacts/${recipient.recipientId}/conversations`;
                break;
            default:
                return "#";
        }
    });

    const isAdmin = useCallback(() => {
        if (user.id) {
            if (
                user.roles.find(
                    obj => obj.name.toLowerCase() === "admininistrator"
                ) ||
                user.roles.find(obj => obj.name.toLowerCase() === "supervisor")
            ) {
                return true;
            }
        }
        return false;
    }, [user]);

    const isAgent = useCallback(() => {
        if (user.id) {
            if (user.extens.find(obj => obj === callFeedback.agent)) {
                return true;
            }
        }
        return false;
    }, [user, callFeedback]);

    return (
        <tr key={callFeedback.id}>
            <td scope="row">{index + 1}</td>
            <td>{callFeedback.name}</td>
            <td>{callFeedback.phonenumber}</td>
            <td>{callFeedback.direction}</td>
            <td>{callFeedback.userName}</td>
            <td>{callFeedback.actionDetails}</td>
            <td>
                {callFeedback.actionSchedule
                    ? moment(callFeedback.actionSchedule).format(
                          "MMM, DD YYYY HH:mm"
                      )
                    : callFeedback.actionSchedule}
            </td>
            <td>{callFeedback.createdAt.format("MMM, DD YYYY HH:mm")}</td>
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
                        {isAgent() ? (
                            <Link
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleCall(callFeedback)}
                            >
                                Call
                            </Link>
                        ) : (
                            ""
                        )}
                        {isAdmin() ? (
                            <Link
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleModalOpen(callFeedback)}
                            >
                                Re Assign
                            </Link>
                        ) : (
                            ""
                        )}

                        <Link
                            className="dropdown-item"
                            to={getUrl(callFeedback)}
                        >
                            View client
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(callFeedback.id)}
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
