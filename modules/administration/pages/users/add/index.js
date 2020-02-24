// import libs
import { connect } from "react-redux";
import User from "../../../../user/models/User";
import { withRouter } from "react-router-dom";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    //   const {data, ...meta} = state.administration.users
    const user = new User({});
    const departments = state.settings.departments || [];
    const roles = state.settings.roles || [];

    return {
        user,
        departments,
        roles
    };
};

export default withRouter(connect(mapStateToProps)(Page));
