import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PageTitle = props => {
    return (
        <div className="nav-area">
            <ol className="breadcrumb">
                <li className="module">Administration</li>
                <li>{props.module}</li>
            </ol>

            <ol className="nav-links">
                <li className="active">
                    <NavLink
                        to="/app/company/administration/users"
                        activeClassName="active"
                    >
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/company/administration/product-categories"
                        activeClassName="active"
                    >
                        Product Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/company/administration/products"
                        activeClassName="active"
                    >
                        Products
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
