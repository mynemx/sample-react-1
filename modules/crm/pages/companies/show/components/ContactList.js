import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "ContactList";
const propTypes = {
    company: PropTypes.object.isRequired
};

const ContactList = ({ company, contacts, dispatch }) => {
    function handleRemove(id) {}
    function renderContacts() {
        return contacts.map((contact, index) => {
            return (
                <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>
                        <Link
                            className=""
                            to={`/app/crm/contacts/${contact.id}`}
                        >
                            {contact.salutationName + " " + contact.name}
                        </Link>
                    </td>
                    <td>{contact.contactTypeName}</td>
                    <td>{contact.contactCategoryName}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>
                    <td>{contact.gender}</td>
                    <td>{contact.location}</td>
                    <td>{contact.salesRepName}</td>
                </tr>
            );
        });
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Contacts</div>
                <div className="heading-elements"></div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover table-sm">
                        <thead className="">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Location</th>
                                <th>Sales Rep</th>
                            </tr>
                        </thead>
                        <tbody>{renderContacts()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

ContactList.displayName = displayName;
ContactList.propTypes = propTypes;

export default ContactList;
