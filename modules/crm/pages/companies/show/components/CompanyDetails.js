import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const displayName = "CompanyDetails";
const propTypes = {
    company: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const CompanyDetails = ({ company, handleRemove }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Company Details</div>
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
                                to={`/app/crm/companies/edit/${company.id}`}
                            >
                                Edit
                            </Link>
                            <Link
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleRemove(company.id)}
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
                                {company.name}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">
                                Company Category
                            </label>
                            <div className="pl-3 text-default">
                                {company.companyCategoryName}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Company Type</label>
                            <div className="pl-3 text-default">
                                {company.companyTypeName}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Industry</label>
                            <div className="pl-3 text-default">
                                {company.industryName}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Sales Rep</label>
                            <div className="pl-3 text-default">
                                {company.salesRepName}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Source</label>
                            <div className="pl-3 text-default">
                                {company.source}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Currency</label>
                            <div className="pl-3 text-default">
                                {company.currencyName}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Company Size</label>
                            <div className="pl-3 text-default">
                                {company.companySize}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Website</label>
                            <div className="pl-3 text-default">
                                {company.website}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Note</label>
                            <div className="pl-3 text-default">
                                {company.note}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group mb-2">
                            <label className="label mb-0">Primary Email</label>
                            <div className="pl-3 text-default">
                                {company.email}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Primary Phone </label>
                            <div className="pl-3 text-default">
                                {company.phone}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Location</label>
                            <div className="pl-3 text-default">
                                {company.location}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Address</label>
                            <div className="pl-3 text-default">
                                {company.address}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">City</label>
                            <div className="pl-3 text-default">
                                {company.city}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">State</label>
                            <div className="pl-3 text-default">
                                {company.state}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">Country</label>
                            <div className="pl-3 text-default">
                                {company.country}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="label mb-0">
                                Delivery Address
                            </label>
                            <div className="pl-3 text-default">
                                {company.deliveryAddress}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label className="label mb-0">Postal Code</label>
                            <div className="pl-3 text-default">
                                {company.postal}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CompanyDetails.displayName = displayName;
CompanyDetails.propTypes = propTypes;

export default React.memo(CompanyDetails);
