import { connect } from "react-redux";
import CallLog from "../../../models/CallLog";
import { withRouter } from "react-router-dom";
import User from "../../../../user/models/User";
// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const callSummary = state.report.callSummary || {};
    const orderSummary = state.report.orderSummary || {};
    return {
        user: new User(state.user),
        callSummary,
        orderSummary
    };
};

export default withRouter(connect(mapStateToProps)(Page));
