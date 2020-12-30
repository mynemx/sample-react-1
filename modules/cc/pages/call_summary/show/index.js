// import libs
import { connect } from "react-redux";
import Extension from "../../../models/Extension";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const extension = state.cc.sipExtensions.find(
        extension => extension.regexten === params.id
    ) || {};

    return {
        calls: state.cc.callEvents.calls ? state.cc.callEvents.calls.filter(call => call.agent == params.id || call.agent == "") : [],
        agents: state.cc.callEvents.agents || [],
        extension: new Extension(extension),
        agent: params.id

    };
};

export default connect(mapStateToProps)(Page);
