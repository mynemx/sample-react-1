import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PageTitle = props => {
    return (
        <div className="nav-area">
            <ol className="breadcrumb">
                <li className="module">Help</li>
                <li>{props.module}</li>
            </ol>

            <ol className="nav-links">
                <li>
                    <NavLink
                        to="/app/help/agent-faqs"
                        activeClassName="active"
                    >
                        FAQs
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/help/faq-topics"
                        activeClassName="active"
                    >
                        FAQ Settings  
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/app/help/mail-templates"
                        activeClassName="active"
                    >
                        Mail Template
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
