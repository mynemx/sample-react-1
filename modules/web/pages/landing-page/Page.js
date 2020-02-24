// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import _ from "lodash";
import { Redirect } from "react-router-dom";

// import components

// initialize component
class Page extends Component {
    // set name of the component
    static displayName = "HomePage";

    // validate props
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    // render component
    render() {
        // check if user is authenticated then redirect him to home page
        if (this.props.isAuthenticated) {
            return <Redirect to="/app" />;
        }

        return (
            <div style={{ textAlign: "center" }} className="container py-5">
                <div className="row">
                    <div className="col-md-12">Welcome to hotdial</div>
                </div>
            </div>
        );
    }
}

export default Page;
