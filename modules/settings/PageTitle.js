import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function PageTitle(props) {
    return (
        <div className="nav-area">
            <ol className="breadcrumb">
                <li className="module">Application Settings</li>
                <li>list</li>
            </ol>

            <ol className="nav-links">
                <li className="active">App Settings</li>
                <li>CRM Settings</li>
                <li>Organization Setting</li>
                <li>Contact Center Setting</li>
                <li>Finance Settings</li>
                <li>Human Resource Settings</li>
            </ol>
        </div>
    );
}

PageTitle.propTypes = {
    user: PropTypes.object.isRequired
};
