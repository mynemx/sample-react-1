// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Extension from "../../../models/Extension";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    let extension =
        state.cc.sipExtensions.find(
            extension => extension.id === Number(params.id)
        ) || {};
    const users = state.administration.users || [];
    const callGateways = state.cc.callGateways || [];

    return {
        extension,
        users,
        callGateways
    };
};

export default withRouter(connect(mapStateToProps)(Page));
