import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "ContactRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    contact: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const ContactRow = ({
    index,
    contact,
    handleRemove,
    handleMigrateAsCompany,
    handleMigrateAsLead
}) => {
    return (
        <tr key={contact.id}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`/app/crm/contacts/${contact.id}`}>
                    {contact.salutationName + " " + contact.name}
                </Link>
            </td>
            <td>{contact.contactTypeName}</td>
            <td>{contact.contactCategoryName}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td>{contact.gender}</td>
            <td>{contact.position}</td>
            <td>{contact.location}</td>
            <td>{contact.salesRepName}</td>
            <td>{contact.source}</td>
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
                            to={`contacts/${contact.id}`}
                        >
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`contacts/edit/${contact.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleMigrateAsCompany(contact.id)}
                        >
                            Move to companies
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleMigrateAsLead(contact.id)}
                        >
                            Move to leads
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(contact.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

ContactRow.displayName = displayName;
ContactRow.propTypes = propTypes;

export default React.memo(ContactRow);
