import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageTitle from "./PageTitle";
import { fetchAppDependencies } from "./services";
import { isEmpty } from "../../lib/helpers";

class AppSetting extends Component {
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

    UNSAFE_componentWillMount() {
        const { isAuthenticated, settings } = this.props;

        if (isAuthenticated && isEmpty(settings)) {
            this.props.dispatch(fetchAppDependencies());
        }
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
        settings: state.settings,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(AppSetting);
