import { connect } from "react-redux";
import CallLog from "../../../models/CallLog";
import { withRouter } from "react-router-dom";
// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const callLog =
        state.cc.callLogs.data.find(list => list.id === Number(params.id)) ||
        {};
    return {
        callLog: new CallLog(callLog)
    };
};

export default withRouter(connect(mapStateToProps)(Page));
