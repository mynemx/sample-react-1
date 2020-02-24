import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PageTitle = props => {
    return (
        <div className="nav-area">
            <ol className="breadcrumb">
                <li className="module">CRM</li>
                <li>{props.module}</li>
            </ol>

            <ol className="nav-links">
                <li>
                    <NavLink to="/app/crm/leads" activeClassName="active">
                        Leads
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/app/crm/companies" activeClassName="active">
                        Companies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/app/crm/contacts" activeClassName="active">
                        Contacts
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/app/crm/orders" activeClassName="active">
                        Orders
                    </NavLink>
                </li>
            </ol>
        </div>
    );
};

PageTitle.propTypes = {
    user: PropTypes.object.isRequired,
    module: PropTypes.string.isRequired
};

export default React.memo(PageTitle);
