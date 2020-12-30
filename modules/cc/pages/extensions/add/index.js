// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Extension from "../../../models/Extension";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    
    const users = state.administration.users || [];
    const callGateways = state.cc.callGateways || [];

    return {
        users,
        callGateways
    };
};

export default withRouter(connect(mapStateToProps)(Page));
