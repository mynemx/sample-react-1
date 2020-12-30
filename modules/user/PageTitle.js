import React, { Component } from "react";
import PropTypes from "prop-types";
import NavItem from "../../common/navigation/NavItem";

const PageTitle = props => {
    return (
        <div className="nav-area">
            <ol className="breadcrumb">
                <li className="module">My Profile</li>
                <li>{props.module}</li>
            </ol>

            <ol className="nav-links navbar-nav">
                <NavItem className="nav-link" path="personal-information">
                    Personal Info
                </NavItem>
            </ol>
        </div>
    );
};

PageTitle.propTypes = {
    user: PropTypes.object.isRequired,
    module: PropTypes.string.isRequired
};

export default React.memo(PageTitle);
