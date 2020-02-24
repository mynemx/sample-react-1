import React, { PureComponent } from "react";
import { rootUrl } from "../../lib/helpers";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MiniSideBarMenu from "./MiniSidebarMenu";
import "./SideBarNav.css";
import { logout } from "../../modules/auth/service";

class MiniSideBarNav extends PureComponent {
    logout(e) {
        e.preventDefault();

        this.props.dispatch(logout());
    }

    render() {
        return (
            <div className="mini-sidebar-nav">
                <div className="mini-sidebar-logo-area">
                    <img
                        className="mini-sidebar-logo"
                        src={`${rootUrl}images/wemy-logo-menu-bar.png`}
                    />
                </div>
                <div
                    className="mini-sidebar-profile-area"
                    data-toggle="tooltip"
                    data-placement="right"
                    title={`${this.props.user.firstName} ${this.props.user.lastName} `}
                >
                    <img
                        className="mini-sidebar-profile-img border border-secondary"
                        src={this.props.user.photo}
                    />
                </div>
                <MiniSideBarMenu logout={this.logout.bind(this)} />
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

export default connect(mapStateToProps)(MiniSideBarNav);
