import React, { PureComponent } from "react";
import { rootUrl } from "../../lib/helpers";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideBarMenu from "./SidebarMenu";
import "./SideBarNav.css";
import { logout } from "../../modules/auth/service";

class SideBarNav extends PureComponent {
    logout(e) {
        e.preventDefault();

        this.props.dispatch(logout());
    }

    render() {
        return (
            <div className="sidebar-nav">
                <div className="sidebar-logo-area">
                    <img
                        className="sidebar-logo"
                        src={`${rootUrl}images/wemy-logo.png`}
                    />
                </div>
                <div className="sidebar-profile-area">
                    <img
                        className="sidebar-profile-img border border-secondary"
                        src={this.props.user.photo}
                    />
                    <div className="sidebar-profile-name">
                        {`${this.props.user.firstName} ${this.props.user.lastName} `}
                    </div>
                    <div className="sidebar-profile-role">
                        {this.props.user.department.name}
                    </div>
                </div>
                <SideBarMenu logout={this.logout.bind(this)} />
            </div>
        );
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired
    };
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isAuthenticated: state.auth.isAuthenticated,
        showSidebar: state.auth.showSidebar
    };
};

export default connect(mapStateToProps)(SideBarNav);
