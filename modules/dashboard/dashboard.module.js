import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageTitle from "./PageTitle";

class Dashboard extends PureComponent {
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
                <PageTitle user={this.props.user}></PageTitle>
                <div className="content-area">{this.props.children}</div>
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

export default connect(mapStateToProps)(Dashboard);
