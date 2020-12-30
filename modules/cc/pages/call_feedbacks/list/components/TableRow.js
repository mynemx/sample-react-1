import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { feedbackAddRequest } from "../../../../service";

const displayName = "TableRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    callFeedback: PropTypes.object.isRequired
};

const TableRow = ({ index, callFeedback }) => {
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

    return (
        <tr key={callFeedback.id}>
            <td scope="row">{index + 1}</td>
            <td>{callFeedback.name}</td>
            <td>{callFeedback.phonenumber}</td>
            <td>{callFeedback.direction}</td>
            <td>{callFeedback.userName}</td>
            <td>{callFeedback.action}</td>
            <td>{callFeedback.actionDetails}</td>
            <td>{callFeedback.actionSchedule}</td>
            <td>{callFeedback.createdAt.format("MMM, DD YYYY H:m")}</td>
            <td>
                <Link className="" to={getUrl(callFeedback)}>
                    View client
                </Link>
            </td>
        </tr>
    );
};

TableRow.displayName = displayName;
TableRow.propTypes = propTypes;

export default React.memo(TableRow);
