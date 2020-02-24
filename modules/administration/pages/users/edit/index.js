// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import User from "../../../../user/models/User";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const user = state.administration.users.find(
        user => user.id === Number(params.id)
    );
    const departments = state.settings.departments || [];
    const roles = state.settings.roles || [];

    return {
        user: user ? new User(user) : new User({}),
        departments,
        roles
    };
};

export default withRouter(connect(mapStateToProps)(Page));
