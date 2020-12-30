// import libs
import { connect } from "react-redux";
import CallFeedback from "../../../models/CallFeedback";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.cc.callFeedbacks;

    return {
        callFeedbacks: data.map(obj => new CallFeedback(obj)),
        meta: Object.assign({}, meta),
        users: state.administration.users || []
    };
};

export default connect(mapStateToProps)(Page);
