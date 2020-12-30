import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import DialerSipIcon from "@material-ui/icons/DialerSip";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import BarChartIcon from "@material-ui/icons/BarChart";
import AppsIcon from "@material-ui/icons/Apps";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";

export default class SideBarMenu extends PureComponent {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink
                            exact
                            to="/app"
                            activeClassName="active"
                            className="nav-link"
                        >
                            <DashboardIcon /> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/user/profile"
                            activeClassName="active"
                            className="nav-link"
                        >
                            <AccountBoxIcon /> My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/crm"
                            activeClassName="active"
                            className="nav-link"
                        >
                            <ContactPhoneIcon /> CRM
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/company/administration"
                            activeClassName="active"
                            className="nav-link"
                        >
                            <AccountBalanceIcon /> Administration
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/contact-center"
                            activeClassName="active"
                            className="nav-link"
                        >
                            <DialerSipIcon /> Contact Center
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/help"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Contact Center"
                        >
                            <DialerSipIcon /> Help
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/report"
                            activeClassName="active"
                            className="nav-link"
                        >
                            <BarChartIcon /> Report
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/app/settings"
                            activeClassName="active"
                            className="nav-link"
                        >
                            <AppsIcon /> Admin Settings
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to="/logout"
                            className="nav-link"
                            onClick={this.props.logout}
                        >
                            <CloseIcon /> Sign Out
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
