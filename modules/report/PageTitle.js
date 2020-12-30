import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PageTitle = props => {
    return (
        <div className="nav-area">
            <ol className="breadcrumb">
                <li className="module">Reports</li>
                <li>{props.module}</li>
            </ol>

            <ol className="nav-links">
                <li className="active">
                    <NavLink to="/app/report/calls" activeClassName="active">
                        Call Report
                    </NavLink>
                </li>
                <li className="active">
                    <NavLink to="/app/report/gateway-summary" activeClassName="active">
                        Gateway Report
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/app/report/agent-kpi" activeClassName="active">
                        Agent KPI Report
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/app/report/sales" activeClassName="active">
                        Sales Report
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/report/feedbacks"
                        activeClassName="active"
                    >
                        Call Feedbacks Report
                    </NavLink>
                </li>
            </ol>
        </div>
    );
};

PageTitle.propTypes = {
    user: PropTypes.object.isRequired
};

export default React.memo(PageTitle);
