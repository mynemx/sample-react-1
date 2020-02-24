import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const displayName = "LeadDetails";
const propTypes = {
    lead: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const LeadDetails = ({
    lead,
    handleMigrateAsCompany,
    handleMigrateAsContact,
    handleRemove
}) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">lead Details</div>
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
                            {lead.statusStage == "Success" ? (
                                <>
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={() =>
                                            handleMigrateAsCompany(lead.id)
                                        }
                                    >
                                        Convert to company
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={() =>
                                            handleMigrateAsContact(lead.id)
                                        }
                                    >
                                        Convert to contact
                                    </Link>
                                </>
                            ) : (
                                ""
                            )}
                            <Link
                                className="dropdown-item"
                                to={`/app/crm/leads/edit/${lead.id}`}
                            >
                                Edit
                            </Link>
                            <Link
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleRemove(lead.id)}
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
                            <div className="pl-3 text-default">{lead.name}</div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Email</label>
                            <div className="pl-3 text-default">
                                {lead.email}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Phone </label>
                            <div className="pl-3 text-default">
                                {lead.phone}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Gender </label>
                            <div className="pl-3 text-default">
                                {lead.gender}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Sales Rep</label>
                            <div className="pl-3 text-default">
                                {lead.salesRepName}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Source</label>
                            <div className="pl-3 text-default">
                                {lead.source}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Website</label>
                            <div className="pl-3 text-default">
                                {lead.website}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Note</label>
                            <div className="pl-3 text-default">{lead.note}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group mb-2">
                            <label className="label mb-0">Location</label>
                            <div className="pl-3 text-default">
                                {lead.location}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Address</label>
                            <div className="pl-3 text-default">
                                {lead.address}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">City</label>
                            <div className="pl-3 text-default">{lead.city}</div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">State</label>
                            <div className="pl-3 text-default">
                                {lead.state}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Country</label>
                            <div className="pl-3 text-default">
                                {lead.country}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">
                                Delivery Address
                            </label>
                            <div className="pl-3 text-default">
                                {lead.deliveryAddress}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Postal Code</label>
                            <div className="pl-3 text-default">
                                {lead.postal}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LeadDetails.displayName = displayName;
LeadDetails.propTypes = propTypes;

export default React.memo(LeadDetails);
