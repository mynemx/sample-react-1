//import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUser } from "../modules/auth/service";
import { authPageLoading } from "../modules/auth/store/actions";
import { fetchAppDependencies } from "../modules/settings/services";
import {
    userListRequest,
    categoryListRequest
} from "../modules/administration/services";

// import components
import PrivateLayout from "./Private";
import PublicLayout from "./Public";
import { fromJS } from "immutable";
import { extensionListRequest } from "../modules/cc/service";

class Layout extends PureComponent {
    static displayName = "Layout";
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        showSidebar: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    UNSAFE_componentWillMount() {
        const { isAuthenticated, user, dispatch } = this.props;

        dispatch(authPageLoading(true));
        if (isAuthenticated && !user.id) {
            this.props.dispatch(fetchUser());
            this.props.dispatch(fetchAppDependencies());
            this.props.dispatch(userListRequest({}));
            this.props.dispatch(categoryListRequest({}));
            this.props.dispatch(extensionListRequest({}));
        }
    }

    render() {
        const { children, ...props } = this.props;
        if (this.props.isAuthenticated) {
            return <PrivateLayout {...props}>{children}</PrivateLayout>;
        }
        return <PublicLayout {...props}>{children}</PublicLayout>;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pageLoading: state.auth.pageLoading,
        showSidebar: state.auth.showSidebar,
        user: state.user
    };
};

export default withRouter(connect(mapStateToProps)(Layout));
