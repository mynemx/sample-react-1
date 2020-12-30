import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const displayName = "ContactDetails";
const propTypes = {
    contact: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const ContactDetails = ({ contact, handleRemove }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Contact Details</div>
                <div className="heading-elements">
                    <div className="btn-group btn-sm action-btn">
                        <button
                            type="button"
                            className="btn btn-sm dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Menu
                        </button>

                        <div className="dropdown-menu">
                            <Link
                                className="dropdown-item"
                                to={`/app/crm/contacts/edit/${contact.id}`}
                            >
                                Edit
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
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-2">
                            <label className="label mb-0">Name</label>
                            <div className="pl-3 text-default">
                                {`${contact.salutationName} ${contact.name}`}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">
                                Contact Category
                            </label>
                            <div className="pl-3 text-default">
                                {contact.contactCategoryName}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Contact Type</label>
                            <div className="pl-3 text-default">
                                {contact.contactTypeName}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Company</label>
                            <div className="pl-3 text-default">
                                {contact.companyName}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Sales Rep</label>
                            <div className="pl-3 text-default">
                                {contact.salesRepName}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Source</label>
                            <div className="pl-3 text-default">
                                {contact.source}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Gender</label>
                            <div className="pl-3 text-default">
                                {contact.gender}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Date of birth</label>
                            <div className="pl-3 text-default">
                                {contact.dateOfBirth}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Age</label>
                            <div className="pl-3 text-default">
                                {contact.age}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Website</label>
                            <div className="pl-3 text-default">
                                {contact.website}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Note</label>
                            <div className="pl-3 text-default">
                                {contact.note}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group mb-2">
                            <label className="label mb-0">Email</label>
                            <div className="pl-3 text-default">
                                {contact.email}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Phone </label>
                            <div className="pl-3 text-default">
                                {contact.phone}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Location</label>
                            <div className="pl-3 text-default">
                                {contact.location}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Address</label>
                            <div className="pl-3 text-default">
                                {contact.address}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">City</label>
                            <div className="pl-3 text-default">
                                {contact.city}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">State</label>
                            <div className="pl-3 text-default">
                                {contact.state}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Country</label>
                            <div className="pl-3 text-default">
                                {contact.country}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">
                                Delivery Address
                            </label>
                            <div className="pl-3 text-default">
                                {contact.deliveryAddress}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Postal Code</label>
                            <div className="pl-3 text-default">
                                {contact.postal}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactDetails.displayName = displayName;
ContactDetails.propTypes = propTypes;

export default ContactDetails;
