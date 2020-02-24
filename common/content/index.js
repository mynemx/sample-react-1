import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from "../footer/Footer";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";

class Content extends PureComponent {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showNavigation: false,
            showDropdown: false
        };
    }

    render() {
        return (
            <section className="content">
                <PageTitle>
                    <div className="welcome">Welcome back, Jane</div>
                </PageTitle>
                <div className="content-area">{this.props.children}</div>
                <Footer />
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(Content);
