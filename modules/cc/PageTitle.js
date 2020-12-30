import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PageTitle = props => {
    return (
        <div className="nav-area">
            <ol className="breadcrumb">
                <li className="module">Contact Center</li>
                <li>{props.module}</li>
            </ol>

            <ol className="nav-links">
                <li>
                    <NavLink
                        to="/app/contact-center/call-summaries"
                        activeClassName="active"
                    >
                        Live Monitor
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/call-feedbacks"
                        activeClassName="active"
                    >
                        Call Feedbacks
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/call-backs"
                        activeClassName="active"
                    >
                        Call Back Diary
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/campaigns"
                        activeClassName="active"
                    >
                        Call Campaigns
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/campaign-lists"
                        activeClassName="active"
                    >
                        Campaign Lists
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/call-logs"
                        activeClassName="active"
                    >
                        Call Logs
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/sip-extensions"
                        activeClassName="active"
                    >
                        Sip Extensions
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/call-gateways"
                        activeClassName="active"
                    >
                        Gateways
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink
                        to="/app/contact-center/hunt-groups"
                        activeClassName="active"
                    >
                        Hunt Groups
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/contact-center/advance-settings"
                        activeClassName="active"
                    >
                        Advance Settings
                    </NavLink>
                </li> */}
            </ol>
        </div>
    );
};

PageTitle.propTypes = {
    user: PropTypes.object.isRequired
};

export default React.memo(PageTitle);
