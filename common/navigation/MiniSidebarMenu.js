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
const $ = require("jquery");

export default class MiniSideBarMenu extends PureComponent {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return (
            <div className="mini-sidebar-menu mt-3">
                <ul>
                    <li>
                        <NavLink
                            exact
                            to="/app"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Dashboard"
                        >
                            <DashboardIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/user/profile"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="My Profile"
                        >
                            <AccountBoxIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/crm"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="CRM"
                        >
                            <ContactPhoneIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/company/administration"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Administration"
                        >
                            <AccountBalanceIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/contact-center"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Contact Center"
                        >
                            <DialerSipIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/report"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Report"
                        >
                            <BarChartIcon />
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/app/settings"
                            activeClassName="active"
                            className="nav-link"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Admin Settings"
                        >
                            <AppsIcon />
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to="/logout"
                            className="nav-link"
                            onClick={this.props.logout}
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Sign out"
                        >
                            <CloseIcon />
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
