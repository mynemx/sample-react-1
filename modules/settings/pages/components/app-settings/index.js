// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";
// import { fromJS } from 'immutable'
import "./index.css";

class AppSetting extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <div className="page-container">
                <ol className="breadcrumb">
                    <li>
                        <Link to="">App Settings</Link>
                    </li>
                </ol>

                <section className="row">
                    <div className="flex-container"></div>
                </section>
            </div>
        );
    }
}

export default AppSetting;
