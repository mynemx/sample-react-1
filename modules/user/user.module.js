import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageTitle from "./PageTitle";

class Profile extends PureComponent {
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

    getModule() {
        let url = this.props.match.path.split("/")[4];
        url = _.replace(url, "-", " ");
        url = _.capitalize(url);
        return url;
    }

    render() {
        return (
            <section className="content">
                <PageTitle
                    user={this.props.user}
                    module={this.getModule()}
                ></PageTitle>
                <div className="content-area">{this.props.children}</div>
            </section>
        );
    }
}

const mapStateToProps = (state, router) => {
    return {
        user: state.user,
        match: router.match,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(Profile);
