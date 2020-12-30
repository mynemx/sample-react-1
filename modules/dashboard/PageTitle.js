import React, { Component } from "react";
import PropTypes from "prop-types";

const PageTitle = props => {
    return (
        <div className="nav-area">
            <div className="welcome">Welcome back, {props.user.firstName}</div>
            <div className="notification-message"></div>
        </div>
    );
};

PageTitle.propTypes = {
    user: PropTypes.object.isRequired
};

export default React.memo(PageTitle);
