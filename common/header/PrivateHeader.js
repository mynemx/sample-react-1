// import libs
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

// import components
import {
    Collapse,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

// define component name
const displayName = "PrivateHeader";

// validate properties
const propTypes = {
    user: PropTypes.object.isRequired,
    showNavigation: PropTypes.bool.isRequired,
    showDropdown: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

// initiate comppnent
const PrivateHeader = ({
    user,
    showNavigation,
    showDropdown,
    toggleDropdown,
    logout
}) => (
    <div className="nav">
        <div className="search-nav"></div>

        <div className="right-nav">
            <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                style={{ fontSize: "1em" }}
                onClick={e => {
                    toggleDropdown();
                }}
            >
                Calls Notifications
                {showDropdown
                    ? String.fromCharCode("9660")
                    : String.fromCharCode("9650")}
            </IconButton>
        </div>
    </div>
);

// bind properties
PrivateHeader.displayName = displayName;
PrivateHeader.propTypes = propTypes;

// export component
export default React.memo(PrivateHeader);
