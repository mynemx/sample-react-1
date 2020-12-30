// import libs
import { connect } from "react-redux";
import CallLog from "../../../models/CallLog";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.cc.callLogs;
    // const { data, meta } = state.cc.callLogs;

    return {
        // callLogs: data.map(obj => new CallLog(obj)),
        callEvents: state.cc.callEvents.amiEvents,
        socket: state.cc.socket
    };
};

export default connect(mapStateToProps)(Page);
