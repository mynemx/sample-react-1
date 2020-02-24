// import libs
import React from "react";
import PropTypes from "prop-types";

// import components
import { Collapse } from "reactstrap";
import NavItem from "../navigation/NavItem";

// define component name
const displayName = "PublicHeader";

// validate properties
const propTypes = {
    showNavigation: PropTypes.bool.isRequired
};

// initiate component
const PublicHeader = ({ showNavigation }) => (
    <div className="nav">
        <ul className="navbar-nav mr-auto">
            <NavItem path="/">Home</NavItem>
        </ul>
        <ul className="right-nav navbar-nav ">
            <NavItem className="nav-link" path="/login">
                Login
            </NavItem>
            <NavItem path="/register">Register</NavItem>
        </ul>
    </div>
);

// bind properties
PublicHeader.displayName = displayName;
PublicHeader.propTypes = propTypes;

// export component
export default React.memo(PublicHeader);
