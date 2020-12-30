// import libs
import { connect } from "react-redux";
import CallFeedback from "../../../models/CallFeedback";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.cc.callBacks;

    return {
        callBacks: data.map(obj => new CallFeedback(obj)),
        meta: Object.assign({}, meta),
        socket: state.cc.socket,
        users: state.administration.users || [],
        user: state.user
    };
};

export default connect(mapStateToProps)(Page);
